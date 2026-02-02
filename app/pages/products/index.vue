<script setup lang="ts">
import { ref, vModelCheckbox } from "vue";
import { useProducts } from "~/composables/useProducts";

const showFilterForm = ref(false);
const { products, pending, error } = useProducts();
const getMainImage = (images?: string[]) => {
  return images?.[0] ?? "/placeholder.jpg";
};

const getHoverImage = (images?: string[]) => {
  return images?.[1] ?? "/placeholder.jpg";
};

const activeImage = ref<string | null>(null);

watchEffect(() => {
  activeImage.value = products.value?.[0]?.images?.[0] ?? null;
});

const formatRupiah = (value: number | string) => {
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
};

useSeoMeta({
  title: "All Products",
  description: "Browse all available products",
});
</script>

<template>
  <main>
    <!-- SECTION HEADER -->
    <section
      class="bg-zinc-900 rounded-xl border border-white/10 rounded-xl px-6 py-5 mt-6 mx-4 shadow-lg shadow-black/30 animate-fade-up"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-white text-xl md:text-2xl font-semibold tracking-tight">
          All Products
        </h1>
      </div>

      <hr class="border-white/10 mt-5 mb-5" />

      <div class="flex items-center justify-between">
        <button
          @click="showFilterForm = !showFilterForm"
          class="flex items-center gap-2 text-sm text-zinc-300 hover:text-[var(--gold-main)] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filter
        </button>
      </div>

      <!-- FILTER -->
      <transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showFilterForm"
          class="bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-8 animate-fade-up"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            <div class="space-y-5">
              <p class="text-white font-semibold text-xl tracking-wide">Size</p>

              <div class="grid grid-cols-3 gap-4">
                <label class="flex flex-col items-center cursor-pointer">
                  <input type="checkbox" value="S" class="filter-input" />
                  <span class="filter-size">S</span>
                </label>

                <label class="flex flex-col items-center cursor-pointer">
                  <input type="checkbox" value="M" class="filter-input" />
                  <span class="filter-size">M</span>
                </label>

                <label class="flex flex-col items-center cursor-pointer">
                  <input type="checkbox" value="L" class="filter-input" />
                  <span class="filter-size">L</span>
                </label>

                <label class="flex flex-col items-center cursor-pointer">
                  <input type="checkbox" value="XL" class="filter-input" />
                  <span class="filter-size">XL</span>
                </label>

                <label class="flex flex-col items-center cursor-pointer">
                  <input type="checkbox" value="XXL" class="filter-input" />
                  <span class="filter-size">XXL</span>
                </label>
              </div>
            </div>
            <div class="hidden md:flex items-stretch">
              <div class="w-px bg-white/20 mx-auto"></div>
            </div>
            <div class="space-y-5">
              <p class="text-white font-semibold text-xl tracking-wide">
                Price
              </p>

              <div class="space-y-4">
                <label class="filter-price">
                  <input
                    type="radio"
                    name="price_sort"
                    value="low-to-high"
                    class="filter-radio"
                  />
                  <span>Low → High</span>
                </label>

                <label class="filter-price">
                  <input
                    type="radio"
                    name="price_sort"
                    value="high-to-low"
                    class="filter-radio"
                  />
                  <span>High → Low</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- PRODUCT LIST -->
    <section
      class="bg-zinc-900 border border-white/10 rounded-xl px-6 py-8 mt-6 mx-4 shadow-lg shadow-black/30 animate-fade-up"
    >
      <div v-if="pending" class="text-center py-20 text-zinc-400">
        <h1 class="text-2xl font-bold">Loading Products...</h1>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500">
        <h1 class="text-2xl font-bold">Failed Load Products</h1>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="product,i in products"
          :to="`/products/${product.slug}`"
          data-aos="fade-up"
          :data-aos-delay="i*150"
          class="group block rounded-3xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:border-[var(--gold-main)] hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.35)]"
        >
          <div class="relative aspect-square bg-zinc-900 overflow-hidden">
            <img
              :src="product.images?.[0]"
              class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
            />

            <img
              :src="product.images?.[1] || product.images?.[0]"
              class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            ></div>
          </div>

          <div class="p-5 space-y-2">
            <h3
              class="font-semibold text-xl leading-snug truncate group-hover:text-[var(--gold-main)] transition"
            >
              {{ product.name }}
            </h3>

            <p class="text-md font-medium text-zinc-300">
              {{ formatRupiah(product.price) }}
            </p>
          </div>

          <div class="px-5 pb-5">
            <p
              class="text-[10px] uppercase tracking-widest text-neutral-500 mb-2"
            >
              Available Sizes
            </p>

            <div class="grid grid-cols-4 gap-2">
              <span
                v-for="stock in product.stocks"
                :key="stock.id"
                class="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium transition hover:border-[var(--gold-main)]"
                :class="stock.stock === 0 && 'opacity-40 line-through'"
              >
                {{ stock.size }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
