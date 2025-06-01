export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  stockStatus: "in-stock" | "out-of-stock" | "low-stock";
  category?: string; // Added category field
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  logoHint: string;
  description: string;
}
