import request from '@/request'

const  departmentList = (params) => { //部门列表
    return request({
        url: '/department/list',
        method: 'POST',
        data:params
    });
}

const deleteDepartment = (params) => { //删除部门
    return request({
        url: '/department/delete',
        method: 'DELETE',
        params
    });
}

const updataDepartment  = (params) => { //修改部门
    return request({
        url: '/department/update',
        method: 'POST',
        data:params
    });
}
const deleteUserDepartment = (params) => { //删除部门员工关系
    return request({
        url: '/department/user/delete',
        method: 'DELETE',
        params
    });
}

const updateUserDepartment  = (params) => { //更新部门员工关系
    return request({
        url: '/department/user/update',
        method: 'POST',
        data:params
    });
}

const userDepartmentList  = (params) => { //部门员工列表
    return request({
        url: '/department/user/list',
        method: 'GET',
        params
    });
}
export {
    updateUserDepartment,
    deleteUserDepartment,
    updataDepartment,
    deleteDepartment,
    departmentList,
    userDepartmentList
}