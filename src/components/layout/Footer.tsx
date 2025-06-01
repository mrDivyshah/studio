
import Link from 'next/link';
import { BUSINESS_NAME } from '@/lib/constants';
import FreebirdLogoIcon from '@/components/icons/FreebirdLogoIcon'; // Assuming you might want the logo here too

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <footer className="bg-background border-t border-border/30 text-foreground/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <FreebirdLogoIcon className="h-7 w-7 text-primary group-hover:text-primary/80 transition-colors" />
              <span className="font-headline text-xl font-bold text-foreground group-hover:text-primary/80 transition-colors">{BUSINESS_NAME}</span>
            </Link>
          </div>
          
          <nav className="col-span-1 md:col-span-2">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="border-t border-border/30 pt-8 text-center text-sm">
          <p>&copy; {currentYear} {BUSINESS_NAME}. All rights reserved.</p>
          <p className="mt-1">Connecting talent with opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
