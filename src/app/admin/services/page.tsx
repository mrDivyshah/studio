
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const initialServiceFormState: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: 'https://placehold.co/400x300.png',
  imageHint: 'service placeholder',
  stockStatus: 'in-stock',
  category: 'Uncategorized',
  // createdAt: Timestamp.now() // To be added before saving
};

export default function ManageServicesPage() {
  const [services, setServices] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Product>>(initialServiceFormState);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollection = collection(db, 'services');
      const q = query(servicesCollection, orderBy('createdAt', 'desc')); // Assuming you add a createdAt field
      const servicesSnapshot = await getDocs(q);
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services: ", error);
      toast({
        title: "Error fetching services",
        description: "Could not load services from Firestore.",
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
    setCurrentService({...initialServiceFormState});
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Product) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!serviceId) {
      toast({ title: "Error", description: "Service ID is missing.", variant: "destructive" });
      return;
    }
    try {
      await deleteDoc(doc(db, 'services', serviceId));
      setServices(prevServices => prevServices.filter(s => s.id !== serviceId));
      toast({
        title: "Service Deleted",
        description: `Service has been removed successfully.`,
      });
    } catch (error) {
      console.error("Error deleting service: ", error);
      toast({
        title: "Error deleting service",
        description: "Could not delete service from Firestore.",
        variant: "destructive",
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };
  
  const handleSelectChange = (value: Product['stockStatus']) => {
     setCurrentService(prev => ({ ...prev, stockStatus: value }));
  };

  const handleCategoryChange = (value: string) => {
     setCurrentService(prev => ({ ...prev, category: value }));
  };

  const handleSubmitService = async () => {
    if (!currentService.name || currentService.price === undefined) {
      toast({ title: "Validation Error", description: "Service name and price are required.", variant: "destructive" });
      return;
    }

    const serviceData = {
      ...currentService,
      price: Number(currentService.price) || 0,
      category: currentService.category || 'Uncategorized',
    };

    try {
      if (isEditing && currentService.id) {
        const serviceRef = doc(db, 'services', currentService.id);
        await updateDoc(serviceRef, {...serviceData, updatedAt: Timestamp.now()});
        toast({
          title: "Service Updated",
          description: `Service "${currentService.name}" has been updated.`,
        });
      } else {
        await addDoc(collection(db, 'services'), {...serviceData, createdAt: Timestamp.now()});
        toast({
          title: "Service Added",
          description: `New service "${currentService.name}" has been added.`,
        });
      }
      fetchServices(); // Refresh the list
      setIsDialogOpen(false);
      setCurrentService(initialServiceFormState);
    } catch (error) {
      console.error("Error saving service: ", error);
      toast({
        title: "Error saving service",
        description: "Could not save service to Firestore.",
        variant: "destructive",
      });
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" value={currentService.imageUrl || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
              <Input id="imageHint" name="imageHint" value={currentService.imageHint || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                 {currentService.imageUrl && (
                    <Image src={currentService.imageUrl} alt={currentService.name || "Service image"} width={100} height={75} className="rounded-md object-cover border" data-ai-hint={currentService.imageHint || "placeholder image"}/>
                  )}
                </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitService}>{isEditing ? 'Save Changes' : 'Add Service'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        {isLoading ? (
          <div className="p-4 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
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
                  <TableCell colSpan={6} className="text-center">
                    No services found. Add new services to see them here.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Image 
                        src={service.imageUrl} 
                        alt={service.name} 
                        width={60} 
                        height={45} 
                        className="rounded-md object-cover"
                        data-ai-hint={service.imageHint || "service item"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs rounded-full ${
                          service.stockStatus === 'in-stock' ? 'bg-green-100 text-green-800' :
                          service.stockStatus === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {service.stockStatus.replace('-', ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteService(service.id!)}>
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
            <CardTitle className="text-base">Developer Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>This page now interacts with Firestore to manage services.</p>
            <div>Make sure:
                <ul className="list-disc list-inside pl-4">
                    <li>Your Firebase project is configured correctly in <code>src/lib/firebase.ts</code>.</li>
                    <li>You have a "services" collection in Firestore.</li>
                    <li>Firestore security rules are set up to allow reads/writes as needed (e.g., for authenticated admin users).</li>
                    <li>Each service document should include a 'createdAt' (Timestamp) field for default sorting. Add 'updatedAt' for edits.</li>
                </ul>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
