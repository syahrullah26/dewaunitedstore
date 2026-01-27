import { defineStore } from "pinia";

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Address {
  id: number;
  recipient_name: string;
  phone: string;
  address_detail: string;
  postal_code: string;
  province: { id: number; name: string };
  regency: { id: number; name: string };
  district: { id: number; name: string };
  village: { id: number; name: string };
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    token: useCookie("token").value || null,

    // ✅ INI YANG KURANG
    addresses: [] as Address[],
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isUser: (state) => state.user?.role === "user",
  },

  actions: {
    async login(payload: { email: string; password: string }) {
      const { $api } = useNuxtApp();
      const res: any = await $api("/login", {
        method: "POST",
        body: payload,
      });

      this.user = res.user;
      this.token = res.token;
      useCookie("token").value = res.token;
    },

    async register(form: RegisterForm) {
      const { $api } = useNuxtApp();

      const payload: RegisterPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      const res: any = await $api("/register", {
        method: "POST",
        body: payload,
      });

      this.user = res.user;
      this.token = res.token;
      useCookie("token").value = res.token;
    },

    async logout() {
      const { $api } = useNuxtApp();
      try {
        await $api("/logout", { method: "POST" });
      } catch {}

      this.user = null;
      this.token = null;
      this.addresses = []; // 🔥 reset juga
      useCookie("token").value = null;
    },

    async fetchUser() {
      if (!this.token) return;

      const { $api } = useNuxtApp();
      try {
        const res: any = await $api("/me");
        this.user = res;
      } catch {
        this.logout();
      }
    },

    async updateProfile(formData: FormData) {
      const { $api } = useNuxtApp();
      const res: any = await $api("/me/update", {
        method: "POST",
        body: formData,
      });

      this.user = res.user ?? res.data;
      return res;
    },

    async getAddress() {
      const { $api } = useNuxtApp();
      const res = await $api("/address");
      this.addresses = res.data;
    },
  },
});
