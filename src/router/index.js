import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:lang",
    component: {
      render: (h) => h("router-view"),
    },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
  // หากไม่มีภาษา → redirect ไป th
  {
    path: "*",
    redirect: "/th",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
