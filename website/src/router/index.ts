import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/InitiativeView.vue";
import InvestigatorPage from "../views/InvestigatorsPage.vue";

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
