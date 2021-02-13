import App from './App.vue'
import router from './router'
import store from './store'
import {VueJsonp} from 'vue-jsonp'
import './assets/css/global.css'

axios.defaults.baseURL='http://139.196.210.43:0927/'

axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  return config
})

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueJsonp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
