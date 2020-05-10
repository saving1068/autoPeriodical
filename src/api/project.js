import request from '@/request'

const  projectList = (params) => { //项目列表
    return request({
        url: '/project/list',
        method: 'POST',
        data:params
    });
}

const deleteProject = (params) => { //删除项目
    return request({
        url: '/project/delete',
        method: 'DELETE',
        params
    });
}


const updataProject = (params) => { //修改项目
    return request({
        url: '/project/update',
        method: 'POST',
        data:params
    });
}

const platformList = (params) => { //平台配置管理
    return request({
        url: '/platform/list',
        method: 'POST',
        data:params
    });
}

const deletePlatform = (params) => { //删除平台配置管理
    return request({
        url: '/platform/delete',
        method: 'DELETE',
        params
    });
}


const updataPlatform = (params) => { //修改平台配置管理
    return request({
        url: '/platform/update',
        method: 'POST',
        data:params
    });
}


export {
    updataProject,
    deleteProject,
    projectList,
    updataPlatform,
    deletePlatform,
    platformList
}