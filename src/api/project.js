import request from '@/request'

const  projectList = (params) => { //角色列表
    return request({
        url: '/project/list',
        method: 'POST',
        data:params
    });
}

const deleteProject = (params) => { //删除角色
    return request({
        url: '/project/delete',
        method: 'DELETE',
        params
    });
}


const updataProject = (params) => { //修改角色
    return request({
        url: '/project/update',
        method: 'POST',
        data:params
    });
}


export {
    updataProject,
    deleteProject,
    projectList,
}