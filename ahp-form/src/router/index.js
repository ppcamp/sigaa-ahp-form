import Vue from 'vue'
import VueRouter from 'vue-router'
// Routes
import Home from '@/views/Home.vue'
import Competencias from '@/views/Competencias.vue'
import Habilidades from '@/views/Habilidades'
import NotFoundComponent from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/competencias',
    name: 'Competencias',
    component: Competencias
  },
  {
    path: '/habilidades',
    name: 'Habilidades',
    component: Habilidades
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
