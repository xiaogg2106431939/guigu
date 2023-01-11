import { reqAddressInfo,reqOrderInfo } from "@/api"
//结算模块小仓库
const state = {
    address:[],
    orderInfo:{}
}

const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    },

    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}

const actions = {
   //获取用户地址信息
   async getUserAddress({commit}){
    let res = await reqAddressInfo()
    if (res.code == 200) {
        commit('GETUSERADDRESS',res.data)
    }
   },
   //获取商品清单数据
   async getOrderInfo({commit}){
    let res = await reqOrderInfo()
    if(res.code == 200){
        commit('GETORDERINFO',res.data)
    }
   }
}

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}