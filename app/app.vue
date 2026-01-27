<script setup lang="ts">
import GlobalLoading from "@/components/GlobalLoading.vue";
import BaseToast from "./components/BaseToast.vue";
</script>

<template>
  <GlobalLoading />
  <NuxtLayout>
    <NuxtPage />
    <BaseToast />
  </NuxtLayout>
</template>
