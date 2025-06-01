
import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Freebird";
export const BUSINESS_SLOGAN = "Join a network of over 40,000 freelancers that are finding work they love and making a great living.";

// Site specific content (Freebird)
export const HERO_TITLE = "Find Freelance Jobs that you'll actually love";
export const HERO_IMAGE_URL = "https://placehold.co/700x350.png";
export const HERO_IMAGE_HINT = "retro illustration community joy";

export const NAV_LINKS = [
  { href: "/freelancers", label: "Find a Freelancer" },
  { href: "/clients", label: "Find a Client" },
  { href: "/blog", label: "Blog" },
];

export const TRUSTED_BY_LOGOS: Partner[] = [
  {
    id: "ebay",
    name: "ebay",
    logoUrl: "https://placehold.co/100x40.png", // Placeholder, actual SVG or transparent PNG preferred
    logoHint: "ebay logo",
    description: "" // Not shown in design
  },
  {
    id: "cnn",
    name: "CNN",
    logoUrl: "https://placehold.co/80x40.png",
    logoHint: "cnn logo",
    description: ""
  },
  {
    id: "google",
    name: "Google",
    logoUrl: "https://placehold.co/100x40.png",
    logoHint: "google logo",
    description: ""
  },
  {
    id: "airbnb",
    name: "airbnb",
    logoUrl: "https://placehold.co/120x40.png",
    logoHint: "airbnb logo",
    description: ""
  }
];


// The following constants are from the previous Suparshwa Marketing theme.
// They can be removed or adapted if Freebird needs similar features.
// For now, they are not directly used by the new Freebird homepage.

export const OWNER_WHATSAPP_NUMBER = "0987654321"; 
export const OWNER_EMAIL = "contact@freebird.com"; // Updated email

export const OWNER_NAME = "The Freebird Team";
export const OWNER_BIO = "Freebird is dedicated to connecting talented freelancers with exciting projects and opportunities. We believe in the power of flexible work and empowering individuals to pursue their passions.";
export const OWNER_IMAGE_URL = "https://placehold.co/300x300.png";
export const OWNER_IMAGE_HINT = "team collaboration modern";


export const BUSINESS_HISTORY = "Founded with the mission to revolutionize the freelance marketplace, Freebird has quickly grown into a vibrant community connecting skilled professionals with businesses worldwide.";
export const BUSINESS_MISSION = "To make freelance work more accessible, rewarding, and fulfilling for everyone involved. We strive to build a platform where talent thrives and businesses find the expertise they need.";
export const BUSINESS_VALUES = "Empowerment, Community, Transparency, Innovation, Quality.";


export const SITE_HERO_IMAGE_URL = "https://images.unsplash.com/photo-1585128792020-803d29415281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob21lJTIwaGFsbHxlbnwwfHx8fDE3NDg3NjA0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const SITE_HERO_IMAGE_HINT = "home hallway"; // Old hint, new hero uses HERO_IMAGE_URL

export const TESTIMONIALS = [
  {
    quote: "Freebird helped me find my dream freelance gig. The platform is amazing!",
    name: "Alex P., Freelance Developer",
    company: ""
  },
  {
    quote: "Finding top talent on Freebird has been a game-changer for our projects.",
    name: "Sarah M., Project Manager",
    company: "Innovate Inc."
  }
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: "1",
    name: "Pixel Perfect Designs",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "modern design agency",
    description: "Crafting stunning visuals that captivate and convert."
  },
];


export const BUSINESS_HOURS = {
  MonSat: "9:00 AM – 6:00 PM", // Example hours
  Sun: "Closed"
};

export const BUSINESS_ADDRESS_LINE1 = "123 Freelance Ave";
export const BUSINESS_ADDRESS_LINE2 = "Innovation City, FC 54321";
export const BUSINESS_PHONE = "+1 (555) 000-1111";


export const BUSINESS_LOCATION_COORDS = { lat: 37.7749, lng: -122.4194 }; // Example coords (San Francisco)

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";
