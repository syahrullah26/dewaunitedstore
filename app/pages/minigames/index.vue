<script setup lang="ts"></script>
<template>
  <section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-10">
      <h1 class="text-4xl font-bold">Minigames</h1>
      <div class="bg-zinc-900 rounded border border-white/30 p-6 rounded-lg">
        <p class="text-lg">
          Dapatkan point anda dengan bermain minigames seru dari Dewa United!
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div
            class="bg-zinc-800 rounded-lg pt-4 mt-3 border border-white/30 space-y-3 hover:border-[var(--gold-main)]"
          >
            <div class="relative aspect-square bg-zinc-900 overflow-hidden">
              <img
                src="/du-universal.png"
                class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-110"
              />
            </div>
          </div>
          <div
            class="bg-zinc-800 rounded-lg pt-4 mt-3 border border-white/30 space-y-3 hover:border-[var(--gold-main)]"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
