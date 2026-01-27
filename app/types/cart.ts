export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  image: string | null;
  size: string;
  price: number;
  quantity: number;
  stock_available: number;
  subtotal: number;
}

export interface CartSummary {
  total_items: number;
  total_quantity: number;
  total_price: number;
}

export interface CartResponse {
  cart_id: number | null;
  items: CartItem[];
  summary: CartSummary;
}
