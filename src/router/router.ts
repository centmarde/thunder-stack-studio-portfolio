import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";

import Hero from "@/pages/index.vue";
import NotFound from "@/pages/NotFound.vue";


/**
 * Route definitions for the application
 */
const routes = setupLayouts([
  {
    path: "/",
    component: Hero,
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
