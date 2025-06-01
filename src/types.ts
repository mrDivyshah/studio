
import type { Timestamp } from 'firebase/firestore';

export interface Product {
  id?: string; // Firestore document ID will be string, optional when creating
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  stockStatus: "in-stock" | "out-of-stock" | "low-stock";
  category?: string;
  createdAt?: Timestamp; // For sorting
  updatedAt?: Timestamp; // For tracking updates
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  logoHint: string;
  description: string;
}
