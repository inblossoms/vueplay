import App from "./App.vue";
import { createPinia } from "@/pinia";
import { createApp } from "vue";

createApp(App).use(createPinia()).mount("#app");
