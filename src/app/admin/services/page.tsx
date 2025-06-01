
"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { db, storage } from '@/lib/firebase'; // Import storage
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"; // Storage functions
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceFormData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl'> {
  imageFile?: File | null;
  imageUrl?: string; // Keep imageUrl for existing images or when no new file is selected
}

const initialServiceFormState: ServiceFormData = {
  name: '',
  description: '',
  price: 0,
  imageFile: null,
  imageUrl: 'https://placehold.co/400x300.png', // Default placeholder
  imageHint: 'service placeholder',
  stockStatus: 'in-stock',
  category: 'Uncategorized',
};

export default function ManageServicesPage() {
  const [services, setServices] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Product & { imageFile?: File | null }>>(initialServiceFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialServiceFormState.imageUrl || null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollection = collection(db, 'services');
      const q = query(servicesCollection, orderBy('createdAt', 'desc'));
      const servicesSnapshot = await getDocs(q);
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services: ", error);
      toast({
        title: "Error fetching services",
        description: (error as Error).message.includes("PERMISSION_DENIED") 
          ? "Permission denied. Check Firestore rules and API is enabled." 
          : "Could not load services. Check console.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  
  const handleAddNewService = () => {
    setIsEditing(false);
    setCurrentService({...initialServiceFormState, imageUrl: 'https://placehold.co/400x300.png'});
    setImagePreview('https://placehold.co/400x300.png');
    setUploadProgress(null);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Product) => {
    setIsEditing(true);
    setCurrentService({...service, imageFile: null}); // Reset imageFile on edit
    setImagePreview(service.imageUrl);
    setUploadProgress(null);
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (serviceId: string, imageUrl?: string) => {
    if (!serviceId) {
      toast({ title: "Error", description: "Service ID is missing.", variant: "destructive" });
      return;
    }
    console.log("Attempting to delete service with ID:", serviceId);
    try {
      await deleteDoc(doc(db, 'services', serviceId));
      
      // Attempt to delete image from Firebase Storage if URL is not a placeholder
      if (imageUrl && !imageUrl.startsWith('https://placehold.co')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log("Image deleted from storage:", imageUrl);
        } catch (storageError) {
          // Log error but don't block service deletion if image deletion fails
          console.error("Error deleting image from storage:", storageError);
          toast({
            title: "Image Deletion Note",
            description: "Service deleted, but its image might not have been removed from storage. Check console.",
            variant: "default",
          });
        }
      }

      setServices(prevServices => prevServices.filter(s => s.id !== serviceId));
      toast({
        title: "Service Deleted",
        description: `Service has been removed successfully.`,
      });
      console.log("Service deleted successfully:", serviceId);
    } catch (error) {
      console.error("Error deleting service from Firestore: ", error);
      toast({
        title: "Error deleting service",
        description: (error as Error).message.includes("PERMISSION_DENIED") 
          ? "Permission denied. Check Firestore rules." 
          : "Could not delete service. Check console.",
        variant: "destructive",
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentService(prev => ({ ...prev, imageFile: file, imageUrl: undefined })); // Clear old imageUrl if new file
      setImagePreview(URL.createObjectURL(file));
    } else {
      setCurrentService(prev => ({ ...prev, imageFile: null }));
      setImagePreview(isEditing && currentService.imageUrl ? currentService.imageUrl : initialServiceFormState.imageUrl!);
    }
  };
  
  const handleSelectChange = (value: Product['stockStatus']) => {
     setCurrentService(prev => ({ ...prev, stockStatus: value }));
  };

  const handleCategoryChange = (value: string) => {
     setCurrentService(prev => ({ ...prev, category: value }));
  };

  const handleSubmitService = async () => {
    console.log("handleSubmitService called. Current service state:", currentService);
    setUploadProgress(0); // Reset/show progress indicator

    if (!currentService.name || currentService.name.trim() === "") {
      toast({ title: "Validation Error", description: "Service name is required.", variant: "destructive" });
      setUploadProgress(null);
      return;
    }
    if (typeof currentService.price !== 'number' || currentService.price < 0) {
      toast({ title: "Validation Error", description: "A valid, non-negative price is required.", variant: "destructive" });
      setUploadProgress(null);
      return;
    }

    let finalImageUrl = isEditing ? currentService.imageUrl : initialServiceFormState.imageUrl;

    if (currentService.imageFile) {
      const file = currentService.imageFile;
      const storageRef = ref(storage, `services_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.error("Image upload error: ", error);
              toast({ title: "Image Upload Failed", description: error.message, variant: "destructive" });
              reject(error);
            },
            async () => {
              finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', finalImageUrl);
              resolve();
            }
          );
        });
      } catch (error) {
        setUploadProgress(null);
        // Toast already shown by uploadTask error handler
        return; // Stop submission if upload failed
      }
    } else if (!finalImageUrl && !isEditing) { // No file and no existing URL for a new service
       finalImageUrl = initialServiceFormState.imageUrl; // Fallback to default placeholder
    }


    const serviceData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: currentService.name!,
      description: currentService.description || '',
      price: Number(currentService.price) || 0,
      imageUrl: finalImageUrl!,
      imageHint: currentService.imageHint || 'service image',
      stockStatus: currentService.stockStatus || 'in-stock',
      category: currentService.category || 'Uncategorized',
    };
    
    console.log("Service data to be saved:", serviceData, "Is editing:", isEditing);

    try {
      if (isEditing && currentService.id) {
        console.log("Attempting to update service with ID:", currentService.id);
        const serviceRef = doc(db, 'services', currentService.id);
        await updateDoc(serviceRef, {...serviceData, updatedAt: Timestamp.now()});
        console.log("Service updated successfully:", currentService.id);
        toast({
          title: "Service Updated",
          description: `Service "${currentService.name}" has been updated.`,
        });
      } else {
        console.log("Attempting to add new service.");
        const docRef = await addDoc(collection(db, 'services'), {...serviceData, createdAt: Timestamp.now(), updatedAt: Timestamp.now()});
        console.log("Service added with ID:", docRef.id);
        toast({
          title: "Service Added",
          description: `New service "${currentService.name}" has been added.`,
        });
      }
      fetchServices(); 
      setIsDialogOpen(false);
      setCurrentService(initialServiceFormState);
      setImagePreview(initialServiceFormState.imageUrl!);
    } catch (error) {
      console.error("Error saving service to Firestore: ", error);
      let description = "Could not save service to Firestore. Check browser console for details.";
      if ((error as Error).message.includes("PERMISSION_DENIED")) {
        description = "Permission denied. Please check your Firestore security rules to allow writes to the 'services' collection.";
      } else if ((error as Error).message.includes("Cloud Firestore API has not been used")) {
        description = "Cloud Firestore API is not enabled for this project. Please enable it in Google Cloud Console.";
      }
      toast({
        title: "Error saving service",
        description: description,
        variant: "destructive",
      });
    } finally {
      setUploadProgress(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Services</h1>
        <Button onClick={handleAddNewService}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) {
            setCurrentService(initialServiceFormState);
            setImagePreview(initialServiceFormState.imageUrl!);
            setUploadProgress(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the details of this service.' : 'Fill in the details for the new service.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={currentService.name || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" value={currentService.description || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={currentService.price || 0} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input id="category" name="category" value={currentService.category || ''} onChange={(e) => handleCategoryChange(e.target.value)} placeholder="e.g., Branding, SEO" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stockStatus" className="text-right">Availability</Label>
              <Select name="stockStatus" value={currentService.stockStatus} onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageFile" className="text-right">Image</Label>
              <Input id="imageFile" name="imageFile" type="file" onChange={handleImageFileChange} className="col-span-3" accept="image/*" />
            </div>
             {imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  <Image src={imagePreview} alt={currentService.name || "Service image preview"} width={100} height={75} className="rounded-md object-cover border" data-ai-hint={currentService.imageHint || "placeholder image"}/>
                </div>
              </div>
            )}
            {uploadProgress !== null && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right col-span-1">Upload</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
              <Input id="imageHint" name="imageHint" value={currentService.imageHint || ''} onChange={handleFormChange} className="col-span-3" placeholder="e.g. modern office"/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitService} disabled={uploadProgress !== null && uploadProgress < 100}>
              {uploadProgress !== null && uploadProgress < 100 ? <><UploadCloud className="mr-2 h-4 w-4 animate-pulse" /> Uploading...</> : (isEditing ? 'Save Changes' : 'Add Service')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        {isLoading ? (
          <CardContent className="p-4 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-2 border-b last:border-b-0">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    No services found. Add new services to see them here.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Image 
                        src={service.imageUrl || 'https://placehold.co/60x45.png'} // Fallback if imageUrl is missing
                        alt={service.name} 
                        width={60} 
                        height={45} 
                        className="rounded-md object-cover"
                        data-ai-hint={service.imageHint || "service item"}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x45.png'; }} // Fallback for broken image URLs
                      />
                    </TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>${typeof service.price === 'number' ? service.price.toFixed(2) : 'N/A'}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs rounded-full ${
                          service.stockStatus === 'in-stock' ? 'bg-green-100 text-green-800' :
                          service.stockStatus === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {service.stockStatus ? service.stockStatus.replace('-', ' ') : 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteService(service.id!, service.imageUrl)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>
      <Card className="mt-8">
        <CardHeader>
            <CardTitle className="text-base">Developer Notes & Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>This page interacts with Firestore to manage services and Firebase Storage for image uploads.</p>
            <div>Make sure:
                <ul className="list-disc list-inside pl-4">
                    <li>Your Firebase project is configured correctly in <code>src/lib/firebase.ts</code> (with your actual credentials, including the correct <code>storageBucket</code>).</li>
                    <li>The Cloud Firestore API is enabled for your project in Google Cloud Console.</li>
                    <li>Firebase Storage is enabled for your project in the Firebase Console.</li>
                    <li>You have a "services" collection in Firestore.</li>
                    <li>
                        Firestore security rules are set up to allow reads/writes as needed. 
                        <strong>If you see "PERMISSION_DENIED" errors for Firestore, this is the most likely cause.</strong>
                        <pre className="mt-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /services/{document=**} { 
      allow read, write: if request.auth != null; // Example: allow if user is authenticated
      // For easier development (less secure): allow read, write: if true;
    }
  }
}`}
                        </pre>
                    </li>
                     <li>
                        Firebase Storage security rules are set up. For example, to allow authenticated users to write to a 'services_images' folder and allow public reads:
                        <pre className="mt-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /services_images/{allPaths=**} {
      allow read: if true; // Or be more restrictive
      allow write: if request.auth != null; // Example: allow if user is authenticated
    }
    // For easier development (less secure):
    // match /{allPaths=**} {
    //   allow read, write: if true;
    // }
  }
}`}
                        </pre>
                         <strong className="text-destructive">Warning: Open rules are insecure and for development only. Secure your rules before production.</strong>
                    </li>
                    <li>Each service document should include a 'createdAt' (Timestamp) field for default sorting. 'updatedAt' (Timestamp) is used for edits.</li>
                </ul>
            </div>
            <p className="mt-2">If saving fails, check your browser's developer console for error messages from Firestore or Firebase Storage. These often indicate permission issues or problems with the API/configuration.</p>
        </CardContent>
      </Card>
    </div>
  );
}
