//API统一管理模块
import request from "./request"
//mock数据
import mockRequest from "./mockAjax"

//三级联动接口
export const reqCategoryList = ()=> request({url:'/product/getBaseCategoryList',method:'get'})






//mock数据获取banner接口
export const reqGetBannerList = ()=> mockRequest.get('/banner')
//mock数据获取floor接口
export const reqFloorList = ()=> mockRequest.get('/floor')
