
"use client";

import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const fetchServices = async (): Promise<Product[]> => {
  const servicesCollection = collection(db, 'services');
  // Assuming you add a createdAt field for default ordering, or use product ID if numeric
  const q = query(servicesCollection, orderBy('name', 'asc')); 
  const servicesSnapshot = await getDocs(q);
  return servicesSnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      // Ensure price is a number
      price: Number(data.price) || 0,
    } as Product;
  });
};

function ServicesPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc'); // Default sort by name

  const { data: productsData = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  const availableCategories = useMemo(() => {
    if (!productsData) return ['all'];
    const categories = new Set(productsData.map(p => p.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(categories).sort()];
  }, [productsData]);

  const filteredAndSortedServices = useMemo(() => {
    let services = [...productsData];

    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      services = services.filter(service => service.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        services.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        services.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        services.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // Add default if needed, but name-asc covers it mostly
      default:
        services.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return services;
  }, [searchTerm, selectedCategory, sortBy, productsData]);

  if (isLoading) {
    return (
      <div className="space-y-12">
        <section className="text-center pt-8">
          <h1 className="font-headline text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Loading services...
          </p>
        </section>
        <div className="mb-8 p-6 bg-card rounded-lg shadow">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
           </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
       <div className="text-center py-12">
            <p className="text-xl text-destructive">
              Error loading services. Please try again later.
            </p>
        </div>
    )
  }

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="font-headline text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a comprehensive selection of high-quality marketing services for all your business needs.
        </p>
      </section>

      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1">
            <Label htmlFor="search" className="text-sm font-medium">Search Services</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="e.g., SEO, Branding"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="sort" className="text-sm font-medium">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section>
        {filteredAndSortedServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedServices.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' ? 'No services match your criteria.' : 'No services available at the moment. Please check back later or add services via the admin panel.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

const queryClient = new QueryClient();

export default function ServicesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServicesPageContent />
    </QueryClientProvider>
  );
}
