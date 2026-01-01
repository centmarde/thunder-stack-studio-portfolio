import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";

import Hero from "@/pages/index.vue";
import NotFound from "@/pages/NotFound.vue";
import VisionMissionView from "@/pages/VisionMissionView.vue";
import AboutUsView from "@/pages/AboutUsView.vue";
import PortfolioView from "@/pages/PortfolioView.vue";

/**
 * Route definitions for the application
 */
const routes = setupLayouts([
  {
    path: "/",
    component: Hero,
  },
  {
    path: "/vision-mission",
    component: VisionMissionView,
  },
  {
    path: "/about-us",
    component: AboutUsView,
  },
  {
    path: "/portfolio",
    component: PortfolioView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]);

/**
 * Create and configure the router instance
 */
export const createAppRouter = () => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
};
