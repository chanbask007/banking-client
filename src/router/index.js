import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Transactions from '@/components/Transactions'
import Accounts from '@/components/Accounts'
import Users from '@/components/Users'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
      meta: {requiresAuth: true}
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
