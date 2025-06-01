
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import PartnerLogos from '@/components/PartnerLogos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from '@/lib/constants';
import type { Product } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';

export const metadata: Metadata = {
  title: 'Home', 
};

async function getFeaturedServices(): Promise<Product[]> {
  try {
    const servicesCollection = collection(db, 'services');
    // Assuming 'createdAt' for recency or 'name' for alphabetical. Adjust as needed.
    const q = query(servicesCollection, orderBy('name', 'asc'), firestoreLimit(3));
    const servicesSnapshot = await getDocs(q);
    return servicesSnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            price: Number(data.price) || 0, // Ensure price is a number
        } as Product;
    });
  } catch (error) {
    console.error("Error fetching featured services:", error);
    return []; // Return empty array on error
  }
}

export default async function HomePage() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to know more about your services.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  const featuredServices = await getFeaturedServices();

  const features = [
    {
      icon: TrendingUp,
      title: "Results-Driven Strategies",
      description: "We focus on delivering measurable results that help your business grow and achieve its objectives."
    },
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "Creative and cutting-edge marketing approaches tailored to your unique needs and market position."
    },
    {
      icon: Users,
      title: "Expert Team Support",
      description: "Our experienced team is dedicated to your success, providing ongoing support and expert guidance."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28">
      <HeroSection />

      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">Why Choose <span className="text-primary">{BUSINESS_NAME}</span>?</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          Partner with us to transform your marketing efforts and achieve sustainable growth.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center p-6 border-transparent hover:border-primary/30">
              <CardHeader className="items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl font-semibold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <PartnerLogos />
      
      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Our Core Services</h2>
        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((product) => (
              <Card key={product.id} className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group flex flex-col">
                <div className="relative w-full h-60">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    data-ai-hint={product.imageHint}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="font-headline text-xl text-foreground">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-3 h-12 overflow-hidden">{product.description}</p>
                  <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-3">
                    <Link href={`/products#${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No services available at the moment. Please check back soon or add services via the admin panel.</p>
        )}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-transform hover:scale-105 rounded-lg px-10 py-3">
            <Link href="/products">See All Services</Link>
          </Button>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground rounded-xl shadow-xl">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Marketing?</h2>
          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how {BUSINESS_NAME} can help your business thrive. Contact us today for a consultation.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-lg transition-transform hover:scale-105 rounded-lg px-10 py-3 font-semibold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
