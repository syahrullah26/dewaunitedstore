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

  const { data, pending, error, refresh } = useFetch<ApiResponse<Activation[]>>(
    () => `${config.public.apiBase}/activations`,
    {
      query: category ? { category } : undefined,
      transform: (res) => {
        return {
          status: res?.status ?? true,
          data: Array.isArray(res?.data) ? res.data : [],
        };
      },
    },
  );

  const activations = computed<Activation[]>(() => {
    return data.value?.data ?? [];
  });

  return {
    activations,
    pending,
    error,
    refresh,
  };
};
