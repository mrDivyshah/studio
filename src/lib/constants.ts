import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Suparshwa marketing";
export const BUSINESS_SLOGAN = "Creative Strategies. Measurable Results. Real Growth."; // Updated Slogan
export const OWNER_WHATSAPP_NUMBER = "0987654321"; 
export const OWNER_EMAIL = "contact@suparshwamarketing.com";

export const OWNER_NAME = "The Suparshwa Team"; // Updated
export const OWNER_BIO = "Suparshwa Marketing is a dynamic team of creative thinkers, strategists, and digital experts passionate about helping businesses shine in a crowded marketplace. We blend innovation with data-driven insights to deliver marketing that not only looks great but also performs exceptionally."; // Updated Bio

export const BUSINESS_HISTORY = "Born from a vision to redefine marketing excellence, Suparshwa Marketing has consistently delivered impactful campaigns and fostered significant growth for diverse clients. Our history is built on collaboration, innovation, and a relentless pursuit of exceeding expectations."; // Updated History
export const BUSINESS_MISSION = "To empower businesses with transformative marketing solutions that build strong brands, engage target audiences, and drive sustainable success. We aim to be the spark that ignites our clients' potential."; // Updated Mission
export const BUSINESS_VALUES = "Creativity, Partnership, Transparency, Excellence, Agility."; // Updated Values

export const TESTIMONIALS = [
  {
    quote: "Suparshwa Marketing's innovative approach and dedication skyrocketed our brand visibility. Truly exceptional!",
    name: "Samantha B., Founder", // Updated
    company: "EvolveX Startups" // Updated
  },
  {
    quote: "The team at Suparshwa is not just skilled, they're partners who genuinely care about your success. Highly recommended!",
    name: "David L., Marketing Head", // Updated
    company: "Momentum Solutions" // Updated
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Strategic Branding Package", // Updated
    description: "Full-suite branding: identity design, market positioning, and compelling brand narrative.", // Updated
    price: 1800.00, // Adjusted
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "modern branding abstract", // Updated hint
    stockStatus: "in-stock"
  },
  {
    id: "2",
    name: "Digital Growth Engine", // Updated
    description: "Comprehensive SEO, targeted SMM, and high-conversion PPC campaigns.", // Updated
    price: 2200.00, // Adjusted
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "digital analytics growth", // Updated hint
    stockStatus: "in-stock"
  },
  {
    id: "3",
    name: "Content & Engagement Hub", // Updated
    description: "Crafting engaging content ecosystems: blogs, videos, social media, and email marketing.", // Updated
    price: 1200.00, // Adjusted
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "creative content team", // Updated hint
    stockStatus: "in-stock"
  },
  {
    id: "4",
    name: "Social Media Amplification", // Updated
    description: "Strategic social media management to boost brand voice, engagement, and community growth.", // Updated
    price: 950.00, // Adjusted
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "social media connection", // Updated hint
    stockStatus: "in-stock"
  },
  {
    id: "5",
    name: "Marketing Masterplan Consult", // Updated
    description: "In-depth consultation and strategy development to unlock your marketing potential.", // Updated
    price: 350.00, // Adjusted
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "marketing strategy meeting", // Updated hint
    stockStatus: "in-stock"
  },
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: "1",
    name: "Pixel Perfect Designs", // Updated
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "modern design agency", // Updated hint
    description: "Crafting stunning visuals that captivate and convert." // Updated
  },
  {
    id: "2",
    name: "DataDriven Insights Co.", // Updated
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "analytics chart logo", // Updated hint
    description: "Unlocking the power of data for smarter marketing decisions." // Updated
  },
  {
    id: "3",
    name: "Innovatech Solutions", // Updated
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "tech startup logo", // Updated hint
    description: "Pioneering tech solutions for next-gen marketing." // Updated
  },
  {
    id: "4",
    name: "Connect Global Media", // Updated
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "global network logo", // Updated hint
    description: "Expanding your brand's reach across global platforms." // Updated
  }
];

export const BUSINESS_HOURS = {
  MonSat: "9:30 AM – 6:30 PM", // Slightly adjusted
  Sun: "Closed"
};

export const BUSINESS_ADDRESS_LINE1 = "789 Innovation Avenue"; // Updated
export const BUSINESS_ADDRESS_LINE2 = "Creativity City, MC 10101"; // Updated
export const BUSINESS_PHONE = "+1 (555) 123-0000"; // Updated
export const BUSINESS_EMAIL = "hello@suparshwamarketing.com"; // Updated

export const BUSINESS_LOCATION_COORDS = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Services" }, 
  { href: "/about", label: "About" }, // Shortened
  { href: "/contact", label: "Contact" },
];
