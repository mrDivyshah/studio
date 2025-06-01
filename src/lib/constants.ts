import type { Product, Partner } from '@/types';

export const BUSINESS_NAME = "Electro Hub";
export const BUSINESS_SLOGAN = "Your Source for Quality Electrical Supplies";
export const OWNER_WHATSAPP_NUMBER = "1234567890"; // Replace with actual number, e.g., country code + number
export const OWNER_EMAIL = "owner@electrohub.com"; // Replace with actual email

export const OWNER_NAME = "Jane Doe";
export const OWNER_BIO = "With over 20 years of experience in the electrical wholesale industry, Jane is passionate about providing top-quality products and exceptional service to her clients. She founded Electro Hub with the vision of creating a reliable and customer-focused source for all electrical needs.";

export const BUSINESS_HISTORY = "Founded in 2010, Electro Hub started as a small local supplier and has grown into a trusted name in the electrical wholesale market. Our commitment to quality and customer satisfaction has been the cornerstone of our success.";
export const BUSINESS_MISSION = "To be the leading provider of electrical supplies by offering a wide range of high-quality products, competitive pricing, and unparalleled customer service. We aim to power progress by ensuring our clients have access to the best electrical solutions.";
export const BUSINESS_VALUES = "Integrity, Reliability, Customer Focus, Innovation, Quality.";

export const TESTIMONIALS = [
  {
    quote: "Electro Hub always delivers on time and their product quality is exceptional. Highly recommended!",
    name: "John B., Contractor",
    company: "BuildWell Construction"
  },
  {
    quote: "The team at Electro Hub is knowledgeable and always helpful. They are my go-to for all electrical supplies.",
    name: "Sarah L., Electrician",
    company: "SparkBright Electricals"
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Heavy Duty Circuit Breaker",
    description: "Reliable 100A circuit breaker for industrial applications.",
    price: 75.99,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "circuit breaker",
    stockStatus: "in-stock"
  },
  {
    id: "2",
    name: "LED Panel Light (60x60)",
    description: "Energy-efficient LED panel light, cool white, 40W.",
    price: 32.50,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "LED panel",
    stockStatus: "in-stock"
  },
  {
    id: "3",
    name: "Armored Power Cable (3-core)",
    description: "Durable 3-core armored cable, 10mm, per meter.",
    price: 8.75,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "power cable",
    stockStatus: "out-of-stock"
  },
  {
    id: "4",
    name: "Industrial Socket Outlet",
    description: "32A, 5-pin industrial socket outlet, IP67 rated.",
    price: 15.20,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "industrial socket",
    stockStatus: "in-stock"
  },
  {
    id: "5",
    name: "Digital Multimeter",
    description: "Professional grade digital multimeter with True RMS.",
    price: 120.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "multimeter tool",
    stockStatus: "in-stock"
  },
  {
    id: "6",
    name: "Cable Conduit (25mm)",
    description: "Flexible PVC cable conduit, 25mm diameter, 50m roll.",
    price: 45.00,
    imageUrl: "https://placehold.co/400x300.png",
    imageHint: "cable conduit",
    stockStatus: "low-stock"
  },
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: "1",
    name: "SparkSafe Cables",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "cable logo",
    description: "Leading manufacturers of high-quality, fire-resistant cables."
  },
  {
    id: "2",
    name: "LumiBright LEDs",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "lighting logo",
    description: "Innovators in energy-efficient LED lighting solutions."
  },
  {
    id: "3",
    name: "VoltGuard Systems",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "protection logo",
    description: "Specialists in advanced circuit protection and safety systems."
  },
  {
    id: "4",
    name: "ConnectX",
    logoUrl: "https://placehold.co/200x100.png",
    logoHint: "connector logo",
    description: "Providers of reliable electrical connectors and terminals."
  }
];

export const BUSINESS_HOURS = {
  MonSat: "9:00 AM – 7:00 PM",
  Sun: "Closed"
};

export const BUSINESS_ADDRESS_LINE1 = "123 Electric Avenue";
export const BUSINESS_ADDRESS_LINE2 = "Circuit City, EL 54321";
export const BUSINESS_PHONE = "+1 (555) 123-4567";
export const BUSINESS_EMAIL = "sales@electrohub.com";

export const BUSINESS_LOCATION_COORDS = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles

// IMPORTANT: Replace with your actual Google Maps API Key
// Store this in a .env.local file as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for security
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_PLACEHOLDER";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];
