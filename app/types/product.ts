export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductBadge {
  icon: string;
  text: string;
}

export interface ProductShipping {
  tier: string;
  price: number;
  days: string;
}

export interface ProductSizeGuide {
  size: string;
  chest: string;
  waist: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string | null;
}

export interface ProductDetailImage {
  url: string;
  caption: string;
}

export interface ProductStock {
  id: number;
  product_id: number;
  size: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;

  /** renamed from tagline */
  category: string;

  price: string;
  original_price: string | null;
  video_url: string | null;

  images: string[];
  colors: ProductColor[];
  badges: ProductBadge[];

  stocks: ProductStock[];
  description: string;

  /** renamed from care_instructions */
  size_guide_desc: string;

  shipping_info: ProductShipping[];
  trust_badges: ProductBadge[];
  size_guide: ProductSizeGuide[];

  /** renamed from designer_video_url */
  description_video_url: string | null;

  /** renamed from designer_notes */
  detail_product: string | null;

  detail_images: ProductDetailImage[];
  lifestyle_images: string[];

  related_products: RelatedProduct[];
  external_links?: {
    shopee?: string;
    tokopedia?: string;
    tiktok_shop?: string;
  };

  is_active: boolean;
  created_at: string;
  updated_at: string;
}
