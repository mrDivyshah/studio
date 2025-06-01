
"use client";

import type { Metadata } from 'next'; // Keep for potential static metadata, though dynamic might be better
import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS_DATA, BUSINESS_NAME } from '@/lib/constants';
import type { Product } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';


// export const metadata: Metadata = { // Static metadata, can be removed or adjusted if using dynamic
//   title: 'Our Services',
//   description: `Browse our wide range of marketing services at ${BUSINESS_NAME}.`,
// };

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const availableCategories = useMemo(() => {
    const categories = new Set(PRODUCTS_DATA.map(p => p.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(categories)];
  }, []);

  const filteredAndSortedServices = useMemo(() => {
    let services = [...PRODUCTS_DATA];

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
      default:
        // Default sort or sort by ID if needed
        services.sort((a,b) => parseInt(a.id) - parseInt(b.id));
        break;
    }
    return services;
  }, [searchTerm, selectedCategory, sortBy]);

  if (!isMounted) {
    // Optional: return a loading state or skeleton here
    return (
      <div className="space-y-12">
        <section className="text-center pt-8">
          <h1 className="font-headline text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Loading services...
          </p>
        </section>
      </div>
    );
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
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
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
              {searchTerm || selectedCategory !== 'all' ? 'No services match your criteria.' : 'No services available at the moment. Please check back later.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
