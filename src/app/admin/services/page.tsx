
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
      if (error instanceof Error && error.message.includes("PERMISSION_DENIED")) {
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
      
      if (imageUrl && !imageUrl.startsWith('https://placehold.co') && imageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log("Image deleted from storage:", imageUrl);
        } catch (storageError) {
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
      let description = "Could not delete service. Check browser console for details.";
      if (error instanceof Error && error.message.includes("PERMISSION_DENIED")) {
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


    let finalImageUrl = isEditing ? currentService.imageUrl : initialServiceFormState.imageUrl;
    console.log("handleSubmitService: Initial finalImageUrl:", finalImageUrl);

    console.log("handleSubmitService: Proceeding to image upload if file exists.");
    if (currentService.imageFile) {
      const file = currentService.imageFile;
      console.log("handleSubmitService: Image file found:", file.name, file.size, file.type);
      const storageRef = ref(storage, `services_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      console.log("handleSubmitService: Starting image upload via uploadBytesResumable to:", storageRef.fullPath);
      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              console.log('handleSubmitService: Upload is ' + progress + '% done');
            },
            (error) => {
              console.error("handleSubmitService: Image upload error in uploadTask.on:", error);
              let uploadErrorDesc = "Image upload failed. Check browser console for details.";
              if (error.message.includes("storage/unauthorized") || error.message.includes("User does not have permission")) {
                uploadErrorDesc = "Image upload failed: Permission denied. Check Firebase Storage security rules.";
              } else if (error.message.includes("storage/object-not-found")) {
                uploadErrorDesc = "Image upload failed: Object not found. This can happen if the path is incorrect or the bucket is misconfigured.";
              } else if (error.message.toLowerCase().includes("cors")) {
                uploadErrorDesc = "Image upload failed: CORS policy issue. Please check your Firebase Storage (Google Cloud Storage bucket) CORS configuration.";
              }
              toast({ title: "Image Upload Failed", description: uploadErrorDesc, variant: "destructive" });
              reject(error);
            },
            async () => {
              try {
                finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('handleSubmitService: File available at', finalImageUrl);
                resolve();
              } catch (downloadUrlError) {
                console.error("handleSubmitService: Error getting download URL:", downloadUrlError);
                toast({ title: "Image Upload Failed", description: "Could not get download URL after upload. Check console.", variant: "destructive" });
                reject(downloadUrlError);
              }
            }
          );
        });
        console.log("handleSubmitService: Image upload promise resolved successfully.");
      } catch (error) {
         console.error("handleSubmitService: Error during image upload promise execution or getDownloadURL:", error);
        setUploadProgress(null);
        // Toast is typically handled by the inner error handler of uploadTask.on, but this catch is a fallback.
        // If not already toasted, ensure user knows.
        if (!(error && (error as any).message && (error as any).message.toLowerCase().includes("cors"))) { // Avoid double toast for CORS
            // toast({ title: "Image Upload Error", description: "An unexpected error occurred during image upload. Check console.", variant: "destructive" });
        }
        return; 
      }
    } else {
      console.log("handleSubmitService: No new image file to upload.");
      if (!finalImageUrl && !isEditing) {
         finalImageUrl = initialServiceFormState.imageUrl;
         console.log("handleSubmitService: Using default placeholder for new service as no image was provided.");
      } else if (isEditing && currentService.imageUrl) {
          console.log("handleSubmitService: Retaining existing image URL for edited service:", currentService.imageUrl);
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
        if (error.message.includes("PERMISSION_DENIED")) {
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
            <CardTitle className="text-base">Developer Notes & Troubleshooting Firebase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-muted-foreground">
            <p>This page interacts with Firestore for service data and Firebase Storage for image uploads.</p>
            
            <p className="font-semibold">If you encounter "PERMISSION_DENIED" errors or data isn't saving/loading/uploading:</p>
            <div className="pl-4 space-y-2">
                <div>
                    <p><strong>1. Enable APIs in Google Cloud Console:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Ensure <strong>Cloud Firestore API</strong> is enabled for project <code>suparshwamarketing</code>: <code className="text-xs">https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=suparshwamarketing</code>.</li>
                        <li>Ensure <strong>Cloud Storage API</strong> (often listed as "Cloud Storage" or `storage.googleapis.com`) is enabled for project <code>suparshwamarketing</code>. This is separate from "Firebase Storage API" which might also exist.</li>
                    </ul>
                </div>
                 <div>
                    <p className="mt-1"><strong>2. Check Firebase Configuration:</strong></p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Verify that <code>src/lib/firebase.ts</code> contains your correct and complete Firebase project configuration, especially `projectId` and `storageBucket` (e.g., `suparshwamarketing.appspot.com`).</li>
                    </ul>
                 </div>
                <div>
                    <p className="mt-1"><strong>3. Firestore Security Rules (Firestore Database &gt; Rules tab):</strong></p>
                    <p className="pl-2">These rules control who can read/write to your database. For development with authentication:</p>
                    <pre className="my-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
    {`rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // For the 'services' collection
        match /services/{serviceId} {
          // Allows anyone to read the services (for your public products page)
          allow read: if true;

          // Allows authenticated users to create, update, delete services.
          // Ensure you are logged into the admin panel.
          allow write: if request.auth != null;
        }
      }
    }`}
                    </pre>
                     <p className="pl-2">If still testing without full auth setup on admin: <code className="text-xs">allow write: if true;</code> (Less secure, for initial dev only).</p>
                </div>
                <div>
                    <p className="mt-1"><strong>4. Firebase Storage Security Rules (Storage &gt; Rules tab):</strong></p>
                    <p className="pl-2">These rules control who can upload/download files. For development, for the `services_images` folder (ensure your authenticated admin user can write):</p>
                    <pre className="my-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
    {`rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        // Allow public read access to images in the 'services_images' folder for display on your site
        match /services_images/{allPaths=**} {
          allow read: if true;

          // Allow authenticated users (your admin) to upload images to this folder.
          allow write: if request.auth != null;
        }
      }
    }`}
                    </pre>
                    <p className="pl-2">If still testing without full auth setup on admin: <code className="text-xs">allow write: if true;</code> under `services_images` (Less secure, for initial dev only).</p>
                </div>
                <div>
                    <p className="mt-1 font-semibold text-destructive"><strong>5. CORS Configuration for Firebase Storage (Google Cloud Storage Bucket):</strong></p>
                    <p className="pl-2">If uploads fail with CORS errors (Cross-Origin Resource Sharing), your Storage bucket needs to allow requests from your app's domain. This is configured on the Google Cloud Storage bucket, not directly in Firebase Storage rules.</p>
                    <p className="pl-2">Use the `gsutil` command-line tool (part of Google Cloud SDK):</p>
                    <ol className="list-decimal list-inside pl-6 space-y-1">
                        <li>Create a JSON file (e.g., `cors-config.json`):
                          <pre className="my-1 p-1.5 bg-muted rounded text-xs font-mono whitespace-pre-wrap">
    {`[
      {
        "origin": ["https://YOUR_CLOUD_WORKSTATIONS_DEV_URL", "http://localhost:9002"],
        "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
        "responseHeader": ["Content-Type", "Access-Control-Allow-Origin", "x-goog-resumable"],
        "maxAgeSeconds": 3600
      }
    ]`}
                          </pre>
                          Replace `"https://YOUR_CLOUD_WORKSTATIONS_DEV_URL"` with your actual preview domain (e.g., from your browser's address bar when viewing the app). Include `http://localhost:9002` if you also test locally. The `x-goog-resumable` header can sometimes be important for resumable uploads.
                        </li>
                        <li>Apply the config: `gsutil cors set cors-config.json gs://YOUR_BUCKET_NAME` (e.g., `gs://suparshwamarketing.appspot.com`)</li>
                        <li>Verify: `gsutil cors get gs://YOUR_BUCKET_NAME`</li>
                    </ol>
                </div>
                <strong className="text-destructive">Warning: Using `if true;` for rules is insecure and strictly for initial development. Secure your rules with proper authentication and authorization checks (e.g., `if request.auth != null;`) before deploying to production.</strong>
            </div>
            <p className="mt-2">If saving/uploading still fails, check your browser's developer console (usually F12) for detailed error messages from Firebase. These often provide specific clues about permission issues, API configurations, or CORS problems. Look for messages logged by "handleSubmitService:" to trace the execution flow.</p>
        </CardContent>
      </Card>
    </div>
  );
}


    