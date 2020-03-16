import request from '@/request'

const  msgList = (params) => { //角色列表
    return request({
        url: '/msgTip/list',
        method: 'POST',
        data:params
    });
}

const deleteMsg = (params) => { //删除角色
    return request({
        url: '/msgTip/delete',
        method: 'DELETE',
        params
    });
}

const msgDetail  = (params) => { //角色详情
    return request({
        url: '/msgTip/detail',
        method: 'GET',
        params
    });
}
const updataMsg = (params) => { //修改角色
    return request({
        url: '/msgTip/update',
        method: 'POST',
        data:params
    });
}

const readMsg = (params) => { //读取消息
    return request({
        url: '/msgTip/read',
        method: 'POST',
        data:params
    });
}

const notReadMsg = (params) => { //未读读取消息
    return request({
        url: '/msgTip/notRead',
        method: 'GET',
        params
    });
}

export {
    updataMsg,
    msgDetail,
    deleteMsg,
    msgList,
    readMsg,
    notReadMsg
}