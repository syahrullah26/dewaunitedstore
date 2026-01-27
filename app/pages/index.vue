<script setup lang="ts">
import HeroSection from "~/components/index/hero/HeroSection.vue";
import SocialBanner from "~/components/index/social/SocialBanner.vue";
import ProductGrid from "~/components/index/products/ProductGrid.vue";
import JoinNow from "~/components/index/join/JoinNow.vue";
import LookbookSection from "~/components/index/lookbooks/LookbookSection.vue";

</script>

<template>
  <div class="bg-[var(--dark-main)] text-white">
    <HeroSection />
    <div class="animate-bounce py-10 text-center" data-aos="fade-up">
      <a
        href="/lookbooks"
        class="mb-4 font-dharma text-5xl font-bold uppercase tracking-wider text-white md:text-6xl lg:text-7xl"
      >
        Explore Our<span class="text-[var(--gold-main)]"> Lookbooks</span>
      </a>
      <div
        class="mx-auto h-1 w-24 bg-gradient-to-r from-[#aa8320] to-[#7b5902]"
      ></div>
    </div>
    <section class="bg-black pt-10 px-6">
      <SocialBanner
        title="Tiktok"
        link="https://www.tiktok.com/@dewaunited.store"
        image="/banner/tiktok-banner-1.png"
        aos="fade-left"
      />

      <SocialBanner
        title="Shopee"
        link="https://shopee.co.id/dewaunitedstore"
        image="/banner/shopee-banner-1.png"
        aos="fade-right"
      />

      <SocialBanner
        title="Instagram"
        link="https://www.instagram.com/dewaunited.store/"
        image="/banner/ig-banner-1.png"
        aos="fade-left"
      />

      <SocialBanner
        title="Tokopedia"
        link="https://www.tokopedia.com/dewaunitedstore"
        image="/banner/tokped-banner-1.png"
        aos="fade-right"
      />
    </section>

    <ProductGrid />
    <JoinNow />
  </div>
</template>
