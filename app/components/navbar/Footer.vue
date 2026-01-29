<script setup lang="ts">
const year = new Date().getFullYear();
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";

const texts = ["Anak Dewa", "Belanja Sekarang", "Dewa United"];

const displayText = ref("");
const currentIndex = ref(0);
const isDeleting = ref(false);
const typingSpeed = ref(150);
let timeout: NodeJS.Timeout | undefined;

const type = () => {
  const currentText = texts[currentIndex.value];

  if (!currentText) return;

  if (!isDeleting.value) {
    // ngetik
    displayText.value = currentText.substring(0, displayText.value.length + 1);
    typingSpeed.value = 100;

    if (displayText.value === currentText) {
      // diem sebelom ngapus
      typingSpeed.value = 1000;
      isDeleting.value = true;
    }
  } else {
    // apus
    displayText.value = currentText.substring(0, displayText.value.length - 1);
    typingSpeed.value = 100;

    if (displayText.value === "") {
      isDeleting.value = false;
      currentIndex.value = (currentIndex.value + 1) % texts.length;
      typingSpeed.value = 500;
    }
  }

  timeout = setTimeout(type, typingSpeed.value);
};

onMounted(() => {
  timeout = setTimeout(type, 1000);
});

onUnmounted(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<template>
  <div class="w-full py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="min-h-30 sm:min-h-35 flex items-center justify-center">
          <h2
            class="text-4xl sm:text-5xl md:text-6xl lg:text-[150px] font-bold"
          >
            <span
              class="bg-gradient-to-r from-[#aa8327ff] via-[#7b5902] to-[#aa8327] bg-clip-text text-transparent"
            >
              {{ displayText }}
            </span>
            <span
              class="inline-block w-1 h-12 sm:h-14 md:h-16 lg:h-[126px] bg-[#aa8327ff] ml-1 animate-pulse"
            ></span>
          </h2>
        </div>
      </div>
    </div>
  </div>
  <footer class="w-full bg-black text-zinc-300 text-base">
    <div class="bg-gradient-to-r from-black via-[#7b5902] to-[#aa8327]">
      <div
        class="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        <div
          v-for="(item, i) in [
            { icon: 'fa-shipping-fast', text: 'Free Shipping' },
            { icon: 'fa-shield-alt', text: 'Official Warranty' },
            { icon: 'fa-certificate', text: '100% Original Product' },
            { icon: 'fa-lock', text: 'Secure Payment' },
          ]"
          :key="i"
          class="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left"
        >
          <i :class="`fas ${item.icon} text-xl text-white`" />
          <span
            class="text-sm sm:text-base font-semibold text-white leading-snug"
          >
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
        <div>
          <h3
            class="mb-6 flex items-center gap-3 text-lg font-semibold text-white"
          >
            <i class="fas fa-building text-red-700" />
            Follow Us
          </h3>
          <div class="flex gap-6 items-center">
            <a href="https://shopee.co.id/dewaunitedstore" target="_blank">
              <Icon
                icon="simple-icons:shopee"
                class="w-7 h-7 text-[#EE4D2D] hover:scale-110 transition"
              />
            </a>
            <a href="https://www.tiktok.com/@dewaunited.store" target="_blank">
              <Icon
                icon="logos:tiktok-icon"
                class="w-7 h-7 hover:scale-110 transition"
              />
            </a>
            <a href="https://www.tokopedia.com/dewaunitedstore" target="_blank">
              <img
                src="/tokped.png"
                alt="Tokopedia"
                class="w-7 h-7 object-contain hover:scale-110 transition"
              />
            </a>
            <a
              href="https://www.instagram.com/dewaunited.store/"
              target="_blank"
            >
              <Icon
                icon="simple-icons:instagram"
                class="w-7 h-7 text-[#E4405F] hover:scale-110 transition"
              />
            </a>
          </div>
        </div>

        <div>
          <h3
            class="mb-6 flex items-center gap-3 text-lg font-semibold text-white"
          >
            <i class="fas fa-headset text-red-700" />
            Support
          </h3>
          <ul class="space-y-4">
            <li>
              <div class="relative inline-block text-left group">
                <button
                  class="flex items-center gap-3 font-medium hover:text-white transition"
                >
                  <i class="fas fa-chevron-right text-xs text-red-700"></i>
                  Contact Us
                  <i
                    class="fas fa-chevron-down text-xs ml-1 transition-transform group-hover:rotate-180"
                  ></i>
                </button>
                <div
                  class="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50"
                >
                  <ul class="flex flex-col py-2">
                    <li>
                      <a
                        href="mailto:your-email@example.com"
                        class="block px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        store@dewaunited.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/#"
                        class="block px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        +62 812-3456-7890 
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="mb-6 flex items-center gap-3 text-lg font-semibold text-white"
          >
            <i class="fas fa-share-alt text-red-700" />
            Store
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                to="#"
                class="flex items-center gap-3 hover:text-white transition"
              >
                <i class="fas fa-chevron-right text-xs text-red-700" />
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/store/locations"
                class="flex items-center gap-3 hover:text-white transition"
              >
                <i class="fas fa-chevron-right text-xs text-red-700" />
                Store Location
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-zinc-800 py-6">
      <p class="text-center text-sm text-zinc-500">
        © {{ year }} Dewa United Store. All rights reserved.
      </p>
    </div>
  </footer>
</template>
