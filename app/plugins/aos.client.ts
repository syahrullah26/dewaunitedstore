import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;

  const initAOS = () => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 120,
    });
  };

  if (document.readyState === "complete") {
    initAOS();
  } else {
    window.addEventListener("load", initAOS, { once: true });
  }

  nuxtApp.hook("page:finish", () => {
    AOS.refreshHard();
  });
});
