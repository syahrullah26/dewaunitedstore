<script setup lang="ts">
import HeroSection from "~/components/index/hero/HeroSection.vue";
import ProductGrid from "~/components/index/products/ProductGrid.vue";
import JoinNow from "~/components/index/join/JoinNow.vue";
import Footer from "~/components/navbar/Footer.vue";
import LookbookSection from "~/components/index/lookbooks/LookbookSection.vue";
import TypewritterEffect from "~/components/index/TypewritterEffect.vue";
</script>

<template>
  <div class="bg-[var(--dark-main)] text-white ">
    <HeroSection />
    <LookbookSection :limit="3" />
    <ProductGrid />
    <TypewritterEffect />
    <Footer />
  </div>
</template>