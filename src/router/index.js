import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue';
import Withdrawal from '../views/Withdrawal.vue';
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: true,
      },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component:SignUp,
  },
  {
    path: "/withdrawal",
    name: "Withdrawal",
    component: Withdrawal,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) && !store.state.auth
  ) {
    console.log(store.state.auth)
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});
export default router;
