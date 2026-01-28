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

export const useActivations = (category?: string) => {
  const config = useRuntimeConfig();

  const { data, pending, error, refresh } = useFetch<
    ApiResponse<PaginatedResponse<Activation>>
  >(`${config.public.apiBase}/activations`, {
    key: `activations-${category ?? "all"}`,
    query: category ? { category } : {},
  });

  return {
    activations: computed(() => data.value?.data.data ?? []),
    pagination: computed(() => data.value?.data ?? null),
    pending,
    error,
    refresh,
  };
};
