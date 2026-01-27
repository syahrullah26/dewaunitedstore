import { defineStore } from "pinia";
import type { CartItem, CartSummary } from "~/types/cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart_id: null as number | null,
    items: [] as CartItem[],
    summary: {
      total_items: 0,
      total_quantity: 0,
      total_price: 0,
    } as CartSummary,
  }),

  getters: {
    cartCount: (state) => state.summary.total_quantity,

    getItem:
      (state) => (product_id: number, size: string) =>
        state.items.find(
          (i) => i.product_id === product_id && i.size === size,
        ),

    isEmpty: (state) => state.items.length === 0,

    formattedTotal: (state) => {
      return `Rp ${state.summary.total_price.toLocaleString("id-ID")}`;
    },
  },

  actions: {
    setCart(cart: {
      cart_id: number | null;
      items: CartItem[];
      summary: CartSummary;
    }) {
      this.cart_id = cart.cart_id;
      this.items = cart.items;
      this.summary = cart.summary;
    },

    clearCart() {
      this.cart_id = null;
      this.items = [];
      this.summary = {
        total_items: 0,
        total_quantity: 0,
        total_price: 0,
      };
    },
  },
});