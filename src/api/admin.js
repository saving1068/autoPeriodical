import request from '@/request'

const updateDic = (params) => { //新增更新字典
    return request({
        url: '/dic/update',
        method: 'POST',
        data:params
    });
}

const deleteDic = (params) => { //删除字典
    return request({
        url: '/dic/delete',
        method: 'delete',
        params
    });
}
const detailDic = (params) => { //字典详情
    return request({
        url: '/dic/detail',
        method: 'get',
        params
    });
}
const listDic = (params) => { //字典列表
    return request({
        url: '/dic/list',
        method: 'POST',
        data:params
    });
}
const deleteItemDic = (params) => { //删除字典数据
    return request({
        url: '/dic/value/delete',
        method: 'delete',
        params
    });
}
const updateItemDic = (params) => { //更新字典数据
    return request({
        url: '/dic/value/update',
        method: 'POST',
        data:params
    });
}




export {
    updateDic,
    updateItemDic,
    deleteItemDic,
    listDic,
    detailDic,
    deleteDic,
    
}