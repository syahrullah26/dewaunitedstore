import { useAuthStore } from "~/stores/auth"


export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      if (!auth.token) return

      if (options.headers instanceof Headers) {
        options.headers.set('Authorization', `Bearer ${auth.token}`)
        return
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
        navigateTo('/auth/login')
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
