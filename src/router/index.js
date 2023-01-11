import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'

Vue.use(VueRouter)

import store from '@/store'

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
    path: '/detail/:skuid',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail'),
    meta:{
      show:true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: () => import(/* webpackChunkName: "AddCartSuccess" */ '../views/AddCartSuccess'),
    meta:{
      show:true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import(/* webpackChunkName: "ShopCart" */ '../views/ShopCart'),
    meta:{
      show:true
    }
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import(/* webpackChunkName: "Trade" */ '../views/Trade'),
    meta:{
      show:true
    },
    //路由独享守卫(自页面拦截)
    beforeEnter: (to, from, next) => {
      //去交易面，必须是从购物车而来
      if(from.path == '/shopcart'){
        next()
      }else{
        //其他路由组件而来，停留再当前
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: "Pay" */ '../views/Pay'),
    meta:{
      show:true
    },
    //路由独享守卫(自页面拦截)
    beforeEnter: (to, from, next) => {
      //去交易面，必须是从购物车而来
      if(from.path == '/trade'){
        next()
      }else{
        //其他路由组件而来，停留再当前
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "Pay" */ '../views/PaySuccess'),
    meta:{
      show:true
    }
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import(/* webpackChunkName: "Center" */ '../views/Center'),
    meta:{
      show:true
    },
    children:[
      {
        path: 'myorder',
        name: 'myOrder',
        component: () => import(/* webpackChunkName: "myOrder" */ '../views/Center/myOrder'),
      },
      {
        path: 'grouporder',
        name: 'groupOrder',
        component: () => import(/* webpackChunkName: "groupOrder" */ '../views/Center/groupOrder'),
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path:'*',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

//全局守卫：前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to,from,next)=>{
  //用户登录了，才会有token
  let token = store.state.user.token
  //用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    if(to.path == '/login' || to.path == '/register') {
      next('/')
    }else{
      //如果用户名已有
      if (name) {
        next()
      }else{
        //没有用户信息，派发action让仓库储存用户信息再跳转
        try {
          //获取用户信息成功
          let res = await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效了获取不到用户信息，重新登录
          //清除token
          await store.dispatch('loginOut')
          next('/login')
        }
      }
    }
  }else{
    //未登录：不能去交易相关，支付相关[pay,paysuccess],个人中心
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      //重定向想去的路径，把未登录的时候想去而没去成的信息，存储于路由
      next('/login?redirect=' + toPath)
    }else{
      //去的不是上面路由
      next()
    }
  }
  
})

export default router
