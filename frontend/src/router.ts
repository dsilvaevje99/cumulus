import { createRouter, createWebHistory } from "vue-router";

/* import CoachesList from "./pages/coaches/CoachesList.vue";
import NotFound from "./pages/NotFound.vue";
const CoachDetail = () => import("./pages/coaches/CoachDetail.vue");
const CoachRegistration = () => import("./pages/coaches/CoachRegistration.vue");
const ContactCoach = () => import("./pages/requests/ContactCoach.vue");
const RequestsReceived = () => import("./pages/requests/RequestsReceived.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue"); */

import StartView from "./pages/StartView.vue";
import DaysView from "./pages/DaysView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound }, */
    { path: "/", component: StartView },
    { path: "/dagene-framover", component: DaysView },
  ],
});

export default router;
