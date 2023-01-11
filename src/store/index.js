import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 引入插件
import SecureLS from "secure-ls"
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

var ls = new SecureLS({
  encodingType: "aes",    //加密类型
  isCompression: false,   //是否压缩
  encryptionSecret: "TOKEN",   //PBKDF2值  加密秘密
})
// const PERSIST_PATHS = ['manage[模块名称].isAdmin','login.token']
const PERSIST_PATHS = ['user.token','user.userInfo']
export default new Vuex.Store({
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  },
  // plugins:[
  //   createPersistedState({
  //     key:'TOKEN',
  //     paths:PERSIST_PATHS,
  //     // storage: {
  //     //   getItem: (key) => ls.get(key),
  //     //   setItem: (key, value) => ls.set(key, value),
  //     //   removeItem: (key) => ls.remove(key),
  //     // } 
  //   })
  // ]
})
