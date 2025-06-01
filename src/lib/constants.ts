
import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Suparshwa marketing";
export const BUSINESS_SLOGAN = "Creative Strategies. Measurable Results. Real Growth.";
export const OWNER_WHATSAPP_NUMBER = "0987654321"; 
export const OWNER_EMAIL = "contact@suparshwamarketing.com";

export const OWNER_NAME = "The Suparshwa Team";
export const OWNER_BIO = "Suparshwa Marketing is a dynamic team of creative thinkers, strategists, and digital experts passionate about helping businesses shine in a crowded marketplace. We blend innovation with data-driven insights to deliver marketing that not only looks great but also performs exceptionally.";
export const OWNER_IMAGE_URL = "https://placehold.co/300x300.png";
export const OWNER_IMAGE_HINT = "team photo professional";


export const BUSINESS_HISTORY = "Born from a vision to redefine marketing excellence, Suparshwa Marketing has consistently delivered impactful campaigns and fostered significant growth for diverse clients. Our history is built on collaboration, innovation, and a relentless pursuit of exceeding expectations.";
export const BUSINESS_MISSION = "To empower businesses with transformative marketing solutions that build strong brands, engage target audiences, and drive sustainable success. We aim to be the spark that ignites our clients' potential.";
export const BUSINESS_VALUES = "Creativity, Partnership, Transparency, Excellence, Agility.";

export const SITE_HERO_IMAGE_URL = "https://placehold.co/600x600.png";
export const SITE_HERO_IMAGE_HINT = "abstract marketing vibrant";

export const TESTIMONIALS = [
  {
    quote: "Suparshwa Marketing's innovative approach and dedication skyrocketed our brand visibility. Truly exceptional!",
    name: "Samantha B., Founder",
    company: "EvolveX Startups"
  },
  {
    quote: "The team at Suparshwa is not just skilled, they're partners who genuinely care about your success. Highly recommended!",
    name: "David L., Marketing Head",
    company: "Momentum Solutions"
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Strategic Branding Package",
    description: "Full-suite branding: identity design, market positioning, and compelling brand narrative.",
    price: 1800.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "modern branding abstract",
    stockStatus: "in-stock",
    category: "Branding"
  },
  {
    id: "2",
    name: "Digital Growth Engine",
    description: "Comprehensive SEO, targeted SMM, and high-conversion PPC campaigns.",
    price: 2200.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "digital analytics growth",
    stockStatus: "in-stock",
    category: "Digital Marketing"
  },
  {
    id: "3",
    name: "Content & Engagement Hub",
    description: "Crafting engaging content ecosystems: blogs, videos, social media, and email marketing.",
    price: 1200.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "creative content team",
    stockStatus: "in-stock",
    category: "Content Creation"
  },
  {
    id: "4",
    name: "Social Media Amplification",
    description: "Strategic social media management to boost brand voice, engagement, and community growth.",
    price: 950.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "social media connection",
    stockStatus: "in-stock",
    category: "Social Media"
  },
  {
    id: "5",
    name: "Marketing Masterplan Consult",
    description: "In-depth consultation and strategy development to unlock your marketing potential.",
    price: 350.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "marketing strategy meeting",
    stockStatus: "in-stock",
    category: "Strategy"
  },
];

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
    name: "DataDriven Insights Co.",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "analytics chart logo",
    description: "Unlocking the power of data for smarter marketing decisions."
  },
  {
    id: "3",
    name: "Innovatech Solutions",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "tech startup logo",
    description: "Pioneering tech solutions for next-gen marketing."
  },
  {
    id: "4",
    name: "Connect Global Media",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "global network logo",
    description: "Expanding your brand's reach across global platforms."
  }
];

export const BUSINESS_HOURS = {
  MonSat: "9:30 AM – 6:30 PM",
  Sun: "Closed"
};

export const BUSINESS_ADDRESS_LINE1 = "789 Innovation Avenue";
export const BUSINESS_ADDRESS_LINE2 = "Creativity City, MC 10101";
export const BUSINESS_PHONE = "+1 (555) 123-0000";


export const BUSINESS_LOCATION_COORDS = { lat: 34.052235, lng: -118.243683 };

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Services" }, 
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
