<script setup lang="ts">
import HeroSection from "~/components/index/hero/HeroSection.vue";
import ProductGrid from "~/components/index/products/ProductGrid.vue";
import LookbookSection from "~/components/index/lookbooks/LookbookSection.vue";
</script>

<template>
  <div class="bg-[var(--dark-main)] text-white ">
    <HeroSection />
    <LookbookSection :limit="3" />
    <ProductGrid />
  </div>
</template>