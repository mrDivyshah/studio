
"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { BUSINESS_NAME, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import FreebirdLogoIcon from '@/components/icons/FreebirdLogoIcon';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background supports-[backdrop-filter]:bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
          <FreebirdLogoIcon className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
          <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary/80 transition-colors">{BUSINESS_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                pathname === link.href ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                pathname === "/login" ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              Login In
          </Link>
           <Button asChild variant="outline" className="ml-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
             <Link href="/signup">Sign Up</Link>
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
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <FreebirdLogoIcon className="h-7 w-7 text-primary" />
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
                  <SheetClose asChild>
                     <Link
                        href="/login"
                        className={cn(
                          "text-lg font-medium transition-colors hover:bg-muted py-3 px-3 rounded-md",
                           pathname === "/login" ? "bg-muted text-primary font-semibold" : "text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login In
                      </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4 w-full py-3 text-lg">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
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
