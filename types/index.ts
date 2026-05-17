export type PropertyCategory = "apartment" | "house" | "villa" | "studio";

export type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  type: PropertyCategory;
  images: string[];
  is_sold?: boolean;
};
