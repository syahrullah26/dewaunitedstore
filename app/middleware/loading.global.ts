export default defineNuxtRouteMiddleware((to, from) => {
    const { startLoading, stopLoading } = useLoading()

    startLoading()

    setTimeout(() => {
        stopLoading(0)
    }, 350)
})