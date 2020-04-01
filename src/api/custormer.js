import request from '@/request'

const customerList = (params) => { //客户资源列表
    return request({
        url: '/customer/list',
        method: 'POST',
        data:params
    });
}

const deleteCustomer = (params) => { //删除字典
    return request({
        url: '/dic/customer',
        method: 'delete',
        params
    });
}
const detailCustomer = (params) => { //字典详情
    return request({
        url: '/customer/detail',
        method: 'get',
        params
    });
}
const updateCustomer = (params) => { //更新字典数据
    return request({
        url: '/customer/update',
        method: 'POST',
        data:params
    });
}

const followList =  (params) => { //跟踪记录
    return request({
        url: '/followUpRecords/list',
        method: 'POST',
        data:params
    });
}
const deleteFollow  = (params) => { //删除跟踪记录
    return request({
        url: '/followUpRecords/delete',
        method: 'delete',
        params
    });
}

const updateFollow =  (params) => { //更新跟踪记录
    return request({
        url: '/followUpRecords/update',
        method: 'POST',
        data:params
    });
}

export {
    updateCustomer,
    customerList,
    detailCustomer,
    deleteCustomer,
    followList,
    deleteFollow,
    updateFollow
}