import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Profile from "../components/Profile.vue";
const routes = [
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/", name: "Home", component: Home },
  { path: "/Profile", name: "Profile", component: Profile },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;


