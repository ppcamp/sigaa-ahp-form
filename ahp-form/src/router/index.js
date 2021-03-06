import Vue from 'vue'
import VueRouter from 'vue-router'
// Routes
import Form from '@/views/Form.vue'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/Form'
  },
  {
    path: '/Form',
    name: 'Form',
    component: Form,
  },
  {
    path: '/*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history',
})

export default router
