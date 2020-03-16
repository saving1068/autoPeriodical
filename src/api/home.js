import request from '@/request'

const  feedList = (params) => { //供应商列表
    return request({
        url: '/feed/list',
        method: 'POST',
        data:params
    });
}

const deleteFeed = (params) => { //删除进料单
    return request({
        url: '/feed/delete',
        method: 'DELETE',
        params
    });
}

const feedDetail  = (params) => { //进料单详情
    return request({
        url: '/feed/detail',
        method: 'GET',
        params
    });
}