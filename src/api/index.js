//API统一管理模块
import request from "./request"
//mock数据
import mockRequest from "./mockAjax"

//三级联动接口
export const reqCategoryList = ()=> request({url:'/product/getBaseCategoryList',method:'get'})
//获取搜索模块数据,给服务器传递参数至少是空对象
export const reqGetSearchInfo = (params)=> request({url:'/list',method:'post',data:params})
//获取产品详情信息接口 URL:/api/item/{skuId}
export const reqGoodInfo = (skuId)=> request({url:`/item/${skuId}`,method:'get'})




//mock数据获取banner接口
export const reqGetBannerList = ()=> mockRequest.get('/banner')
//mock数据获取floor接口
export const reqFloorList = ()=> mockRequest.get('/floor')
