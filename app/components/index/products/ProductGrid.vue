<script setup lang="ts">
import { computed } from 'vue';
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue';

const { products } = useProducts();

const latestProducts = computed(() => {
  return products.value.slice(-8);
});
</script>

<template>
  <section class="py-24 bg-black px-6 md:px-16">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
      Our <span class="text-[var(--gold-main)]">Merch</span>
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap 6 md:gap-10 max-w-7xl mx-auto">
      <ProductCard
        v-for="(product, i) in latestProducts"
        :key="product.id"
        :product="product"
        :delay="i * 150"
      />
    </div>

    <div class="flex justify-center gap-4 mt-10">
      <NuxtLink to="/products" target="_blank" external>
        <button
          data-aos="fade-right"
          data-aos-delay="300"
          class="animate-bounce px-10 py-4 rounded-2xl bg-[var(--gold-main)] text-black font-bold hover:bg-[var(--gold-dark)] transition"
        >
          Shop Now
        </button>
      </NuxtLink>

      <NuxtLink to="/lookbooks" target="_blank" external>
        <button
          data-aos="fade-left"
          data-aos-delay="300"
          class="animate bounce px-10 py-4 rounded-2xl bg-[var(--gold-main)] text blank font-bold hover:bg-[var(--gold-dark)] transition"
        >
          See all Collection List
        </button>
      </NuxtLink>
    </div>
  </section>
</template>