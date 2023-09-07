import { createApp } from "./core";
import { T1 } from "./components/T1/index.js";
import { T2 } from "./components/T2/index.js";

const app = createApp({
  components: [T1, T2],
});

app.mount("#app");
