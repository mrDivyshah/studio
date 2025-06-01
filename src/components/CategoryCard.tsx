
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden rounded-xl shadow-lg group transition-all duration-300">
        <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="block h-full">
          <div className="relative w-full h-48">
            <Image
              src={category.imageUrl}
              alt={category.name}
              data-ai-hint={category.imageHint}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>
          <CardContent className="p-4 absolute bottom-0 left-0 right-0">
            <CardTitle className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-500 ease-in-out [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
              {category.name}
            </CardTitle>
            <div className="flex items-center text-sm text-primary-foreground/80 group-hover:text-primary transition-colors duration-500 ease-in-out mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
              Explore <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;

