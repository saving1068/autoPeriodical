import request from '@/request'

const  specList = (params) => { //配置列表
    return request({
        url: '/saleQuantity/list',
        method: 'POST',
        params
    });
}

const deleteSpec = (params) => { //删除配置
    return request({
        url: '/saleQuantity/delete',
        method: 'DELETE',
        params
    });
}

const updataSpec  = (params) => { //修改配置
    return request({
        url: '/saleQuantity/update',
        method: 'POST',
        data:params
    });
}
const stopSever = (params) => { //服务暂停
    return request({
        url: '/job/pause/'+params,
        method: 'GET',
        data:params
    });
}

const startSever  = (params) => { //服务开始
    return request({
        url: '/job/start/'+params,
        method: 'GET',
       
    });
}
const specInfo  = (params) => { //服务信息
    return request({
        url: '/job/selectFpJob',
        method: 'GET',
        params
    });
}
export {
    specList,
    deleteSpec,
    updataSpec,
    stopSever,
    startSever,
    specInfo
}