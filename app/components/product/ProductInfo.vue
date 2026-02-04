<script setup lang="ts">
import type { Product } from "~/types/product";
import { useCartStore } from "~/stores/cart";
import { useToastStore } from "~/stores/toast";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  product: Product;
  selectedColor: number;
  currentColorName: string;
}>();

const toast = useToastStore();
const qtyLoading = ref(false);
const selectedSize = ref<string | null>(null);
const { addToCart, updateQuantity, removeItem } = useCartActions();

const emit = defineEmits<{
  (e: "open-fit-guide"): void;
  (e: "update:selectedColor", index: number): void;
}>();

const selectSize = (size: string) => {
  selectedSize.value = size;
};

const selectedStock = computed(() => {
  if (!selectedSize.value) return null;
  return (
    props.product.stocks?.find((s) => s.size === selectedSize.value) ?? null
  );
});

const handleAddToCart = async () => {
  if (!selectedSize.value) {
    toast.show("Please select a size", "error");
    return;
  }

  try {
    await addToCart({
      product_id: props.product.id,
      size: selectedSize.value,
      quantity: 1,
    });

    toast.show("Added to cart");
  } catch (error: any) {
    toast.show(error.message || "Failed to add to cart", "error");
  }
};

const formatRupiah = (value: number | string) => {
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
};

const selectColor = (index: number) => {
  emit("update:selectedColor", index);
};

const cartStore = useCartStore();

const cartItem = computed(() => {
  if (!selectedSize.value) return null;
  return cartStore.getItem(props.product.id, selectedSize.value);
});

const increaseQty = async () => {
  if (!cartItem.value || qtyLoading.value) return;

  if (cartItem.value.quantity >= cartItem.value.stock_available) {
    toast.show("Stock limit reached", "error");
    return;
  }

  qtyLoading.value = true;

  try {
    await updateQuantity(cartItem.value.id, cartItem.value.quantity + 1);
    toast.show("Quantity updated");
  } catch (error: any) {
    toast.show(error.message || "Failed to update quantity", "error");
  } finally {
    qtyLoading.value = false;
  }
};

const decreaseQty = async () => {
  if (!cartItem.value || qtyLoading.value) return;

  qtyLoading.value = true;

  try {
    if (cartItem.value.quantity === 1) {
      await removeItem(cartItem.value.id);
      toast.show("Removed from cart");
    } else {
      await updateQuantity(cartItem.value.id, cartItem.value.quantity - 1);
      toast.show("Quantity updated");
    }
  } catch (error: any) {
    toast.show(error.message || "Failed to update quantity", "error");
  } finally {
    qtyLoading.value = false;
  }
};

onMounted(() => {
  if (props.product.stocks?.length === 1) {
    selectedSize.value = props.product.stocks[0]!.size;
  }
});
</script>

