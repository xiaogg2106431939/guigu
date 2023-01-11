import { reqGoodInfo,reqAddorUpdateShopCart } from "@/api"
//封装游客身份模块
import {getUUID} from '@/utils/uuidToken'
//search模块小仓库
const state = {
    goodInfo:{},
    //游客临时身份
    uuidToken:getUUID()
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
   },
   //将产品添加购物车
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
    //前台将参数带给服务器即可，服务器未返回任何数据
    let res = await reqAddorUpdateShopCart(skuId,skuNum)
    if (res.code == 200) {
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
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