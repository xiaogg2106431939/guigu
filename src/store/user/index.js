import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut } from "@/api"
import { getToken, getUserInfo, removeData, setToken,setUserInfo } from "@/utils/token"
//用户模块小仓库
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
   GETCODE(state,code){
    state.code = code
   },
   USERLOGIN(state,token){
    state.token = token
   },
   GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
   },
   //清除本地数据
   CLEAR(state){
    state.token = '',
    state.userInfo = {}
    removeData()
   }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        //获取验证码的这个接口：把验证码返回，但是正常情况下，后台把验证码发到用户手机上[省钱]
        let res =await reqGetCode(phone)
        if (res.code == 200) {
            commit('GETCODE',res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let res = await reqUserRegister(user)
        if (res.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error(res.message))
        }
    },
    //登录
    async userLogin({commit},data){
        let res = await reqUserLogin(data)
        if (res.code == 200) {
            commit('USERLOGIN',res.data.token)
            setToken(res.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('账号或密码不正确'))
        }
    },
    //获取用户信息
   async getUserInfo({commit}){
     let res = await reqUserInfo()
     console.log('res',res);
     if(res.code == 200){
        commit('GETUSERINFO',res.data)
        // setUserInfo(res.data)
        return 'ok'
     }
    //  else{  有提示报错情况
    //     return Promise.reject(new Error('faile'))
    //  }
   },
   //退出登录
   async loginOut({commit}){
    let res = await reqLoginOut()
    if (res.code == 200) {
        //action不能直接操作state
        commit('CLEAR')
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
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