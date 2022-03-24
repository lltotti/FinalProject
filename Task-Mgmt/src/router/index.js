import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
const routes = [
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/", name: "Home", component: Home },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;


