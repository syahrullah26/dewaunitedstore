import type { Activation } from "~/types/activations";

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
}
interface ApiResponse<T> {
  status: string;
  data: T;
}

export const useActivation = (slug: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error } = useFetch<ApiResponse<Activation>>(
    `${config.public.apiBase}/activations/${slug}`,
    {
      key: `activation-${slug}`,
    },
  );

  return {
    activation: computed(() => data.value?.data ?? null),
    pending,
    error,
  };
};

export const useActivations = (category?: Ref<string | null>) => {
  const config = useRuntimeConfig();

  const { data, pending, error, refresh } = useFetch<ApiResponse<Activation[]>>(
    () => {
      const params = category?.value ? `?category=${category.value}` : "";
      return `${config.public.apiBase}/activations${params}`;
    },
    {
      watch: category ? [category] : undefined,
    },
  );

  const activations = computed(() => data.value?.data ?? []);

  return {
    activations,
    pending,
    error,
    refresh,
  };
};
