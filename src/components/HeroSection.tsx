
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BUSINESS_NAME, BUSINESS_SLOGAN, OWNER_WHATSAPP_NUMBER, SITE_HERO_IMAGE_URL, SITE_HERO_IMAGE_HINT } from '@/lib/constants';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

export default function HeroSection() {
  const whatsappMessage = encodeURIComponent(`Hello ${BUSINESS_NAME}, I'd like to inquire about your services.`);
  const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Slightly more pronounced stagger
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 }, // Start slightly lower
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,   // Slightly softer spring
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-[80svh] md:min-h-[90svh] flex items-center justify-center py-16 md:py-24 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={SITE_HERO_IMAGE_URL}
          alt="Modern marketing concepts background"
          data-ai-hint={SITE_HERO_IMAGE_HINT}
          layout="fill"
          objectFit="cover"
          quality={80} // Increased quality
          priority
          className="animate-pulse-slow"
        />
        {/* Enhanced overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
           <AnimatedText 
            text={BUSINESS_NAME} // Using constant
            el="h1"
            className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg"
            wordClassName="inline-block mr-3" // For word-based animation if AnimatedText supports it, otherwise applies to each word span
            highlightWords={BUSINESS_NAME.split(' ').slice(-1)} // Example: Highlight the last word
            highlightClassName="text-primary"
          />
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md"
          variants={itemVariants}
        >
          {BUSINESS_SLOGAN}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl transition-transform hover:scale-105 rounded-lg px-10 py-3 text-base font-semibold">
            <Link href="/products">
              Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary shadow-xl transition-transform hover:scale-105 rounded-lg px-10 py-3 text-base font-semibold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
            </a>
          </Button>
        </motion.div>
      </motion.div>
       <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); } /* Adjusted opacity for better base visibility */
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
