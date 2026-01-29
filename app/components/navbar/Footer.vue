<script setup lang="ts">
const year = new Date().getFullYear();
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";

const texts = ["Anak Dewa", "Belanja Sekarang", "Dewa United"];
const stores = ref([
  {
    id: 1,
    title: "Carstensz Mall",
    address:
      "Lantai 1, Jl. Jenderal Sudirman No.1, Cihuni, Kec. Pagedangan, Tangerang",
    cover_image: "https://source.unsplash.com/600x400/?store,building",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.953057484149!2d106.6306189!3d-6.269904100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f90545bcc7b3%3A0x21141758f9f3a838!2sCarstensz%20Mall!5e0!3m2!1sid!2sid!4v1769662088301!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/Carstensz+Mall/@-6.2699041,106.6306189,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f90545bcc7b3:0x21141758f9f3a838!8m2!3d-6.2699041!4d106.6306189",
  },
  {
    id: 2,
    title: "Dewa United Arena",
    address:
      " Jl. Raya Pagedangan No.50, RT.001/RW.002, Cicalengka, Kec. Pagedangan, Tangerang",
    cover_image: "https://source.unsplash.com/600x400/?store,city",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.733308936958!2d106.61749119999999!3d-6.298733200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd003df0bdb1%3A0x17112860397ffb35!2sDewa%20United%20Arena!5e0!3m2!1sid!2sid!4v1769662297696!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/Dewa+United+Arena/@-6.2987332,106.6174912,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69fd003df0bdb1:0x17112860397ffb35!8m2!3d-6.2987332!4d106.6174912",
  },

  {
    id: 3,
    title: "Soroso, Hotel Episode",
    address:
      "Jl. Gading Serpong Boulevard No.7, Pakulonan Barat, Kecamatan Kelapa Dua, Kabupaten Tangerang",
    cover_image: "https://source.unsplash.com/600x400/?store,shop",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0561079705785!2d106.6203414!3d-6.256339199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd94da2847cd%3A0xa1421103e3d49919!2sEpisode%20Hotel%20Gading%20Serpong!5e0!3m2!1sid!2sid!4v1769662411988!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/Episode+Hotel+Gading+Serpong/@-6.2563392,106.6203414,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69fd94da2847cd:0xa1421103e3d49919!8m2!3d-6.2563392!4d106.6203414",
  },
  {
    id: 4,
    title: "JSI Resort",
    address:
      "Jl. Megamendung - Ciawi No.5, Sukagalih, Kec. Megamendung, Kabupaten Bogor",
    cover_image: "https://source.unsplash.com/600x400/?store,shop",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.664321231252!2d106.9039882!3d-6.6884362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9e7032101b1%3A0xb68a928cd6f429a1!2sJSI%20Resort%20Megamendung!5e0!3m2!1sid!2sid!4v1769662559457!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/JSI+Resort+Megamendung/@-6.6884362,106.9039882,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69c9e7032101b1:0xb68a928cd6f429a1!8m2!3d-6.6884362!4d106.9039882",
  },
  {
    id: 5,
    title: "Garuda Store",
    address:
      "Bung Karno Sports Cplx, Ring road Stadion Utama, Gate G No.10 Zona 9,RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat",
    cover_image: "https://source.unsplash.com/600x400/?store,shop",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.351170812232!2d106.80261399999999!3d-6.2173359999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7399378d7c1%3A0x6163d4e91921fa7e!2sGaruda%20Official%20Store!5e0!3m2!1sid!2sid!4v1769662645091!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/Garuda+Official+Store/@-6.217336,106.802614,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f7399378d7c1:0x6163d4e91921fa7e!8m2!3d-6.217336!4d106.802614",
  },
  {
    id: 6,
    title: "Dewa United Store Ruko Dalton",
    address:
      "Jl. Dalton Timur No.51, Curug Sangereng, Kecamatan Kelapa Dua, Kabupaten  Tangerang",
    cover_image: "https://source.unsplash.com/600x400/?store,shop",
    gmap_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0220538709063!2d106.6162987!3d-6.260825100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd462bd2663d%3A0x2ba9fa7b91037de3!2sDewa%20United%20Store!5e0!3m2!1sid!2sid!4v1769662680240!5m2!1sid!2sid",
    gmap_link:
      "https://www.google.com/maps/place/Dewa+United+Store/@-6.2608251,106.6162987,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69fd462bd2663d:0x2ba9fa7b91037de3!8m2!3d-6.2608251!4d106.6162987",
  },
]);

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
  <footer class="bg-zinc-900 text-white">
    <!-- Top Highlights -->
    <!-- <div class="bg-gradient-to-r from-black via-[#7b5902] to-[#aa8327] py-6">
      <div
        class="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
      >
        <div
          v-for="(item, i) in [
            { icon: 'fa-shipping-fast', text: 'Free Shipping' },
            { icon: 'fa-shield-alt', text: 'Official Warranty' },
            { icon: 'fa-certificate', text: '100% Original Product' },
            { icon: 'fa-lock', text: 'Secure Payment' },
          ]"
          :key="i"
          class="flex flex-col sm:flex-row items-center gap-3 justify-center"
        >
          <i :class="`fas ${item.icon} text-xl text-white`"></i>
          <span
            class="text-sm sm:text-base font-semibold text-white leading-snug"
          >
            {{ item.text }}
          </span>
        </div>
      </div>
    </div> -->
    <hr class="border border-[#7b5902]" />
    <div
      class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10"
    >
      <div>
        <h3
          class="mb-4 flex items-center gap-3 text-lg font-semibold text-white"
        >
          <i class="fas fa-building text-red-700"></i>
          Follow Us On Social Media
        </h3>
        <div class="flex gap-4 items-center">
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
          <a href="https://www.instagram.com/dewaunited.store/" target="_blank">
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
        <NuxtLink to="/store/locations" class="block mb-6 cursor-pointer hover:text-white hover:underline hover:font-bold transition">
          <h3 class="text-lg font-bold mb-4">Store Locations</h3>
        </NuxtLink>
        <ul
          class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 text-gray-300 text-sm"
        >
          <li
            v-for="store in stores"
            :key="store.id"
            class="flex items-start gap-2 hover:text-white transition"
          >
            <i class="fas fa-map-marker-alt mt-1 text-red-600"></i>
            <a :href="store.gmap_link" target="_blank" class="hover:underline">
              <span class="font-medium">{{ store.title }}</span
              ><br />
              <span class="text-xs text-gray-400">{{ store.address }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-zinc-800 py-6">
      <p class="text-center text-sm text-zinc-500">
        © {{ year }} Dewa United Store. All rights reserved.
      </p>
    </div>
  </footer>
</template>
