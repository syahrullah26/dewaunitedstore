<script setup lang="ts">
import { ref } from "vue";

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
</script>

<template>
  <main class="bg-zinc-900 text-white min-h-screen">
    <!-- HEADER -->
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Our Store Locations
      </h1>
      <p
        class="text-gray-400 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Temukan lokasi store Dewa United.
      </p>
    </section>

    <section
      class="max-w-7xl mx-auto px-6 pb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <article
        v-for="store in stores"
        :key="store.id"
        class="bg-zinc-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
        data-aos="fade-up"
        :data-aos-delay="200 + store.id * 100"
      >
        <NuxtLink :to="store.gmap_link" target="_blank" class="block">
          <div class="relative h-56 overflow-hidden">
            <img
              :src="store.cover_image"
              alt="Store Image"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6 space-y-2">
            <h2
              class="text-xl font-semibold group-hover:text-[var(--gold-main)] transition"
            >
              {{ store.title }}
            </h2>
            <p class="text-gray-400 text-sm">{{ store.address }}</p>
          </div>

          <div class="w-full h-56">
            <iframe
              :src="store.gmap_url"
              class="w-full h-full border-0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>
