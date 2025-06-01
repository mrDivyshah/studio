
"use client";

import HeroSection from '@/components/HeroSection';
import TrustedByLogos from '@/components/TrustedByLogos';
import JobCard, { type Job } from '@/components/JobCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock job data for demonstration
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Product Designer',
    description: 'We are looking for a Senior Product Designer for our mobile team. Shape the future of our user experience.',
    companyName: 'GoPro',
    companyLogoUrl: 'https://placehold.co/40x40/000000/FFFFFF.png?text=G', // text query to make it look like a logo
    companyLogoHint: 'gopro logo',
    postedDate: '1 Day Ago',
    jobType: 'Full-time',
    location: 'Remote',
    applyUrl: '/jobs/product-designer',
  },
  {
    id: '2',
    title: 'Web Designer',
    description: 'Join our creative team as a Web Designer. You will be responsible for designing visually appealing and user-friendly websites.',
    companyName: 'Septwolves',
    companyLogoUrl: 'https://placehold.co/40x40/A0A0A0/FFFFFF.png?text=S',
    companyLogoHint: 'wolf logo',
    postedDate: '1 Day Ago',
    jobType: 'Full-time',
    location: 'Remote',
    applyUrl: '/jobs/web-designer',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    description: 'Exciting opportunity for a UI/UX Designer to create intuitive and engaging interfaces for our diverse range of products.',
    companyName: 'McDonalds',
    companyLogoUrl: 'https://placehold.co/40x40/FFC72C/DA291C.png?text=M',
    companyLogoHint: 'mcdonalds logo',
    postedDate: '1 Day Ago',
    jobType: 'Full-time',
    location: 'Remote',
    applyUrl: '/jobs/ui-ux-designer',
  },
   {
    id: '4',
    title: 'Frontend Developer',
    description: 'We need a skilled Frontend Developer to build responsive and performant web applications using modern technologies.',
    companyName: 'Tech Solutions Inc.',
    companyLogoUrl: 'https://placehold.co/40x40/3498DB/FFFFFF.png?text=T',
    companyLogoHint: 'tech company logo',
    postedDate: '2 Days Ago',
    jobType: 'Full-time',
    location: 'New York, NY',
    applyUrl: '/jobs/frontend-developer',
  },
  {
    id: '5',
    title: 'Backend Engineer (Python)',
    description: 'Develop and maintain server-side logic, databases, and APIs for our growing platform. Python/Django experience preferred.',
    companyName: 'Data Insights Co.',
    companyLogoUrl: 'https://placehold.co/40x40/2ECC71/FFFFFF.png?text=D',
    companyLogoHint: 'data analytics logo',
    postedDate: '3 Days Ago',
    jobType: 'Contract',
    location: 'Remote (US Only)',
    applyUrl: '/jobs/backend-engineer',
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    description: 'Drive our marketing campaigns, manage social media presence, and analyze performance to optimize strategies.',
    companyName: 'Creative Minds Agency',
    companyLogoUrl: 'https://placehold.co/40x40/E74C3C/FFFFFF.png?text=C',
    companyLogoHint: 'creative agency logo',
    postedDate: '5 Days Ago',
    jobType: 'Part-time',
    location: 'Remote',
    applyUrl: '/jobs/marketing-specialist',
  },
];

export default function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustedByLogos />
      
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Job Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_JOBS.slice(0, 3).map((job, index) => ( // Display first 3 jobs
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
          {MOCK_JOBS.length > 3 && (
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
