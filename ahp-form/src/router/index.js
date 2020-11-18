import Vue from 'vue'
import VueRouter from 'vue-router'
// Routes
import Home from '@/views/Home.vue'
import NotFoundComponent from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history',
})

export default router
