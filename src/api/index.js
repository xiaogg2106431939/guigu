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

//将产品添加到购物车中(或更新某商品个数) URL:/api/cart/addToCart/{skuId}/{skuNum}
export const reqAddorUpdateShopCart = (skuId,skuNum)=> request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
//获取购物车列表数据 URL：/api/cart/cartList
export const reqCartList = ()=> request({url:'/cart/cartList',method:'get'})
//删除购物车产品 URL：/api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=> request({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//修改商品选中的状态 URL:/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateChecked = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码 URL：/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => request({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册用户 参数：phone password code 直接带个对象data
export const reqUserRegister = (data) => request({url:'/user/passport/register',data,method:'post'})
//登录
export const reqUserLogin = (data) => request({url:'/user/passport/login',data,method:'post'})
//获取用户信息
export const reqUserInfo = ()=> request({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLoginOut = ()=> request({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=> request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
export const reqOrderInfo = ()=> request({url:'/order/auth/trade',method:'get'})

//提交订单 URL:/order/auth/submitOrder?tradeNo={tradeNo} data:还有6个参数
export const reqSubmitOrder = (tradeNo,data)=> request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息 URL:/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=> request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态 URL：/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=> request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心数据 URL: /order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit)=> request({url:`/order/auth/${page}/${limit}`,method:'get'})













//mock数据获取banner接口
export const reqGetBannerList = ()=> mockRequest.get('/banner')
//mock数据获取floor接口
export const reqFloorList = ()=> mockRequest.get('/floor')
