/**
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  dietary: ('Vegan' | 'Gluten-Free' | 'Vegetarian' | 'Nut-Free' | 'Dairy-Free')[];
  flavorProfile: 'Delicate' | 'Bold' | 'Rich' | 'Spicy' | 'Sweet';
  recommendedWineId?: string;
}

export interface Wine {
  id: string;
  name: string;
  vintage: string;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling';
  description: string;
  intensity: 'Light' | 'Medium' | 'Full-Bodied';
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  capacityLimit: number;
  extraCost: number;
  image: string;
  features: string[];
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zoneId: string;
  seatingPreference: 'Indoor' | 'Outdoor' | 'Window View';
  dietaryNotes?: string;
  specialRequests?: string;
  wineSelectionId?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  location: string;
  avatar: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
}
