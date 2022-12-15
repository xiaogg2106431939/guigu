import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'

Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
//重写多次点击出现的BUG
VueRouter.prototype.push = function (location,resolve,reject){
  if(resolve && reject){
    //call || apply 区别
    //相同点：都可以调用函数一次，都可以篡改函数上下文一次
    //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function (location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      show:true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search'),
    meta:{
      show:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login'),
    meta:{
      show:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register'),
    meta:{
      show:false
    }
  },
  {
    path:'*',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
