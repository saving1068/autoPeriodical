import request from '@/request'
const login = (params) => { //登录--+
    console.log(request)
    return request({
        url: '/user/login',
        method: 'POST',
        data:params
    });
}


const kaptcha = (params) => { //验证玛
    return request({
        url: '/user/kaptcha',
        method: 'get',
        params
    });
}
const delteAccount = (params) => { //账号删除
    return request({
        url: '/user/delete',
        method: 'DELETE',
        params
    });
}
const accountList = (params) => { //账号列表
    return request({
        url: '/user/list',
        method: 'get',
        params
    });
}
const resetUser = (params) => { //账号重置密码,将密码重置为：123456
    return request({
        url: '/user/reset',
        method: 'post',
        data:params
    });
}
const accountDetail = (params) => { //账号详情
    return request({
        url: '/user/resource',
        method: 'get',
        params
    });
}

const accountUpdate = (params) => { //账号修改
    return request({
        url: '/user/update',
        method: 'post',
        data:params
    });
}


export{
    login,accountUpdate,resetUser,accountDetail,accountList,delteAccount,kaptcha
}