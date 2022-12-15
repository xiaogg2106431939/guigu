//axios二次封装
import axios from "axios"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

//利用axios对象的方法create去创建一个axios实例
const request = axios.create({
    baseURL:"/mock",
    timeout:50000
})
//请求拦截器
request.interceptors.request.use((config)=>{
    nProgress.start()
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