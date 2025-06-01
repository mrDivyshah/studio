
"use client";

import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react'; // Added ShoppingBag
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { BUSINESS_NAME, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Placeholder for logo and name */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-muted rounded-full"></div>
            <span className="font-headline text-2xl font-bold text-transparent bg-muted animate-pulse rounded-md">Loading...</span>
          </div>
          {/* Placeholder for nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-muted animate-pulse rounded-md"></div>
            ))}
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md ml-2"></div>
          </div>
          <div className="md:hidden h-8 w-8 bg-muted animate-pulse rounded-md"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
           <Image 
            src="/logo.png" 
            alt={`${BUSINESS_NAME} logo`} 
            width={48} 
            height={48}
            className="h-10 w-auto group-hover:opacity-80 transition-opacity"
          />
          <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{BUSINESS_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                pathname === link.href ? "text-primary font-semibold bg-primary/10" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
           <Button variant="ghost" size="icon" className="ml-2 hover:bg-primary/10 group">
            <ShoppingBag className="h-5 w-5 text-foreground/70 group-hover:text-primary" />
            <span className="sr-only">View Cart</span>
          </Button>
        </nav>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 hover:bg-primary/10 group">
            <ShoppingBag className="h-5 w-5 text-foreground/70 group-hover:text-primary" />
            <span className="sr-only">View Cart</span>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 bg-background text-foreground">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt={`${BUSINESS_NAME} logo`} width={40} height={40} className="h-8 w-auto"/>
                    <span className="font-headline text-xl font-bold text-primary">{BUSINESS_NAME}</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6 text-foreground" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow flex flex-col gap-2 p-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:bg-muted py-3 px-3 rounded-md",
                           pathname === link.href ? "bg-muted text-primary font-semibold" : "text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
