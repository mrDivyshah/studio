
"use client";

import Image from 'next/image';
import type { Product } from '@/types'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getStockBadgeVariant = (status: Product['stockStatus']) => {
    switch (status) {
      case 'in-stock':
        return 'default'; 
      case 'low-stock':
        return 'secondary'; 
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const stockText = product.stockStatus === 'in-stock' ? 'Available' : product.stockStatus.replace('-', ' ');

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Card id={product.id} className="flex flex-col h-full bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            data-ai-hint={product.imageHint}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="font-headline text-xl leading-tight h-12 overflow-hidden text-foreground group-hover:text-primary transition-colors">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow px-4">
          <CardDescription className="text-sm text-muted-foreground h-16 overflow-hidden mb-3">{product.description}</CardDescription>
          <p className="text-2xl font-bold text-primary mb-2">${product.price.toFixed(2)}</p>
          <Badge 
            variant={getStockBadgeVariant(product.stockStatus)} 
            className={cn(
              "capitalize text-xs px-2 py-1 rounded-md",
              product.stockStatus === "in-stock" && "bg-green-500/80 hover:bg-green-600/80 text-white",
              product.stockStatus === "low-stock" && "bg-yellow-500/80 hover:bg-yellow-600/80 text-black",
              product.stockStatus === "out-of-stock" && "bg-red-500/80 hover:bg-red-600/80 text-white"
            )}
          >
            {stockText}
          </Badge>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-2">
          <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg py-3 font-medium">
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
              Inquire Now
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
