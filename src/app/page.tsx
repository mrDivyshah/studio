
"use client";

// import type { Metadata } from 'next'; // Keep for potential static metadata, though client components limit its direct use
import HeroSection from '@/components/HeroSection'; // Re-added HeroSection import
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp, Lightbulb, Users, Layers, Palette, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { OWNER_WHATSAPP_NUMBER, BUSINESS_NAME } from '@/lib/constants';
import type { Product } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import AnimatedText from '@/components/AnimatedText';
import CategoryCard from '@/components/CategoryCard';

// export const metadata: Metadata = {
//   title: 'Home', 
// }; // Metadata usually in server components or layout

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0, once = true }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay, ease: "easeOut" } 
    },
  };

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
};


// Simulate fetching categories or define static ones
const placeholderCategories = [
  { id: 'cat1', name: 'Digital Marketing', imageUrl: 'https://images.unsplash.com/photo-1623707430101-9e74cefe05e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzd2l0Y2h8ZW58MHx8fHwxNzQ4NzU5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'electrical switch' },
  { id: 'cat2', name: 'Branding Solutions', imageUrl: 'https://images.unsplash.com/photo-1590327813360-fdbca9ec1cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8c3dpdGNofGVufDB8fHx8MTc0ODc1OTY0MHww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'electrical wiring' },
  { id: 'cat3', name: 'Content Creation', imageUrl: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzb2NrZXR8ZW58MHx8fHwxNzQ4NzU5OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'electrical socket' },
  { id: 'cat4', name: 'Web Development', imageUrl: 'https://images.unsplash.com/photo-1590327813360-fdbca9ec1cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzd2l0Y2glMjBib2FyZHxlbnwwfHx8fDE3NDg3NTk5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'switch board' },
];


export default function HomePage() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to know more about your services.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  
  const [featuredServices, setFeaturedServices] = useState<Product[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  useEffect(() => {
    async function getFeaturedServices(): Promise<Product[]> {
      try {
        const servicesCollection = collection(db, 'services');
        const q = query(servicesCollection, orderBy('name', 'asc'), firestoreLimit(3));
        const servicesSnapshot = await getDocs(q);
        return servicesSnapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                price: Number(data.price) || 0,
            } as Product;
        });
      } catch (error)
      {
        console.error("Error fetching featured services:", error);
        return [];
      }
    }

    getFeaturedServices().then(services => {
      setFeaturedServices(services);
      setIsLoadingServices(false);
    });
  }, []);


  const features = [
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Strategies designed for measurable results and sustainable business expansion."
    },
    {
      icon: Lightbulb,
      title: "Creative Innovation",
      description: "Fresh, inventive marketing approaches tailored to your unique brand and objectives."
    },
    {
      icon: Users,
      title: "Expert Collaboration",
      description: "A dedicated team working closely with you to achieve your marketing goals."
    },
     {
      icon: Palette,
      title: "Design Excellence",
      description: "Visually stunning and impactful creative work that elevates your brand's presence."
    },
    {
      icon: Layers,
      title: "Comprehensive Solutions",
      description: "Full-spectrum marketing services covering all aspects of your brand's journey."
    },
    {
      icon: ShieldCheck,
      title: "Reliable Partnership",
      description: "A trustworthy and transparent partner committed to your long-term success."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-32 overflow-x-hidden">
      <HeroSection /> {/* Re-added HeroSection component */}

      <AnimatedSection className="container mx-auto px-4"> {/* Removed pt-16 */}
        <div className="text-center mb-16">
          <AnimatedText 
            text="Why Partner With Us?"
            el="h2"
            className="font-headline text-3xl md:text-4xl font-bold mb-4 text-foreground"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the {BUSINESS_NAME} difference. We're more than a marketing agency; we're your strategic growth partner.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-left p-6 border-transparent hover:border-primary/30 h-full flex flex-col items-start hover:scale-105">
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-5">
                  <feature.icon className="w-7 h-7" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="font-headline text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="container mx-auto px-4">
        <div className="text-center mb-16">
           <AnimatedText 
            text="Explore Our Categories"
            el="h2"
            className="font-headline text-3xl md:text-4xl font-bold mb-4 text-foreground"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect solution from our diverse range of service categories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholderCategories.map((category, index) => (
             <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>


      <AnimatedSection className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Featured Services"
            el="h2"
            className="font-headline text-3xl md:text-4xl font-bold mb-4 text-foreground"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked services to kickstart your brand's transformation.
          </p>
        </div>
        {isLoadingServices ? (
          <p className="text-center text-muted-foreground">Loading services...</p>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((product, index) => (
               <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured services available at the moment. Please check back soon.</p>
        )}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-transform hover:scale-105 rounded-lg px-10 py-3">
            <Link href="/products">Discover All Services</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-primary text-primary-foreground rounded-xl shadow-xl mx-4 md:mx-8">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
           <AnimatedText 
            text="Ready to Ignite Your Brand's Potential?"
            el="h2"
            className="font-headline text-3xl md:text-4xl font-bold mb-6 text-white" // Adjusted text color for primary background
          />
          <motion.p 
            className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Let's collaborate and create something extraordinary. Contact {BUSINESS_NAME} today for a complimentary consultation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
          >
            <Button asChild variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90 shadow-lg transition-transform hover:scale-105 rounded-lg px-10 py-3 font-semibold">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}

    
