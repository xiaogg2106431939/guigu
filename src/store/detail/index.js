import { reqGoodInfo } from "@/api"
//search模块小仓库
const state = {
    goodInfo:{}
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}

const actions = {
   //获取产品信息action 
   async getGoodInfo({commit},skuId){
     let res = await reqGoodInfo(skuId)
     if (res.code == 200) {
        commit('GETGOODINFO',res.data)
     }
   }
}

const getters = {
    //简化导航路径的数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //简化产品售卖属性的数据
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}