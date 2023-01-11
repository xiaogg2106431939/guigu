import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//参数1：全局组件名字name，参数2：哪一个组件
Vue.component(TypeNav.name,TypeNav)
//轮播图--全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
//分页--全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//统一引接口api文件里面全部请求函数
import * as API from '@/api'

//引入MockServer.js----mock数据,至少让它执行一次
import "@/mock/mockServe"

//引入swiper8样式
import 'swiper/swiper-bundle.min.css'

import { Button, MessageBox } from 'element-ui'

Vue.component(Button.name, Button)
//挂载原型链上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


import VueLazyload from 'vue-lazyload'
import loading from '@/assets/logo.png'
Vue.use(VueLazyload, {
  loading: loading
})

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    //全局
    Vue.prototype.$api = API
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