<template>
  <div class="lg:sticky lg:top-24 space-y-8">
    <div class="space-y-2">
      <h1 class="text-2xl lg:text-3xl font-normal tracking-tight">
        {{ product.name }}
      </h1>
      <p class="text-sm text-neutral-600">
        {{ product.category }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <span class="text-2xl font-normal">{{
        formatRupiah(product.price)
      }}</span>
      <span
        v-if="product.original_price"
        class="text-lg text-neutral-400 line-through"
      >
        Rp. {{ product.original_price }}
      </span>
    </div>

    <div v-if="product.colors?.length || product.images?.length">
      <p class="text-xs uppercase tracking-wider mb-4 font-medium">
        Colour: {{ currentColorName }}
      </p>
      <div class="flex gap-3">
        <button
          v-if="product.images?.length"
          @click="selectColor(-1)"
          :class="[
            'w-12 h-12 rounded-full border-2 transition-all overflow-hidden',
            selectedColor === -1
              ? 'border-black scale-110'
              : 'border-neutral-300',
          ]"
          title="Default"
        >
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </button>

        <button
          v-for="(color, index) in product.colors"
          :key="index"
          @click="selectColor(index)"
          :class="[
            'w-12 h-12 rounded-full border-2 transition-all',
            selectedColor === index
              ? 'border-black scale-110'
              : 'border-neutral-300',
          ]"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        />
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-4">
        <p class="text-xs uppercase tracking-wider font-medium">Size</p>
        <button
          type="button"
          @click="emit('open-fit-guide')"
          class="text-xs underline hover:no-underline"
        >
          Size Guide
        </button>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="stock in product.stocks"
          :key="stock.id"
          @click="selectSize(stock.size)"
          :disabled="stock.stock === 0"
          :class="[
            'border text-sm py-3 transition-all font-medium',
            selectedSize === stock.size
              ? 'border-black bg-black text-white'
              : 'border-neutral-300 hover:border-black',
            stock.stock === 0 && 'opacity-40 cursor-not-allowed',
          ]"
        >
          {{ stock.size }}
        </button>
      </div>
    </div>

    <div
      v-if="cartItem"
      class="flex items-center justify-between gap-4 border border-black py-3 px-4"
    >
      <button
        @click="decreaseQty"
        :disabled="qtyLoading"
        class="text-xl px-4 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        -
      </button>

      <span class="text-lg font-medium">
        {{ qtyLoading ? "..." : cartItem.quantity }}
      </span>

      <button
        @click="increaseQty"
        :disabled="qtyLoading || cartItem.quantity >= cartItem.stock_available"
        class="text-xl px-4 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>

    <button
      v-else
      :disabled="!selectedSize"
      @click="handleAddToCart"
      class="w-full bg-black text-white py-4 text-sm tracking-wider uppercase font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Add to Cart
    </button>
    <div v-if="product.external_links?.length !== 0">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="flex-1 h-px bg-black"></div>
        <span>Or Buy On Other Platforms</span>
        <div class="flex-1 h-px bg-black"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <div class="flex justify-center">
          <NuxtLink class="block w-full">
            <button
              class="w-full flex items-center justify-center gap-x-2 text-black rounded-sm border border-black py-4 text-sm tracking-wider uppercase font-medium hover:bg-orange-400 hover:text-white hover:border-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon
                icon="simple-icons:shopee"
                class="w-7 h-7 text-[#EE4D2D] transition-transform hover:scale-110"
              />
              Shopee
            </button>
          </NuxtLink>
        </div>
        <div class="flex justify-center">
          <NuxtLink class="block w-full">
            <button
              class="w-full flex items-center justify-center gap-x-2 text-black rounded-sm border border-black py-4 text-sm tracking-wider uppercase font-medium hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon
                icon="logos:tiktok-icon"
                class="w-7 h-7 transition-transform hover:scale-110"
              />
              TikTok
            </button>
          </NuxtLink>
        </div>
        <div class="flex justify-center">
          <NuxtLink class="block w-full">
            <button
              class="w-full flex items-center justify-center gap-x-2 text-black rounded-sm border border-black py-4 text-sm tracking-wider uppercase font-medium hover:bg-green-400 hover:text-white hover:border-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <img
                src="/tokped.png"
                alt="Tokopedia"
                class="w-7 h-7 object-contain transition-transform hover:scale-110"
              />
              Tokopedia
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="product.badges?.length" class="flex flex-wrap gap-2">
      <span
        v-for="(badge, i) in product.badges"
        :key="i"
        class="inline-flex items-center gap-2 text-xs bg-neutral-100 px-3 py-2 rounded-full"
      >
        <span>{{ badge.icon }}</span>
        <span>{{ badge.text }}</span>
      </span>
    </div>

    <div class="text-xs text-neutral-600 space-y-2 pt-4 border-t">
      <p class="flex items-start gap-2">
        <span>🚚</span>
        <span>Free delivery over</span>
      </p>
      <p class="flex items-start gap-2">
        <span>↩️</span>
        <span>30 day returns policy</span>
      </p>
      <p class="flex items-start gap-2">
        <span>✓</span>
        <span>Secure checkout</span>
      </p>
      <p
        v-if="cartItem && cartItem.quantity >= cartItem.stock_available"
        class="text-xs text-red-600 mt-2"
      >
        ⚠️ Stock limit reached
      </p>
    </div>

    <div v-if="product.trust_badges?.length" class="flex flex-wrap gap-4 pt-4">
      <div
        v-for="(trust, i) in product.trust_badges"
        :key="i"
        class="flex items-center gap-2 text-xs text-neutral-600"
      >
        <span class="text-base">{{ trust.icon }}</span>
        <span>{{ trust.text }}</span>
      </div>
    </div>
  </div>
</template>
