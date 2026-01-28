import type { Activation } from "~/types/activations";

interface Pagination<T> {
  current_page: number;
  data: T[];
  total: number;
  per_page: number;
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

export const useActivations = (category?: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error, refresh } = useFetch<
    ApiResponse<Pagination<Activation>>
  >(() => `${config.public.apiBase}/activations`, {
    query: category ? { category } : undefined,
  });
  const activations = computed<Activation[]>(() => {
    return data.value?.data.data ?? [];
  });

  return {
    activations,
    pending,
    error,
    refresh,
  };
};
