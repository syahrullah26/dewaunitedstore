<script setup lang="ts">
import { useToastStore } from "~/stores/toast";
const toast = useToastStore();
</script>

<template>
    <transition name="fade">
        <div
            v-if="toast.visible"
            class="fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl shadow-xl
                    backdrop-blur text-sm font-large"
            :class="toast.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text white'"
        >
            {{ toast.message }}
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active{
    transition: all 0.3 ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>