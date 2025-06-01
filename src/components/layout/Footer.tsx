import Link from 'next/link';
import { BUSINESS_NAME, BUSINESS_HOURS, BUSINESS_ADDRESS_LINE1, BUSINESS_ADDRESS_LINE2, BUSINESS_PHONE, BUSINESS_EMAIL, NAV_LINKS } from '@/lib/constants';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{BUSINESS_NAME}</h3>
            <p className="text-sm">Your trusted partner for all electrical wholesale needs. Providing quality products and reliable service.</p>
          </div>
          
          <div>
            <h4 className="font-headline text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-primary">{BUSINESS_EMAIL}</a>
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
          
          <div>
            <h4 className="font-headline text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
