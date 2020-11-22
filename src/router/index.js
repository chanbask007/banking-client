import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
      path: '/transactions',
      name: 'Transactions',
      component: Transactions
      // beforeEnter(to,from,next){
      //   if($store.state.isUserLoggedIn){
      //     next()
      //   }else{
      //     next({path:'/'})
      //   }
      // }
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
      component: Users,
      props: true
    }
  ]
})
