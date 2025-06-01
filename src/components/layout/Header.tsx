"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { BUSINESS_NAME, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
          <Image 
            src="/logo.png" 
            alt={`${BUSINESS_NAME} logo`} 
            width={50} 
            height={50}
            className="h-10 w-auto md:h-12 group-hover:opacity-80 transition-opacity"
            priority 
          />
          <span className="font-headline text-xl font-bold text-foreground group-hover:text-primary transition-colors hidden sm:inline">{BUSINESS_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
           <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md ml-2">
             <Link href="/contact">Contact Us</Link>
           </Button>
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 bg-background text-foreground">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image 
                      src="/logo.png" 
                      alt={`${BUSINESS_NAME} logo`} 
                      width={40} 
                      height={40} 
                      className="h-10 w-auto"
                    />
                    <span className="font-headline text-lg font-bold text-primary">{BUSINESS_NAME}</span>
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
                          "text-lg font-medium transition-colors hover:text-primary py-3 px-3 rounded-md",
                           pathname === link.href ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md mt-4 w-full py-3 text-lg">
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                    </Button>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
