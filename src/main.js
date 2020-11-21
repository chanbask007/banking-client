// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {BootstrapVue} from 'bootstrap-vue'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate,{
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
sync(store,router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
