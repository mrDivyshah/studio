
"use client";

import Image from 'next/image';
import { SITE_HERO_TITLE, BUSINESS_SLOGAN, SITE_HERO_IMAGE_URL, SITE_HERO_IMAGE_HINT, OWNER_WHATSAPP_NUMBER } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquareText, ArrowRight } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Slightly increased stagger
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 }, // Slightly more y offset
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80, // Softer spring
        damping: 15,    // Adjusted damping
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        delay: 0.5, // Image appears a bit later
      },
    },
  };

  const whatsappLink = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Suparshwa Marketing, I'm interested in your services.")}`;

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Decorative subtle pattern or blurred image could go here */}
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 min-h-[calc(100vh-5rem)] flex items-center">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center md:text-left z-10">
            <AnimatedText
              el="h1"
              text={SITE_HERO_TITLE}
              className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
              highlightWords={['Suparshwa', 'Marketing']}
              highlightClassName="text-primary"
              staggerDelay={0.08}
            />
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              {BUSINESS_SLOGAN}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-105 rounded-lg px-8 py-3 text-base font-semibold">
                <Link href="/products">
                  Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground shadow-xl transition-transform hover:scale-105 rounded-lg px-10 py-3 text-base font-semibold">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageSquareText className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative w-full max-w-2xl mx-auto md:max-w-none aspect-square md:aspect-[4/3.5] rounded-xl overflow-hidden shadow-2xl group"
            variants={imageVariants}
          >
            <Image
              src={SITE_HERO_IMAGE_URL}
              alt="Dynamic marketing team collaborating"
              data-ai-hint={SITE_HERO_IMAGE_HINT}
              layout="fill"
              objectFit="cover"
              quality={80} 
              priority
              className="transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
