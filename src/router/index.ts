import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "order" */ "../views/TestOrder.vue"),
  },
  {
    path: "/rxjs",
    name: "rxjs",
    component: () => import(/* webpackChunkName: "rxjs" */ "../views/RxJS.vue"),
  },
  {
    path: "/lottie",
    name: "lottie",
    component: () =>
      import(/* webpackChunkName: "lottie" */ "../views/LottieWeb.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () =>
      import(/* webpackChunkName: "message" */ "../views/PostMessage.vue"),
  },
  {
    path: "/text",
    name: "text",
    component: () =>
      import(/* webpackChunkName: "text" */ "../views/AutoText.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
