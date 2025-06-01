
"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { PRODUCTS_DATA } from '@/lib/constants';
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
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const initialServiceFormState: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: 'https://placehold.co/400x300.png',
  imageHint: 'service placeholder',
  stockStatus: 'in-stock',
};

export default function ManageServicesPage() {
  const [services, setServices] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Product | Omit<Product, 'id'>>(initialServiceFormState);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setServices(PRODUCTS_DATA);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading services...</div>; // Or a skeleton loader
  }
  
  const handleAddNewService = () => {
    setIsEditing(false);
    setCurrentService(initialServiceFormState);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Product) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    // UI Only: Remove service from local state
    setServices(prevServices => prevServices.filter(s => s.id !== serviceId));
    toast({
      title: "Service Deleted (UI Only)",
      description: `Service with ID ${serviceId} has been removed from the list. Data is not persisted.`,
      variant: "destructive",
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };
  
  const handleSelectChange = (value: Product['stockStatus']) => {
     setCurrentService(prev => ({ ...prev, stockStatus: value }));
  };

  const handleSubmitService = () => {
    if (isEditing && 'id' in currentService) {
      // UI Only: Update service in local state
      setServices(prevServices => 
        prevServices.map(s => s.id === (currentService as Product).id ? (currentService as Product) : s)
      );
      toast({
        title: "Service Updated (UI Only)",
        description: `Service "${currentService.name}" has been updated. Data is not persisted.`,
      });
    } else {
      // UI Only: Add new service to local state with a temporary ID
      const newServiceWithId: Product = {
        ...currentService,
        id: `temp-${Date.now().toString()}`,
      };
      setServices(prevServices => [newServiceWithId, ...prevServices]);
      toast({
        title: "Service Added (UI Only)",
        description: `New service "${currentService.name}" has been added. Data is not persisted.`,
      });
    }
    setIsDialogOpen(false);
    setCurrentService(initialServiceFormState);
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
              <Input id="name" name="name" value={currentService.name} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" value={currentService.description} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={currentService.price} onChange={handleFormChange} className="col-span-3" />
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
              <Input id="imageUrl" name="imageUrl" value={currentService.imageUrl} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
              <Input id="imageHint" name="imageHint" value={currentService.imageHint} onChange={handleFormChange} className="col-span-3" />
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No services found.
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
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteService(service.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="text-base">Developer Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>This page is a UI demonstration. Data modifications (add, edit, delete) are only reflected in the local component state and are not persisted.</p>
                <p>To make this functional, you would need to:
                    <ul className="list-disc list-inside pl-4">
                        <li>Implement backend APIs (e.g., using Next.js API Routes or a separate backend service).</li>
                        <li>Connect to a database (e.g., Firestore, PostgreSQL, MongoDB) to store and manage service data.</li>
                        <li>Secure the admin routes and API endpoints with authentication and authorization.</li>
                    </ul>
                </p>
            </CardContent>
        </Card>
    </div>
  );
}

