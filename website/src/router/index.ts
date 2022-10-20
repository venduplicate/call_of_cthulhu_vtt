import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/GameSessionView.vue";
import InvestigatorPage from "../views/InvestigatorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:user/investigators",
      name: "List of Investigators",
      component: InvestigatorPage,
    },
  ],
});

export default router;
