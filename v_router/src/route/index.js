import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: () => import("../views/Home.vue"),
    },
    {
      name: "about",
      path: "/about",
      component: () => import("../views/About.vue"),
    },
  ],
});

export default router;
