import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Suparshwa marketing";
export const BUSINESS_SLOGAN = "Innovative Marketing Solutions for Growth";
export const OWNER_WHATSAPP_NUMBER = "0987654321"; // Replace with actual number
export const OWNER_EMAIL = "contact@suparshwamarketing.com"; // Replace with actual email

export const OWNER_NAME = "Team Suparshwa";
export const OWNER_BIO = "Suparshwa marketing is driven by a team of experienced marketing professionals dedicated to helping businesses achieve their goals. We believe in creative strategies and measurable results.";

export const BUSINESS_HISTORY = "Founded with a passion for marketing, Suparshwa marketing has been empowering businesses with innovative campaigns and strategies. Our journey is marked by successful collaborations and a commitment to excellence.";
export const BUSINESS_MISSION = "To provide cutting-edge marketing services that drive growth, enhance brand visibility, and create lasting impact for our clients. We strive to be a trusted partner in their success.";
export const BUSINESS_VALUES = "Innovation, Client-Focus, Integrity, Results-Driven, Collaboration.";

export const TESTIMONIALS = [
  {
    quote: "Suparshwa marketing transformed our online presence. Their strategies are top-notch!",
    name: "Alex P., CEO",
    company: "Tech Solutions Inc."
  },
  {
    quote: "The creativity and dedication of the Suparshwa team are impressive. They truly understand our market.",
    name: "Maria G., Marketing Director",
    company: "Global Goods Co."
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Digital Marketing Package",
    description: "Comprehensive digital marketing services including SEO, SMM, and PPC.",
    price: 1500.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "digital marketing",
    stockStatus: "in-stock"
  },
  {
    id: "2",
    name: "Branding & Identity Design",
    description: "Craft a compelling brand identity with our expert design services.",
    price: 800.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "branding design",
    stockStatus: "in-stock"
  },
  {
    id: "3",
    name: "Content Creation Services",
    description: "Engaging content for your website, blog, and social media channels.",
    price: 500.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "content creation",
    stockStatus: "in-stock"
  },
  {
    id: "4",
    name: "Social Media Management",
    description: "Strategic social media management to boost engagement and reach.",
    price: 750.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "social media",
    stockStatus: "in-stock"
  },
  {
    id: "5",
    name: "Marketing Consultation",
    description: "Expert consultation to refine your marketing strategy.",
    price: 250.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "marketing consultation",
    stockStatus: "in-stock"
  },
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: "1",
    name: "Creative Design Studios",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "design studio logo",
    description: "Experts in visual communication and brand aesthetics."
  },
  {
    id: "2",
    name: "Analytics Experts Inc.",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "analytics logo",
    description: "Providing data-driven insights for marketing success."
  },
  {
    id: "3",
    name: "Tech Innovators Co.",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "technology logo",
    description: "Pioneering technology solutions for modern marketing."
  },
  {
    id: "4",
    name: "Global Reach Networks",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "network logo",
    description: "Expanding your market presence worldwide."
  }
];

export const BUSINESS_HOURS = {
  MonSat: "9:00 AM – 6:00 PM",
  Sun: "Closed"
};

export const BUSINESS_ADDRESS_LINE1 = "456 Marketing Drive";
export const BUSINESS_ADDRESS_LINE2 = "Innovation City, MC 67890";
export const BUSINESS_PHONE = "+1 (555) 987-6543";
export const BUSINESS_EMAIL = "info@suparshwamarketing.com";

export const BUSINESS_LOCATION_COORDS = { lat: 37.774929, lng: -122.419416 }; // Example: San Francisco

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Services" }, // Changed Products to Services
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];
