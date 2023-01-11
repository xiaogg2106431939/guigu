//储存token
export const setToken = (token)=>{
    // localStorage.setItem('TOKEN',window.btoa(window.encodeURIComponent(token)))
    localStorage.setItem('TOKEN',token)
}

//获取token
export const getToken = ()=>{
//    return decodeURIComponent(window.atob(localStorage.getItem('TOKEN')))
    return localStorage.getItem('TOKEN')
}

//清除本地存储

export const removeData = ()=>{
    let keysToRemove = [];
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            keysToRemove.push(key)
        }
    }

    for (key of keysToRemove) {
        localStorage.removeItem(key);
    }
}

export const setUserInfo = (token)=>{
    // localStorage.setItem('INFO',window.btoa(window.encodeURIComponent(token)))
    localStorage.setItem('INFO',JSON.stringify(token))
}

//获取token
export const getUserInfo= ()=>{ 
//   return decodeURIComponent(window.atob(localStorage.getItem('INFO')))
return JSON.parse(localStorage.getItem('INFO'))
}