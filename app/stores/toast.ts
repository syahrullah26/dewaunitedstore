import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const message = ref("");
  const type = ref<"success" | "error">("success");
  const visible = ref(false);

  const show = (msg: string, t: "success" | "error" = "success") => {
    message.value = msg;
    type.value = t;
    visible.value = true;

    setTimeout(() => {
      visible.value = false;
    }, 3000);
  };

  return { message, type, visible, show };
});