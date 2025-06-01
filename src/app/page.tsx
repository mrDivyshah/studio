import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import PartnerLogos from '@/components/PartnerLogos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Lightbulb, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRODUCTS_DATA, OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Home', 
};

export default function HomePage() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to know more about your services.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />

      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl font-bold text-center mb-12">Why Choose Electro Hub?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-xl">Wide Product Range</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From basic wiring to advanced control systems, find everything you need under one roof.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
               <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-xl">Quality Assured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We source products from trusted brands, ensuring durability and performance.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-xl">Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our knowledgeable team is ready to assist you with product selection and technical advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <PartnerLogos />
      
      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.slice(0, 3).map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative w-full h-60">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  data-ai-hint={product.imageHint}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2 h-10 overflow-hidden">{product.description}</p>
                <p className="text-lg font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/products#${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/products">See All Products</Link>
          </Button>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-headline text-3xl font-bold mb-6">Ready to Power Up Your Projects?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a quote or to discuss your electrical supply needs.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-md transition-transform hover:scale-105">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
