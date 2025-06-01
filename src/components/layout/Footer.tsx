
import Link from 'next/link';
import { BUSINESS_NAME, BUSINESS_ADDRESS_LINE1, BUSINESS_ADDRESS_LINE2, BUSINESS_PHONE, OWNER_EMAIL, BUSINESS_HOURS } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Business Info & Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image 
                src="/logo.png" 
                alt={`${BUSINESS_NAME} logo`} 
                width={50} 
                height={50}
                className="h-12 w-auto rounded-md group-hover:opacity-90 transition-opacity"
              />
              <span className="font-headline text-xl font-bold group-hover:text-primary transition-colors">{BUSINESS_NAME}</span>
            </Link>
            <p className="text-sm mb-4">
              Your trusted partner for all electrical wholesale needs. Providing quality products and reliable service.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-headline text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.slice(0,4).map((link) => ( // First 4 links
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 className="font-headline text-md font-semibold mb-4">Contact & Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-primary" />
                <span>{BUSINESS_ADDRESS_LINE1},<br />{BUSINESS_ADDRESS_LINE2}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-primary">{BUSINESS_PHONE}</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <a href={`mailto:${OWNER_EMAIL}`} className="hover:text-primary">{OWNER_EMAIL}</a>
              </li>
              <li className="flex items-start mt-2">
                 <Clock className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-primary" />
                <div>
                    <p>Mon - Sat: {BUSINESS_HOURS.MonSat}</p>
                    <p>Sun: {BUSINESS_HOURS.Sun}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h4 className="font-headline text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
               {footerLinks.slice(4).map((link) => ( // Remaining links
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
