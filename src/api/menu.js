import request from '@/request'

const  menuList = (params) => { //菜单列表
    return request({
        url: '/permission/menu',
        method: 'GET',
        params
    });
}

const deleteMenu = (params) => { //删除菜单
    return request({
        url: '/permission/delete',
        method: 'DELETE',
        params
    });
}

const updataMenu  = (params) => { //修改菜单
    return request({
        url: '/permission/update',
        method: 'POST',
        data:params
    });
}
const userMenu = (params) => { //用户菜单
    return request({
        url: '/permission/user',
        method: 'POST',
        data:params
    });
}

const byUserMenu  = (params) => { //用户菜单
    return request({
        url: '/permission/byUserId',
        method: 'GET',
        params
    });
}
export {
    byUserMenu,
    userMenu,
    updataMenu,
    deleteMenu,
    menuList
}