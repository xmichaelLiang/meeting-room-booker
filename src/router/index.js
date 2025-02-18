import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/LoginPage.vue";
import Booking from "@/views/BookingDevice.vue";
//import RoomManagement from "@/views/RoomManagement.vue";
//import NotFound from "@/views/NotFound.vue";
import store from "@/store";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/reservation",
    component: Booking,
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/room-management",
  //   component: RoomManagement,
  //   meta: { requiresAuth: true, requiresAdmin: true },
  // },
  // { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.user.token;
  const isAdmin = store.state.user.isAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next("/reservation");
  } else {
    next();
  }
});

export default router;
