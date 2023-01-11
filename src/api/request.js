//axios二次封装
import axios from "axios"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

//在当前模块中引入store
import store from "@/store"

//利用axios对象的方法create去创建一个axios实例
const request = axios.create({
    baseURL:"/api",
    timeout:50000
})
//请求拦截器
request.interceptors.request.use((config)=>{
    nProgress.start()
    if (store.state.detail.uuidToken) {
        //请求头添加一个字段(userTempId)，而且还要和后端商量好先
        config.headers.userTempId = store.state.detail.uuidToken
    }

    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
    nProgress.done()
    //成功的回调，服务器响应数据回来以后，响应拦截器可以检测到，可以做些事
    return res.data
},(err)=>{
    //响应失败回调函数
    return Promise.reject(err)
})

export default request