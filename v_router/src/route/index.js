import { createRouter, createWebHashHistory } from "vue-router";
import VueRouter from "./router";

const router = new VueRouter({
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

const router1 = createRouter({
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
