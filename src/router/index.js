import Vue from 'vue'
import VueRouter from 'vue-router'
import DrugSearch from '@/components/DrugSearch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrugSearch',
    component: DrugSearch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router