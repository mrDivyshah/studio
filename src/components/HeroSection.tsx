import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BUSINESS_NAME, BUSINESS_SLOGAN, OWNER_WHATSAPP_NUMBER } from '@/lib/constants';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to inquire about your services.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              <span className="block">Suparshwa</span>
              <span className="block text-primary">Marketing</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              {BUSINESS_SLOGAN}
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-105 rounded-lg px-8 py-3">
                <Link href="/products"> {/* products path still leads to services page */}
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground shadow-lg transition-transform hover:scale-105 rounded-lg px-8 py-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="relative w-full max-w-md md:max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              <Image
                src="https://placehold.co/600x600.png" 
                alt="Modern marketing concepts"
                data-ai-hint="abstract marketing vibrant" 
                layout="fill"
                objectFit="cover"
                quality={85}
                className="rounded-2xl"
              />
            </div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full opacity-50 hidden md:block"></div>
             <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full opacity-70 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
