
import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Suparshwa marketing";
export const BUSINESS_SLOGAN = "Creative Strategies. Measurable Results. Real Growth.";

export const OWNER_NAME = "Suparshwa Reddy";
export const OWNER_BIO = "Suparshwa Reddy is a seasoned marketing expert with over a decade of experience in driving growth for businesses of all sizes. He specializes in digital strategy, branding, and data-driven marketing campaigns.";
export const OWNER_IMAGE_URL = "https://placehold.co/300x300.png";
export const OWNER_IMAGE_HINT = "professional man portrait";

export const NAV_LINKS = [
  { href: "/products", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Hero Section (Homepage)
export const SITE_HERO_TITLE = "Elevate Your Brand with Suparshwa Marketing";
export const SITE_HERO_IMAGE_URL = "https://images.unsplash.com/photo-1585128792020-803d29415281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob21lJTIwaGFsbHxlbnwwfHx8fDE3NDg3NjA0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const SITE_HERO_IMAGE_HINT = "home hallway";

// About Page
export const BUSINESS_HISTORY = "Founded in 2010, Suparshwa Marketing began with a vision to help businesses navigate the complex world of digital marketing. Over the years, we've grown into a full-service agency, delivering impactful results for clients across various industries.";
export const BUSINESS_MISSION = "Our mission is to empower businesses with innovative and effective marketing solutions that drive sustainable growth and create lasting brand value.";
export const BUSINESS_VALUES = "Integrity, Innovation, Collaboration, Client-Centricity, Excellence";

// Contact Page & Footer
export const BUSINESS_PHONE = "+1 (555) 123-0000";
export const OWNER_EMAIL = "contact@suparshwamarketing.com";
export const OWNER_WHATSAPP_NUMBER = "15551230000"; // Example: Use international format without + or spaces for wa.me links

export const BUSINESS_ADDRESS_LINE1 = "789 Innovation Avenue";
export const BUSINESS_ADDRESS_LINE2 = "Creativity City, MC 10101";

export const BUSINESS_HOURS = {
  MonSat: "9:30 AM – 6:30 PM",
  Sun: "Closed"
};

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";
export const BUSINESS_LOCATION_COORDS = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles


// Testimonials - for About Us or Homepage sections
export const TESTIMONIALS = [
  {
    quote: "Suparshwa Marketing transformed our online presence! Their strategies are top-notch and delivered real results.",
    name: "Aarav Patel",
    company: "CEO of Innovate Solutions"
  },
  {
    quote: "Working with Suparshwa has been a game-changer. Their team is knowledgeable, responsive, and truly cares about our success.",
    name: "Priya Sharma",
    company: "Marketing Director at TechPro Services"
  },
  {
    quote: "The best marketing agency we've ever partnered with. Highly recommended!",
    name: "Rohan Mehta",
    company: "Founder of Creative Ventures"
  }
];

// Partners Data - for a dedicated partners section or homepage
export const PARTNERS_DATA: Partner[] = [
  {
    id: "1",
    name: "Pixel Perfect Designs",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "modern design agency",
    description: "Crafting stunning visuals that captivate and convert."
  },
  {
    id: "2",
    name: "DataDriven Insights",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "analytics company logo",
    description: "Unlocking the power of data to fuel your marketing strategy."
  },
  {
    id: "3",
    name: "Content Kings Co.",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "writing pen logo",
    description: "Engaging content that tells your brand's story and drives action."
  },
  {
    id: "4",
    name: "SocialSphere Connect",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "social media icons",
    description: "Building vibrant communities and amplifying your social presence."
  }
];

export const TRUSTED_BY_LOGOS: Partner[] = []; // This was for Freebird, can be empty or adapted

// Homepage specific for Suparshwa (can be merged or kept separate based on design)
export const HERO_TITLE = SITE_HERO_TITLE; // Re-using for consistency
export const HERO_IMAGE_URL = SITE_HERO_IMAGE_URL; // Re-using
export const HERO_IMAGE_HINT = SITE_HERO_IMAGE_HINT; // Re-using

export const CATEGORIES_DATA = [
  {
    id: "cat1",
    name: "Digital Marketing",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fHx8MTc0ODc1OTUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "digital marketing team"
  },
  {
    id: "cat2",
    name: "SEO Optimization",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzZW8lMjBvcHRpbWl6YXRpb258ZW58MHx8fHwxNzQ4NzU5NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "seo analytics chart"
  },
  {
    id: "cat3",
    name: "Content Creation",
    imageUrl: "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzb2NrZXR8ZW58MHx8fHwxNzQ4NzU5OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "electrical socket"
  },
  {
    id: "cat4",
    name: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1590327813360-fdbca9ec1cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzd2l0Y2glMjBib2FyZHxlbnwwfHx8fDE3NDg3NTk5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "switch board"
  }
];
