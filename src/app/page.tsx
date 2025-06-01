
"use client";

import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import PartnerLogos from '@/components/PartnerLogos';
// import TestimonialSlider from '@/components/TestimonialSlider'; // Assuming this component will be created or adapted
import { CATEGORIES_DATA, TESTIMONIALS, PARTNERS_DATA } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Lightbulb } from 'lucide-react';

// Mock TestimonialSlider component
const TestimonialSlider = ({ testimonials }: { testimonials: any[] }) => {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <div className="space-y-4 text-center">
      {testimonials.slice(0, 1).map((testimonial, index) => ( // Show only first for simplicity
        <div key={index} className="p-6 bg-card rounded-lg shadow-md max-w-md mx-auto">
          <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
          <p className="mt-4 font-semibold text-foreground">- {testimonial.name}, {testimonial.company}</p>
        </div>
      ))}
    </div>
  );
};


export default function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary mb-4" />,
      title: "Data-Driven Strategies",
      description: "Leveraging analytics to create impactful marketing campaigns that convert.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: "Creative Solutions",
      description: "Innovative ideas and compelling content that make your brand stand out.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary mb-4" />,
      title: "Measurable Growth",
      description: "Focused on delivering tangible results and maximizing your ROI.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen space-y-16 md:space-y-24 pb-16">
      <HeroSection />

      <motion.section
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Why Choose <span className="text-primary">Suparshwa Marketing?</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          We blend cutting-edge technology with creative expertise to deliver marketing solutions that drive real business growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/30 text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="font-headline text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {CATEGORIES_DATA && CATEGORIES_DATA.length > 0 && (
        <motion.section 
          className="container mx-auto px-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CATEGORIES_DATA.map((category, index) => (
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
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 group">
              <Link href="/products">
                View All Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.section>
      )}

      {TESTIMONIALS && TESTIMONIALS.length > 0 && (
        <motion.section
          className="bg-secondary/30 py-16 md:py-24 rounded-xl overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              What Our Clients Say
            </h2>
            <TestimonialSlider testimonials={TESTIMONIALS} />
          </div>
        </motion.section>
      )}

      {PARTNERS_DATA && PARTNERS_DATA.length > 0 && (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <PartnerLogos />
        </motion.div>
      )}

    </div>
  );
}
