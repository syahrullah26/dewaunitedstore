<script setup lang="ts">
defineProps<{
  product: any;
  delay: number;
}>();

const formatRupiah = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    data-aos="fade-up"
    :data-aos-delay="delay"
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
      <p class="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
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
</template>
