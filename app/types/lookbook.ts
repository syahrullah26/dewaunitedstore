export interface LookbookProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  images?: string[];
  category?: string;
}

export interface Lookbook {
  id: number;
  name: string;
  slug: string;
  hero_image: string | null;
  products?: LookbookProduct[];
  created_at?: string;
  updated_at?: string;
}

export interface LookbooksResponse {
  data?: Lookbook[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}