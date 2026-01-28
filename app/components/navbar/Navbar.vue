<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useToastStore } from "~/stores/toast";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const { cart } = useCart();
const openMobile = ref(false);
const openUser = ref(false);
const userRef = ref<HTMLElement | null>(null);

const toast = useToastStore();

const safeCart = computed(() => {
  return (
    cart.value ?? {
      items: [],
      summary: {
        total_items: 0,
        total_quantity: 0,
        total_price: 0,
      },
    }
  );
});

const summary = computed(() => safeCart.value.summary);
const items = computed(() => safeCart.value.items);
const cartCount = computed(() => summary.value.total_quantity);

const logout = async () => {
  await auth.logout();
  toast.show("Logout berhasil", "success");

  setTimeout(() => {
    navigateTo("/auth/login");
  }, 300);
};

const avatarUrl = computed(() => {
  if (!auth.user?.avatar) return "/images/avatar.png";
  return `https://backend-dewaunited-production.up.railway.app/storage/${auth.user.avatar}`;
});

onMounted(async () => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

const closeDropdown = (e: MouseEvent) => {
  if (userRef.value && !userRef.value.contains(e.target as Node)) {
    openUser.value = false;
  }
};
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10"
  >
    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <NuxtLink to="/josh" class="flex items-center gap-2 group">
        <img
          src="/du-universal.png"
          class="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-6">
        <NuxtLink
          to="/"
          class="px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5 hover:text-[var(--gold-main)]"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/products"
          class="px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5 hover:text-[var(--gold-main)]"
        >
          Products
        </NuxtLink>
        <NuxtLink
          to="/marketing"
          class="px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5 hover:text-[var(--gold-main)]"
        >
          Marketing
        </NuxtLink>

        <!-- Login Check -->
        <div v-if="auth.isLoggedIn" ref="userRef" class="relative">
          <button
            @click="openUser = !openUser"
            class="flex items-center gap-2 px-3 py-2 rounded-full transition hover:bg-white/5"
          >
            <img
              :src="avatarUrl"
              class="w-9 h-9 rounded-full object-cover border border-white/10"
            />
            <span class="text-sm font-medium text-white truncate max-w-[120px]">
              {{ auth.user?.name }}
            </span>
            <svg
              class="w-4 h-4 text-gray-400 transition-transform"
              :class="openUser && 'rotate-180'"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-1"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="openUser"
              class="absolute right-0 mt-3 w-56 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl"
            >
              <div class="px-4 py-3 border-b border-white/10">
                <p class="text-sm font-semibold text-white truncate">
                  {{ auth.user?.name }}
                </p>
                <p class="text-xs text-gray-400 truncate">
                  {{ auth.user?.email }}
                </p>
              </div>

              <NuxtLink
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Profile
              </NuxtLink>

              <button
                @click="logout"
                class="w-full text-left px-4 py-2 text-sm text-red-400 transition hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          </Transition>
        </div>

        <!-- Login Button -->
        <NuxtLink
          v-else
          to="/auth/login"
          class="px-5 py-2 rounded-lg bg-gold-main text-white text-sm font-semibold transition hover:opacity-90"
        >
          Login
        </NuxtLink>

        <!-- Cart Icon -->
        <NuxtLink
          to="/profile/cart"
          class="relative p-2 rounded-lg hover:bg-white/5 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-white hover:text-[var(--gold-main)] transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75a.75.75 0 00.728-.568l1.5-6a.75.75 0 00-.728-.932H6.105M7.5 14.25L5.106 5.272M7.5 14.25l-.75 3m11.25-3l.75 3m-10.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>

          <!-- Badge -->
          <span
            v-if="auth.isLoggedIn && cartCount > 0"
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-xs flex items-center justify-center rounded-full bg-[var(--gold-main)] text-black font-bold"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>

      <!-- Mobile Toggle -->
      <button
        @click="openMobile = !openMobile"
        class="md:hidden flex flex-col gap-1.5"
      >
        <span
          class="w-6 h-0.5 bg-white transition-transform"
          :class="openMobile && 'rotate-45 translate-y-2'"
        />
        <span
          class="w-6 h-0.5 bg-white transition-opacity"
          :class="openMobile && 'opacity-0'"
        />
        <span
          class="w-6 h-0.5 bg-white transition-transform"
          :class="openMobile && '-rotate-45 -translate-y-2'"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      class="md:hidden overflow-hidden transition-[max-height] duration-300"
      :class="openMobile ? 'max-h-96' : 'max-h-0'"
    >
      <div class="bg-black/90 px-6 py-4 space-y-2">
        <NuxtLink
          to="/"
          class="block px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/products"
          class="block px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5 hover:text-[var(--gold-main)]"
        >
          Products
        </NuxtLink>
        <NuxtLink
          to="/marketing"
          class="px-3 py-2 text-sm font-medium text-white rounded-md transition hover:bg-white/5 hover:text-[var(--gold-main)]"
        >
          Marketing
        </NuxtLink>

        <NuxtLink
          v-if="!auth.isLoggedIn"
          to="/auth/login"
          class="block px-3 py-2 text-sm font-semibold text-gold-main rounded-md transition hover:bg-white/5"
        >
          Login
        </NuxtLink>

        <div v-else class="pt-2 border-t border-white/10 space-y-2">
          <NuxtLink to="/profile" class="flex items-center gap-3 px-3 py-2">
            <img
              :src="avatarUrl"
              class="w-9 h-9 rounded-full object-cover border border-white/10"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-white truncate">
                {{ auth.user?.name }}
              </p>
              <p class="text-xs text-gray-400 truncate">
                {{ auth.user?.email }}
              </p>
            </div>
          </NuxtLink>

          <button
            @click="logout"
            class="w-full text-left px-3 py-2 text-sm font-medium text-red-400 rounded-md transition hover:bg-white/5"
          >
            Logout
          </button>
        </div>

        <!-- Mobile Cart -->
        <NuxtLink
          to="/profile/cart"
          class="flex items-center justify-between px-3 py-2 rounded-lg bg-gold-main/10 border border-gold-main/20"
        >
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-[var(--gold-main)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75a.75.75 0 00.728-.568l1.5-6a.75.75 0 00-.728-.932H6.105M7.5 14.25L5.106 5.272M7.5 14.25l-.75 3m11.25-3l.75 3m-10.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span class="text-sm font-medium text-white">Cart</span>
          </div>

          <span
            v-if="auth.isLoggedIn && cartCount > 0"
            class="min-w-[24px] h-[24px] px-2 text-xs flex items-center justify-center rounded-full bg-[var(--gold-main)] text-black font-bold"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
