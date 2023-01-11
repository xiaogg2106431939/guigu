import { v4 as uuidv4 } from 'uuid'
//要生成一个随机字符串，且每次只是不能发生变化，游客身份持久储存
export const getUUID = ()=> {
    //先从本地存储获取uuid(看下本地存储是否存在)
    let uuidToken = localStorage.getItem('UUIDTOKEN')
    //如果没有便生成
    if (!uuidToken) {
        //生产游客临时身份
        uuidToken = uuidv4()
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN',uuidToken)
    }
    //没有返回值返回undefined
    return uuidToken
}