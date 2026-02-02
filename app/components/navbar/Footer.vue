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
    <div class="flex items-center justify-center gap-4">
      <div class="flex-1 h-px bg-[#7b5902]"></div>
      <img
        src="/du-universal.png"
        alt="Dewa United"
        class="h-10 object-contain"
      />
      <div class="flex-1 h-px bg-[#7b5902]"></div>
    </div>
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
          <i class="fas fa-headset text-red-700 text-xl"></i>
          Contact Us
        </h3>
        <div class="space-y-4">
          <a
            href="mailto:store@dewaunited.com"
            class="flex items-center gap-4 rounded-xl px-4 py-3 transition-all hover:bg-white/10 hover:translate-x-1 hover:text-[var(--gold-main)] transition"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700/20"
            >
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z"
                  fill="white"
                />
                <path
                  d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z"
                  fill="#FBBC05"
                />
                <path
                  d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z"
                  fill="#34A853"
                />
                <path
                  d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z"
                  fill="#C5221F"
                />
                <path
                  d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z"
                  fill="#C5221F"
                />
                <path
                  d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z"
                  fill="#C5221F"
                />
                <path
                  d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z"
                  fill="#4285F4"
                />
              </svg>
            </div>

            <div>
              <p
                class="text-sm font-medium hover:text-[var(--gold-main)] transition"
              >
                Email
              </p>
              <p class="text-xs hover:text-[var(--gold-main)] transition">
                store@dewaunited.com
              </p>
            </div>
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            class="flex items-center gap-4 rounded-xl px-4 py-3 transition-all hover:bg-white/10 hover:translate-x-1 text-white hover:text-[var(--gold-main)] transition"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                class="w-6 h-6"
              >
                <path
                  fill="#25D366"
                  d="M16 2.67c-7.37 0-13.33 5.97-13.33 13.33 0 2.35.61 4.65 1.77 6.69L2 30l7.5-2.39c1.97 1.07 4.19 1.63 6.5 1.63 7.37 0 13.33-5.97 13.33-13.33C29.33 8.64 23.37 2.67 16 2.67z"
                />
                <path
                  fill="#fff"
                  d="M22.4 18.8c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.07 2.92 1.22 3.12c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.48 1.7.62.71.22 1.35.19 1.85.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"
                />
              </svg>
            </div>

            <div class="">
              <p
                class="text-sm font-medium hover:text-[var(--gold-main)] transition"
              >
                WhatsApp
              </p>
              <p class="text-xs hover:text-[var(--gold-main)] transition">
                +62 812-3456-7890
              </p>
            </div>
          </a>
        </div>
      </div>

      <div>
        <NuxtLink
          to="/store/locations"
          class="block mb-6 cursor-pointer hover:text-white hover:underline hover:font-bold transition"
        >
          <h3
            class="text-lg font-bold mb-4 hover:text-[var(--gold-main)] transition"
          >
            Store Locations
          </h3>
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
            <a
              :href="store.gmap_link"
              target="_blank"
              class="hover:underline hover:font-medium hover:text-[var(--gold-main)] transition"
            >
              <span class="font-medium">{{ store.title }}</span
              ><br />
              <span
                class="text-xs text-gray-400 hover:text-[var(--gold-dark)] transition"
                >{{ store.address }}</span
              >
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
