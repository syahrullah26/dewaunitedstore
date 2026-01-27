<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";
import { useCartActions } from "~/composables/useCarts";

const auth = useAuthStore();
const toast = useToastStore();
const { cart, pending, error, refresh } = useCart();
const { removeItem, clearCart } = useCartActions();

const isLoggedIn = computed(() => auth.isLoggedIn);
const addresses = computed(() => auth.addresses || []);

const safeCart = computed(() => {
  return (
    cart.value ?? {
      items: [],
      summary: {
        total_quantity: 0,
        total_price: 0,
      },
    }
  );
});

const numberFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const items = computed(() => safeCart.value.items);
const summary = computed(() => safeCart.value.summary);
const hasCart = computed(() => items.value.length > 0);

// Remove item functionality
const removing = ref<number | null>(null);

const handleRemoveItem = async (itemId: number, event: Event) => {
  event.preventDefault(); // Prevent navigation
  event.stopPropagation();
  
  if (removing.value) return;

  removing.value = itemId;
  try {
    await removeItem(itemId);
    toast.show("Item removed from cart", "success");
  } catch (error: any) {
    toast.show(error.message || "Failed to remove item", "error");
  } finally {
    removing.value = null;
  }
};

// Clear cart functionality
const clearing = ref(false);

const handleClearCart = async () => {
  if (!confirm("Are you sure you want to clear your cart?")) return;

  clearing.value = true;
  try {
    await clearCart();
    toast.show("Cart cleared successfully", "success");
  } catch (error: any) {
    toast.show(error.message || "Failed to clear cart", "error");
  } finally {
    clearing.value = false;
  }
};

watch(
  () => auth.isLoggedIn,
  (loggedIn) => {
    if (loggedIn) refresh();
  },
  { immediate: true },
);

useSeoMeta({
  title: "Your Cart",
  description: "Review the items in your shopping cart and proceed to checkout",
});
</script>

<template>
  <section>
    <div
      class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 py-8 px-6 md:px-16 bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <!-- LEFT : SUMMARY -->
      <div
        class="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 max-w-md mx-auto"
        data-aos="fade-right"
      >
        <h2 class="text-3xl font-bold text-center tracking-wide">
          Your <span class="text-[var(--gold-main)]">Cart</span>
        </h2>

        <!-- STATES -->
        <div class="space-y-6 text-sm">
          <!-- NOT LOGGED IN -->
          <div v-if="!isLoggedIn" class="text-center text-neutral-400">
            Please login to see your cart
            <NuxtLink
              to="/auth/login"
              class="block mt-2 text-[var(--gold-main)] hover:underline"
            >
              Login Now
            </NuxtLink>
          </div>

          <!-- EMPTY -->
          <div v-else-if="!hasCart" class="text-center text-neutral-400">
            Your cart is empty
          </div>

          <!-- SUMMARY -->
          <div v-else class="space-y-4">
            <div class="flex justify-between">
              <span class="text-neutral-400">Total Items</span>
              <span class="font-semibold text-white">
                {{ summary.total_quantity }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-neutral-400">Subtotal</span>
              <span class="font-semibold text-white">
                {{ numberFormat.format(summary.total_price) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-neutral-400">Shipping</span>
              <span class="font-semibold text-white">Free</span>
            </div>

            <div class="border-t border-white/10 pt-4 flex justify-between">
              <span class="font-semibold text-white">Total</span>
              <span class="font-bold text-lg text-[var(--gold-main)]">
                {{ numberFormat.format(summary.total_price) }}
              </span>
            </div>

            <!-- ADDRESS -->
            <div v-if="addresses.length > 0" class="pt-4 space-y-1">
              <div v-for="address in addresses" :key="address.id">
                <p class="text-xs uppercase tracking-widest text-neutral-500">
                  Shipping Address
                </p>
                <p class="text-sm text-neutral-300">
                  {{ address.address_detail }}, {{ address.village.name }},
                  {{ address.district.name }}, {{ address.regency.name }},
                  {{ address.province.name }}, (Kode Pos : {{ address.postal_code }})
                </p>
              </div>
            </div>
            <div v-else class="pt-4 space-y-1">
              <p class="text-xs uppercase tracking-widest text-neutral-500">
                Shipping Address
              </p>
              <p class="text-sm text-neutral-300">
                Alamat belum terdaftar,
                <NuxtLink
                  to="/profile/address"
                  class="text-[var(--gold-main)] hover:underline hover:scale-105"
                >
                  Tambah Alamat
                </NuxtLink>
              </p>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="pt-4 space-y-2">
              <button
                :disabled="clearing"
                @click="handleClearCart"
                class="w-full py-2 px-4 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {{ clearing ? "Clearing..." : "Clear Cart" }}
              </button>

              <button
                :disabled="!addresses.length"
                class="w-full py-3 px-4 rounded-lg bg-[var(--gold-main)] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <p v-if="!addresses.length" class="text-xs text-center text-red-400">
                ⚠️ Please add shipping address first
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- DIVIDER -->
      <div class="hidden md:flex items-stretch">
        <div class="w-px bg-white/10"></div>
      </div>

      <!-- RIGHT : ITEMS -->
      <div class="flex flex-col" data-aos="fade-left">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-bold text-xl">Products</h2>
          <span v-if="hasCart" class="text-sm text-neutral-400">
            {{ summary.total_quantity }} item{{ summary.total_quantity > 1 ? 's' : '' }}
          </span>
        </div>

        <div v-if="pending" class="text-center text-white">Loading...</div>

        <!-- NOT LOGIN -->
        <div v-else-if="!isLoggedIn" class="text-sm text-neutral-400">
          Please login to see products in your cart.
        </div>

        <!-- EMPTY -->
        <div v-else-if="!hasCart" class="text-center space-y-4">
          <p class="text-neutral-400">
            Whoops! It looks like your cart is empty.
          </p>

          <NuxtLink
            to="/products"
            class="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            Shop Now
          </NuxtLink>
        </div>

        <!-- ITEMS -->
        <div v-else class="space-y-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 relative group hover:bg-white/10 transition"
          >
            <!-- Remove Button (Shows on hover) -->
            <button
              :disabled="removing === item.id"
              @click="(e) => handleRemoveItem(item.id, e)"
              class="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition disabled:opacity-50 disabled:cursor-not-allowed z-10"
              title="Remove item"
            >
              <svg
                v-if="removing === item.id"
                class="animate-spin w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <NuxtLink
              :to="`/products/${item.slug}`"
              class="flex gap-4 flex-1"
            >
              <img
                :src="item.image || '/images/avatar.png'"
                class="w-20 h-20 rounded-lg object-cover"
                :alt="item.name"
              />

              <div class="flex-1 pr-8">
                <h3 class="font-semibold text-white truncate">
                  {{ item.name }}
                </h3>

                <p class="text-xs text-neutral-400 mt-1">
                  Size: {{ item.size }}
                </p>

                <div class="mt-2 flex justify-between text-sm">
                  <span class="text-neutral-400">
                    {{ item.quantity }} x {{ numberFormat.format(item.price) }}
                  </span>
                  <span class="font-semibold text-white">
                    {{ numberFormat.format(item.subtotal) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
