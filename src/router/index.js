import Vue from 'vue'
import VueRouter from 'vue-router'
import Properties from '../views/Properties/Index'
import NewProperty from '../views/Properties/View'
import NewContract from '../views/Contracts/View'
import Home from '../views/Home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/propriedades',
    name: 'Propriedades',
    component: Properties
  },
  {
    path: '/propriedades/create',
    name: 'Nova Propriedade',
    component: NewProperty
  },
  {
    path: '/contratos/create',
    name: 'Novo Contrato',
    component: NewContract
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
