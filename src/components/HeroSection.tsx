import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BUSINESS_NAME, BUSINESS_SLOGAN, OWNER_WHATSAPP_NUMBER } from '@/lib/constants';
import { ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to inquire about your products.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/80 to-accent text-primary-foreground py-20 md:py-32 rounded-lg shadow-xl overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Electrical components background"
          data-ai-hint="electrical components abstract"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for better text contrast */}
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {BUSINESS_NAME}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto">
          {BUSINESS_SLOGAN}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-md transition-transform hover:scale-105">
            <Link href="/products">
              Explore Products <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 shadow-md transition-transform hover:scale-105">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-5 w-5" /> Contact us on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
