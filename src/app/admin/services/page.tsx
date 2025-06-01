
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
import { db } from '@/lib/firebase'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceFormData extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl'> {
  imageFile?: File | null;
  imageUrl?: string; 
}

const initialServiceFormState: ServiceFormData = {
  name: '',
  description: '',
  price: 0,
  imageFile: null,
  imageUrl: 'https://placehold.co/400x300.png', 
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null); // Can be used for local upload progress if desired, or removed
  const { toast } = useToast();

  const fetchServices = async () => {
    setIsLoading(true);
    console.log("Fetching services from Firestore...");
    try {
      const servicesCollection = collection(db, 'services');
      const q = query(servicesCollection, orderBy('createdAt', 'desc'));
      const servicesSnapshot = await getDocs(q);
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setServices(servicesList);
      console.log("Services fetched successfully:", servicesList.length, "services found.");
    } catch (error) {
      console.error("Error fetching services: ", error);
      let description = "Could not load services. Check browser console for details.";
      if (error instanceof Error && (error as any).code === "permission-denied") {
        description = "Permission denied. Please check your Firestore security rules to allow reads from the 'services' collection. Also ensure the Firestore API is enabled for your project.";
      } else if (error instanceof Error && (error.message.includes("firestore.googleapis.com") || error.message.includes("Cloud Firestore API") || error.message.includes("used in project") )) {
         description = "Cloud Firestore API might not be enabled or configured correctly for this project. Please enable it in Google Cloud Console and check your Firebase config.";
      }
      toast({
        title: "Error fetching services",
        description: description,
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
    setCurrentService({...service, imageFile: null}); 
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
      
      // Note: Local file deletion (for imageUrl like /uploads/...) is not implemented here.
      // If imageUrl pointed to a remote URL that needs cleanup, that would go here.
      if (imageUrl && imageUrl.startsWith('/uploads/')) {
         console.log("Image was a local file:", imageUrl, "Automatic deletion not implemented.");
      }

      setServices(prevServices => prevServices.filter(s => s.id !== serviceId));
      toast({
        title: "Service Deleted",
        description: `Service has been removed successfully.`,
      });
      console.log("Service deleted successfully:", serviceId);
    } catch (error) {
      console.error("Error deleting service from Firestore: ", error);
      let description = "Could not delete service. Check browser console for details.";
      if (error instanceof Error && (error as any).code === "permission-denied") {
        description = "Permission denied. Please check your Firestore security rules to allow deletions from the 'services' collection.";
      }
      toast({
        title: "Error deleting service",
        description: description,
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
      console.log("handleImageFileChange: File selected:", file.name, file.size);
      setCurrentService(prev => ({ ...prev, imageFile: file, imageUrl: undefined })); 
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log("handleImageFileChange: No file selected or selection cancelled.");
      // If editing and an image already exists, keep it, otherwise, if no file selected and no existing image, revert to placeholder
      const existingImageUrl = isEditing && currentService.imageUrl ? currentService.imageUrl : initialServiceFormState.imageUrl!;
      setCurrentService(prev => ({ ...prev, imageFile: null, imageUrl: existingImageUrl }));
      setImagePreview(existingImageUrl);
    }
  };
  
  const handleSelectChange = (value: Product['stockStatus']) => {
     setCurrentService(prev => ({ ...prev, stockStatus: value }));
  };

  const handleCategoryChange = (value: string) => {
     setCurrentService(prev => ({ ...prev, category: value }));
  };

  const handleSubmitService = async () => {
    console.log("handleSubmitService: Attempting to submit service. Current state:", currentService);
    setUploadProgress(0); 

    if (!currentService.name || currentService.name.trim() === "") {
      toast({ title: "Validation Error", description: "Service name is required.", variant: "destructive" });
      setUploadProgress(null);
      console.log("handleSubmitService: Validation failed - name is required.");
      return;
    }
    if (typeof currentService.price !== 'number' || currentService.price < 0) {
      toast({ title: "Validation Error", description: "A valid, non-negative price is required.", variant: "destructive" });
      setUploadProgress(null);
      console.log("handleSubmitService: Validation failed - price is invalid.");
      return;
    }
     if (currentService.imageFile && currentService.imageFile.size > 5 * 1024 * 1024) { // 5MB limit
      toast({ title: "Validation Error", description: "Image file size should not exceed 5MB.", variant: "destructive" });
      setUploadProgress(null);
      console.log("handleSubmitService: Validation failed - image file too large.");
      return;
    }

    let finalImageUrl = currentService.imageUrl || initialServiceFormState.imageUrl; 
    console.log("handleSubmitService: Initial finalImageUrl:", finalImageUrl);

    console.log("handleSubmitService: Proceeding to local API image upload if file exists.");
    if (currentService.imageFile) {
      const file = currentService.imageFile;
      console.log("handleSubmitService: Image file found:", file.name, file.size, file.type);
      
      const formData = new FormData();
      formData.append('file', file);

      console.log("handleSubmitService: Starting local image upload via fetch to /api/upload");
      setUploadProgress(50); // Indicate progress start

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        setUploadProgress(100); // Indicate progress end

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({error: "Unknown error during upload."}));
          console.error("handleSubmitService: Local image upload API error. Status:", response.status, "Response:", errorData);
          toast({ title: "Image Upload Failed", description: `Server error: ${errorData.error || response.statusText}`, variant: "destructive" });
          setUploadProgress(null);
          return;
        }

        const result = await response.json();
        if (result.success && result.filePath) {
          finalImageUrl = result.filePath;
          console.log('handleSubmitService: File uploaded locally, path:', finalImageUrl);
        } else {
          console.error("handleSubmitService: Local image upload API returned success=false or no filePath. Result:", result);
          toast({ title: "Image Upload Failed", description: result.error || "Could not get file path after upload.", variant: "destructive" });
          setUploadProgress(null);
          return;
        }
      } catch (error) {
         console.error("handleSubmitService: Error during local image upload fetch call:", error);
         toast({ title: "Image Upload Error", description: "An unexpected error occurred during image upload. Check console.", variant: "destructive" });
         setUploadProgress(null);
        return; 
      }
    } else {
      console.log("handleSubmitService: No new image file to upload.");
      // If editing and no new file, finalImageUrl should already be the existing one or placeholder.
      // If adding new and no file, it will use the placeholder from initial state.
      if (!finalImageUrl) {
         finalImageUrl = initialServiceFormState.imageUrl;
      }
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
    
    console.log("handleSubmitService: Service data to be saved to Firestore:", serviceData, "Is editing:", isEditing);

    try {
      if (isEditing && currentService.id) {
        console.log("handleSubmitService: Attempting to update service with ID:", currentService.id);
        const serviceRef = doc(db, 'services', currentService.id);
        await updateDoc(serviceRef, {...serviceData, updatedAt: Timestamp.now()});
        console.log("handleSubmitService: Service updated successfully:", currentService.id);
        toast({
          title: "Service Updated",
          description: `Service "${currentService.name}" has been updated.`,
        });
      } else {
        console.log("handleSubmitService: Attempting to add new service.");
        const docRef = await addDoc(collection(db, 'services'), {...serviceData, createdAt: Timestamp.now(), updatedAt: Timestamp.now()});
        console.log("handleSubmitService: Service added with ID:", docRef.id);
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
      console.error("handleSubmitService: Error saving service to Firestore: ", error);
      let description = "Could not save service to Firestore. Check browser console for details.";
      if (error instanceof Error) {
        if ((error as any).code === "permission-denied") {
          description = "Firestore Error: Permission Denied. Please check your Firestore security rules to allow writes to the 'services' collection.";
        } else if (error.message.includes("Cloud Firestore API has not been used")) {
          description = "Firestore Error: Cloud Firestore API is not enabled for this project. Please enable it in Google Cloud Console.";
        } else if (error.message.includes("offline")) {
            description = "Firestore Error: Client is offline. Please check your internet connection.";
        }
      }
      toast({
        title: "Error saving service",
        description: description,
        variant: "destructive",
      });
    } finally {
      setUploadProgress(null);
      console.log("handleSubmitService: Submission process finished.");
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
                  <Image 
                    src={imagePreview.startsWith('blob:') || imagePreview.startsWith('/') ? imagePreview : `https://placehold.co/100x75.png`} 
                    alt={currentService.name || "Service image preview"} 
                    width={100} 
                    height={75} 
                    className="rounded-md object-cover border" 
                    data-ai-hint={currentService.imageHint || "placeholder image"}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x75.png'; }}
                  />
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
                        src={service.imageUrl || 'https://placehold.co/60x45.png'} 
                        alt={service.name} 
                        width={60} 
                        height={45} 
                        className="rounded-md object-cover"
                        data-ai-hint={service.imageHint || "service item"}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/60x45.png'; }}
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
        <CardContent className="space-y-3 text-xs text-muted-foreground">
            <p>This page interacts with Firestore for service data and a Next.js API route for image uploads to the local server (`public/uploads/`).</p>
            
            <p className="font-semibold">If Firestore data isn't saving/loading:</p>
            <div className="pl-4 space-y-2">
                <div>
                    <p><strong>1. Enable Firestore API in Google Cloud Console:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Ensure <strong>Cloud Firestore API</strong> is enabled for project <code>suparshwamarketing</code>.</li>
                    </ul>
                </div>
                 <div>
                    <p className="mt-1"><strong>2. Check Firebase Configuration:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Verify that <code>src/lib/firebase.ts</code> contains your correct Firebase project configuration.</li>
                    </ul>
                 </div>
                <div>
                    <p className="mt-1"><strong>3. Firestore Security Rules (Firestore Database &gt; Rules tab):</strong></p>
                    <p className="pl-2">Ensure rules allow authenticated admin users to read/write to the 'services' collection:</p>
                    <pre className="my-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
    {`rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /services/{serviceId} {
          allow read: if true; // Public can read
          allow write: if request.auth != null; // Authenticated admin can write
        }
      }
    }`}
                    </pre>
                </div>
            </div>
            <p className="mt-2 font-semibold">If image uploads are failing:</p>
             <div className="pl-4 space-y-2">
                <div>
                    <p><strong>1. Check API Route:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        <li>The API route <code>/api/upload</code> handles file saving. Check server logs for errors if uploads fail.</li>
                        <li>The <code>public/uploads</code> directory must be writable by the Next.js server process.</li>
                    </ul>
                </div>
                <div>
                    <p className="mt-1"><strong>2. File System Permissions (Server-Side):</strong></p>
                    <ul className="list-disc list-inside pl-4">
                         <li>Ensure the Next.js server process has write permissions to the `public/uploads` directory on the server where it's running.</li>
                    </ul>
                </div>
                 <div>
                    <p className="mt-1"><strong>3. Deployment Considerations:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                         <li>Storing uploads locally in `public/uploads` may not be suitable for all deployment platforms (e.g., Vercel, serverless environments) as the file system might be ephemeral. For persistent storage in such cases, a dedicated service like Firebase Storage, AWS S3, or Cloudinary is recommended.</li>
                    </ul>
                 </div>
            </div>
            <p className="mt-2">If saving/uploading still fails, check your browser's developer console (usually F12) for detailed error messages from Firebase or the API route. These often provide specific clues. Look for messages logged by "handleSubmitService:" to trace the execution flow.</p>
        </CardContent>
      </Card>
    </div>
  );
}
