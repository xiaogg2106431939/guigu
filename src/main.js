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


//引入MockServer.js----mock数据,至少让它执行一次
import "@/mock/mockServe"

//引入swiper8样式
import 'swiper/swiper-bundle.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
