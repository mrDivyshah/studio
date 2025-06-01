
"use client";

import Image from 'next/image';
import { TRUSTED_BY_LOGOS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function TrustedByLogos() {
  if (!TRUSTED_BY_LOGOS || TRUSTED_BY_LOGOS.length === 0) {
    return null;
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-sm font-medium text-center text-foreground/60 mb-8 tracking-wider uppercase"
            variants={itemVariants}
          >
            Trusted by
          </motion.h2>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16">
            {TRUSTED_BY_LOGOS.map((partner) => (
              <motion.div key={partner.id} variants={itemVariants} className="relative h-8 md:h-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  data-ai-hint={partner.logoHint}
                  width={partner.name === 'airbnb' ? 100 : (partner.name === 'CNN' ? 60 : 80)} // Approximate widths
                  height={40}
                  style={{ objectFit: 'contain', height: '100%', width: 'auto' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
