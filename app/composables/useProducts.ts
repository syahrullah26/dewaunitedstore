import type { Product } from "@/types/product";

interface ApiResponse<T> {
  data: T;
}

export const useProduct = async (slug: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error } = await useFetch<ApiResponse<Product>>(
    `${config.public.apiBase}/products/${slug}`
  );

  return {
    product: computed(() => data.value?.data ?? null),
    pending,
    error,
  };
};

export const useProducts = () => {
  const config = useRuntimeConfig();

  const { data, pending, error } = useFetch<ApiResponse<Product[]>>(
    `${config.public.apiBase}/products`
  );

  const products = computed<Product[]>(() => data.value?.data ?? []);

  return {
    products,
    pending,
    error,
  };
};
