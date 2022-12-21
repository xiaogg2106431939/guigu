import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
//search模块小仓库
const state = {
    //初始值根据接口返回的数据类型决定
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    async categoryList({commit}){
        let res =await reqCategoryList()
        commit('CATEGORYLIST',res.data)
    },
    //获取轮播图
    async getBannerList({commit}){
        let res = await reqGetBannerList()
        if (res.code == 200) {
            commit('GETBANNERLIST',res.data)
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList()
        if (res.code == 200) {
            commit('GETFLOORLIST',res.data)
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