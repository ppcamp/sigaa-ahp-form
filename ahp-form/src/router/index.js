import Vue from "vue";
import VueRouter from "vue-router";
// Routes
import Form1 from "@/views/form/1.vue";
import Form2 from "@/views/form/2.vue";

import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/Form/Part1"
  },
  {
    path: "/Form/Part1",
    name: "Form_page1",
    component: Form1
  },
  {
    path: "/Form/Part2",
    name: "Form_page2",
    component: Form2
  },
  {
    path: "/*",
    component: NotFound
  }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

export default router;
