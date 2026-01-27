<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
import Footer from "~/components/navbar/Footer.vue";
</script>

<template>
  <div class="bg-black min-h-screen font-default">
    <Navbar />
    <main class="w-full">
      <slot />
    </main>
    <Footer />
  </div>
</template>
