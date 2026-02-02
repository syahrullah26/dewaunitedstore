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
            data-aos="fade-up"
            class="group rounded-2xl overflow-hidden bg-zinc-900 border border-white/30 hover:border-[var(--gold-main)] transition cursor-pointer"
          >
            <NuxtLink to="/game/flappy" class="block">
              <div class="relative h-56 overflow-hidden">
                <img
                  src="/minigames/flappy/images/flappy-dewa.png"
                  class="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h2
                  class="text-xl font-semibold mb-2 group-hover:text-[var(--gold-main)]"
                >
                  Flappy Dewa
                </h2>

                <p class="text-sm text-gray-400 mb-4 line-clamp-3">
                  Dapatkan point anda dengan bermain minigames seru dari Dewa -
                  <span class="font-semibold text-[var(--gold-dark)]"
                    >mainkan di desktop <b>version</b> untuk mendapatkan
                    pengalaman terbaik!</span
                  >
                </p>
              </div>
            </NuxtLink>
          </div>
          <div
            data-aos="fade-up"
            class="group rounded-2xl overflow-hidden bg-zinc-900 border border-white/30 hover:border-[var(--gold-main)] transition cursor-pointer"
          >
            <NuxtLink to="/game/penalty" class="block">
              <div class="relative h-56 overflow-hidden">
                <img
                  src="/minigames/penalty/penalty.png"
                  class="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h2
                  class="text-xl font-semibold mb-2 group-hover:text-[var(--gold-main)]"
                >
                  Dewa Penalty
                </h2>

                <p class="text-sm text-gray-400 mb-4 line-clamp-3">
                  Dapatkan point anda dengan bermain minigames seru dari Dewa -
                  <span class="font-semibold text-[var(--gold-dark)]"
                    >mainkan di desktop <b>version</b> untuk mendapatkan
                    pengalaman terbaik!</span
                  >
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
