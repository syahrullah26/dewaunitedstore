<script setup lang="ts">
import HeroImages from "./HeroImage.vue";
</script>

<template>
  <section class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="/du-universal.png"
        class="w-full h-full object-cover opacity-20"
        alt="Dewa United Background"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"
      />
    </div>

    <HeroImages />

    <div
      class="relative z-10 min-h-screen flex items-center px-5 sm:px-8 md:px-16"
    >
      <div
        data-aos="fade-up"
        class="w-full max-w-md sm:max-w-lg md:max-w-xl backdrop-blur-md bg-white/10 p-10 rounded-3xl border border-black/20"
      >
        <span
          class="inline-block mb-4 px-4 py-2 sm:px-5 rounded-full border border-[var(--gold-main)]/40 text-[var(--gold-main)] text-[10px] sm:text-xs tracking-widest"
        >
          OFFICIAL MERCHANDISE
        </span>

        <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Official <br />
          <span class="text-[var(--gold-main)]"> Dewa United Store </span>
        </h1>

        <p class="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-100">
          Official Clothing and Merchandise from Dewa United Indonesia.
        </p>

        <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <NuxtLink
            to="/products"
            class="btn-gold w-full sm:w-auto text-center"
          >
            Shop Now
          </NuxtLink>

          <NuxtLink
            to="https://dewaunited.com"
            class="btn-outline w-full sm:w-auto text-center"
          >
            Learn More
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
