import type { CartResponse } from "~/types/cart";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";

type AddToCartPayload = {
  product_id: number;
  size: string;
  quantity: number;
};

type UpdateQuantityPayload = {
  quantity: number;
};

export const useCart = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const cartStore = useCartStore();

  const { data, pending, error, refresh } = useFetch<CartResponse>(
    `${config.public.apiBase}/cart`,
    {
      server: false,
      immediate: auth.isLoggedIn,
      watch: [() => auth.token],

      onRequest({ options }) {
        if (auth.token) {
          const headers = new Headers(options.headers);
          headers.set("Authorization", `Bearer ${auth.token}`);
          options.headers = headers;
        }
      },

      onResponse({ response }) {
        if (response._data) {
          cartStore.setCart(response._data);
        }
      },
    },
  );

  const cart = computed(() => cartStore.$state);

  return {
    cart,
    pending,
    error,
    refresh,
  };
};

export const useCartActions = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const cartStore = useCartStore();

  const addToCart = async (payload: AddToCartPayload) => {
    try {
      await $fetch(`${config.public.apiBase}/cart`, {
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      });

      const cart = await $fetch<CartResponse>(
        `${config.public.apiBase}/cart`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      cartStore.setCart(cart);
      return cart;
    } catch (error: any) {
      throw new Error(error?.data?.message || "Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await $fetch(`${config.public.apiBase}/cart/items/${itemId}`, {
        method: "PUT",
        body: { quantity },
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
        },
      });

      const cart = await $fetch<CartResponse>(
        `${config.public.apiBase}/cart`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      cartStore.setCart(cart);
      return cart;
    } catch (error: any) {
      throw new Error(error?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await $fetch(`${config.public.apiBase}/cart/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const cart = await $fetch<CartResponse>(
        `${config.public.apiBase}/cart`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      cartStore.setCart(cart);
      return cart;
    } catch (error: any) {
      throw new Error(error?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await $fetch(`${config.public.apiBase}/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      cartStore.clearCart();
    } catch (error: any) {
      throw new Error(error?.data?.message || "Failed to clear cart");
    }
  };

  return {
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };
};