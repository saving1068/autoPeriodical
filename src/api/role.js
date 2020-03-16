import request from '@/request'

const  roleList = (params) => { //角色列表
    return request({
        url: '/role/list',
        method: 'POST',
        data:params
    });
}

const deleteRole = (params) => { //删除角色
    return request({
        url: '/role/delete',
        method: 'DELETE',
        params
    });
}

const roleDetail  = (params) => { //角色详情
    return request({
        url: '/role/resource',
        method: 'GET',
        params
    });
}
const updataRole = (params) => { //修改角色
    return request({
        url: '/role/update',
        method: 'POST',
        data:params
    });
}


export {
    updataRole,
    roleDetail,
    deleteRole,
    roleList,
}