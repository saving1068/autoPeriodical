import request from '@/request'
const deleteFrontPaid =  (params) => { //前场删除
    return request({
        url: '/frontPaid/delete',
        method: 'DELETE',
        params
    });
}
const frontPaidList  =  (params) => { //分配记录
    return request({
        url: '/frontPaid/list',
        method: 'POST',
        data:params
    });
}
const updataFrontPaid =  (params) => { //分配记录
    return request({
        url: '/frontPaid/update',
        method: 'POST',
        data:params
    });
}

const deleteBackcourtPaid =  (params) => { //后场删除
    return request({
        url: '/backcourtPaid/delete',
        method: 'DELETE',
        params
    });
}
const backcourtPaidList  =  (params) => { //分配记录
    return request({
        url: '/backcourtPaid/list',
        method: 'POST',
        data:params
    });
}
const updataBackcourtPaid =  (params) => { //分配记录
    return request({
        url: '/backcourtPaid/update',
        method: 'POST',
        data:params
    });
}

export {updataBackcourtPaid,backcourtPaidList,deleteBackcourtPaid,
    updataFrontPaid,frontPaidList,deleteFrontPaid
}