<script setup lang="ts">
import type { Lookbook } from '~/types/lookbook';

const route = useRoute();
const slug = route.params.slug as string;

const { fetchLookbookBySlug } = useLookbooks();

const lookbook = ref<Lookbook | null>(null);
const loading = ref(true);
const error = ref(false);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

onMounted(async () => {
  loading.value = true;
  error.value = false;

  try {
    const result = await fetchLookbookBySlug(slug);

    if (result?.data) {
      lookbook.value = result.data;
    } else {
      error.value = true;
    }
  } catch (e) {
    console.error('Failed to fetch lookbook:', e);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="bg-black min-h-screen px-6 py-16 lg:py-24">
    <div class="container mx-auto">

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#cfa73a]"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 text-lg">
          Failed to load lookbook.
        </p>
      </div>

      <!-- Content -->
      <div v-else-if="lookbook" class="space-y-16">

        <!-- Hero -->
        <div class="relative overflow-hidden rounded-xl">
          <img
            :src="lookbook.hero_image || 'https://via.placeholder.com/1600x800?text=Lookbook'"
            :alt="lookbook.name"
            class="h-[60vh] w-full object-cover"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h1 class="font-dharma text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white">
              {{ lookbook.name }}
            </h1>
            <p class="mt-2 text-sm text-[#cfa73a] uppercase tracking-wide">
              {{ lookbook.products?.length || 0 }} Items
            </p>
          </div>
        </div>

        <!-- Products -->
        <div>
          <h2 class="mb-8 text-2xl md:text-3xl font-bold uppercase text-white">
            Products
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <NuxtLink
              v-for="product in lookbook.products"
              :key="product.id"
              :to="`/products/${product.slug}`"
              class="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all duration-300 hover:scale-105"
            >
              <div class="relative aspect-square">
                <img
                  :src="product.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'"
                  :alt="product.name"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20"></div>

                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p class="text-sm font-medium text-white line-clamp-1">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-[#cfa73a]">
                    Rp {{ formatPrice(product.price) }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>