
"use client";

import Image from 'next/image';
import { HERO_TITLE, BUSINESS_SLOGAN, HERO_IMAGE_URL, HERO_IMAGE_HINT } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function HeroSection() {
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
    hidden: { y: 30, opacity: 0 },
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
    <section className="bg-background text-foreground py-16 md:py-24">
      <motion.div
        className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center md:text-left">
          <motion.h1
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            {HERO_TITLE.split(' ').map((word, index, arr) => (
              <span key={index} className={word.toLowerCase() === "love" ? "text-primary" : ""}>
                {word}{index < arr.length -1 ? " " : ""}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg mx-auto md:mx-0"
            variants={itemVariants}
          >
            {BUSINESS_SLOGAN}
          </motion.p>
        </div>
        
        <motion.div className="relative w-full max-w-xl mx-auto md:max-w-none h-64 md:h-[350px]" variants={itemVariants}>
          <Image
            src={HERO_IMAGE_URL}
            alt="Freelance community illustration"
            data-ai-hint={HERO_IMAGE_HINT}
            layout="fill"
            objectFit="contain" 
            quality={85}
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
