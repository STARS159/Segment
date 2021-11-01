import Vue from 'vue'
import VueRouter from 'vue-router'
import Paginacao from '../views/Paginacao.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/paginacao',
    name: 'paginacao',
    component: Paginacao
  },
  {
    path: '*',
    redirect: '/paginacao'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
