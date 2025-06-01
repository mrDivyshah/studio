import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS_DATA } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
// This page would ideally have client-side filtering/sorting logic
// For now, it will be a static display.

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Browse our wide range of quality electrical wholesale products.',
};

// Dummy component for search and filter controls
function ProductFilters() {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-1">
          <label htmlFor="search" className="text-sm font-medium">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="search" placeholder="e.g., Cable, LED Light" className="pl-10" />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="breakers">Circuit Breakers</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="cables">Cables & Wires</SelectItem>
              <SelectItem value="tools">Tools & Instruments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="sort" className="text-sm font-medium">Sort By</label>
          <Select>
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
  );
}


export default function ProductsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="font-headline text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a comprehensive selection of high-quality electrical supplies for all your project needs.
        </p>
      </section>

      <ProductFilters />

      <section>
        {PRODUCTS_DATA.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products available at the moment. Please check back later.</p>
          </div>
        )}
      </section>
    </div>
  );
}
