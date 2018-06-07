// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './router/index'
import store from './store/index'

import axios from 'axios'
Vue.use(VueRouter)
Vue.prototype.$axios = axios

import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import UrlMapping from './apis/UrlMapping.js'
Vue.prototype.$Urls = new UrlMapping()
import Apis from './apis/Apis.js'
Vue.prototype.$Apis = new Apis()

const router = new VueRouter({
	routes,
	mode:'history'
})

//全局守卫
//router.beforeEach((to,from,next)=>{
//	
//})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
