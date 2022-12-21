import { reqGetSearchInfo } from "@/api"
//search模块小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({commit},params={}){
        let res = await reqGetSearchInfo(params)
        if (res.code == 200) {
            commit('GETSEARCHLIST',res.data)
        }
        console.log(res);
    }
}
const getters = {
    //当前参数state，并非大仓库的state，而是本仓库的state
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        //返回一个新的数据
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}