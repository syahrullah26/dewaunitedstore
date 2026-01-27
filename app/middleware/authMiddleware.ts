import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (!auth.user && auth.token) {
    await auth.fetchUser();
  }

  if (!auth.token) {
    return navigateTo("/auth/login");
  }

  const roles = to.meta.roles as string[] | undefined;
  if (roles && !roles.includes(auth.user?.role)) {
    return navigateTo("/");
  }
});
