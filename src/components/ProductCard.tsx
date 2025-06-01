import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getStockBadgeVariant = (status: Product['stockStatus']) => {
    switch (status) {
      case 'in-stock':
        return 'default'; // Greenish or positive color (depends on theme)
      case 'low-stock':
        return 'secondary'; // Yellowish or warning color
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const stockText = product.stockStatus.replace('-', ' ');

  return (
    <Card id={product.id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-56 sm:h-64">
        <Image
          src={product.imageUrl}
          alt={product.name}
          data-ai-hint={product.imageHint}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-headline text-xl leading-tight h-12 overflow-hidden">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm h-16 overflow-hidden mb-3">{product.description}</CardDescription>
        <p className="text-2xl font-semibold text-primary mb-2">${product.price.toFixed(2)}</p>
        <Badge 
          variant={getStockBadgeVariant(product.stockStatus)} 
          className={cn(
            "capitalize text-xs px-2 py-1",
            product.stockStatus === "in-stock" && "bg-green-500 hover:bg-green-600 text-white",
            product.stockStatus === "low-stock" && "bg-yellow-500 hover:bg-yellow-600 text-black",
            product.stockStatus === "out-of-stock" && "bg-red-500 hover:bg-red-600 text-white"
          )}
        >
          {stockText}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          {/* This link is illustrative; a real e-commerce site would link to a product detail page */}
          <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
            Inquire Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
