<script setup lang="ts">
defineProps<{
  title: string;
  link: string;
  image: string;
  aos: string;
}>();
</script>

<template>
  <h2
    class="text-3xl md:text-4xl font-bold text-center my-5"
    data-aos="fade-up"
    data-aos-duration="700"
  >
    Visit Us on <span class="text-[var(--gold-main)]">{{ title }}</span>
  </h2>

  <NuxtLink
    :to="link"
    target="external"
    class="block w-full"
    :data-aos="aos"
    data-aos-duration="1000"
  >
    <div class="relative w-full aspect-[1500/260] overflow-hidden">
      <img
        :src="image"
        class="rounded-sm w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  </NuxtLink>
</template>