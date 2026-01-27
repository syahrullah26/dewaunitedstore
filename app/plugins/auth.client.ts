import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  const token = useCookie("token").value;

  if (token && !auth.user) {
    try {
      await auth.fetchUser();
    } catch {
      auth.logout();
    }
  }
});
