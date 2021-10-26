import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // 

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/zh-CN'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // 权限控制
import './utils/error-log' // 错误日志

import * as filters from './filters' // global filters

/**
 * 如果您不想使用 mock-server
 * 你想使用MockJs进行模拟api
 * 可以执行:mockXHR()
 *
 * 目前，MockJs将在生产环境中使用，
 * 请在上线前删除!!!
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
