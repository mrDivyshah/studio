import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import { BUSINESS_HOURS, BUSINESS_ADDRESS_LINE1, BUSINESS_ADDRESS_LINE2, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/constants';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Electro Hub. Find our location, business hours, and send us a message.',
};

// This is a server component, ContactForm and MapEmbed are client components.
export default function ContactPage({ searchParams }: { searchParams?: { product?: string }}) {
  const productName = searchParams?.product;

  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold mb-4">Contact Electro Hub</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're here to help with all your electrical supply needs. Reach out to us through the form below, or visit us at our location.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <section>
          <h2 className="font-headline text-2xl font-semibold mb-6">Send Us a Message</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm productName={productName} />
          </Suspense>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-6">Our Location</h2>
            <MapEmbed />
          </div>

          <div className="p-6 border rounded-lg shadow-lg bg-card">
            <h3 className="font-headline text-xl font-semibold mb-4">Business Information</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                <span>{BUSINESS_ADDRESS_LINE1},<br />{BUSINESS_ADDRESS_LINE2}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 shrink-0 text-primary" />
                <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-primary">{BUSINESS_PHONE}</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 shrink-0 text-primary" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-primary">{BUSINESS_EMAIL}</a>
              </li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg shadow-lg bg-card">
            <h3 className="font-headline text-xl font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-3 shrink-0 text-primary" />
              Business Hours
            </h3>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong>Monday - Saturday:</strong> {BUSINESS_HOURS.MonSat}</li>
              <li><strong>Sunday:</strong> {BUSINESS_HOURS.Sun}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
