
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-[80svh] md:min-h-[90svh] flex items-center justify-center py-16 md:py-24 bg-gradient-to-br from-background to-secondary/20 text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Image
          src={SITE_HERO_IMAGE_URL}
          alt="Modern marketing concepts background"
          data-ai-hint={SITE_HERO_IMAGE_HINT}
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          className="animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
           <AnimatedText 
            text="Suparshwa Marketing" 
            el="h1"
            className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg"
            wordClassName="inline-block mr-3"
            highlightWords={["Marketing"]}
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
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
