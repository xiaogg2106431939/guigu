import { reqCartList,reqDeleteCartById,reqUpdateChecked } from "@/api"
//search模块小仓库
const state = {
  cartList:[]
}

const mutations = {
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}

const actions = {
  //获取购物车列表数据
  async getCartList({commit}){
    let res = await reqCartList()
    if (res.code == 200) {
      commit('GETCARTLIST',res.data)
    }
  },
  //删除购物车某个商品
  async delCartListSkuId({commit},skuId){
   let res = await reqDeleteCartById(skuId)
   if (res.code == 200) {
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
  },
  //修改购物车某个产品选中状态
  async updataChecked({commit},{skuId,isChecked}){
    let res = await reqUpdateChecked(skuId,isChecked)
    if (res.code == 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },

  //删除全部选中的产品
  delAllCheckedCart({dispatch,getters}){
    //ctx第一参数：小仓库，commit[提交mutations修改state] getters[计算属性] dispatch[派发action]
    //state[当前仓库数据]
    let promiseAll = []
    //--获取购物车中全部商品(是一个数组) forEach循环多次，调用多次
    getters.cartList.cartInfoList.forEach(item => {
      //调用派发,=1就删除，!=1什么都不干,返回的是promise
     let promise = item.isChecked == 1 ? dispatch('delCartListSkuId',item.skuId) : ''
     //将每次返回的Promise添加到数组中
     promiseAll.push(promise)
    })

    //只要全部的p1|p2 ...都成功，返回的结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(promiseAll)
  },

  //修改全部商品勾选状态
  updateAllChecked({dispatch,state},isChecked){
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updataChecked',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    //最终返回结果
    return Promise.all(promiseAll)
  }
}

const getters = {
    cartList(state){
      return state.cartList[0] || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}