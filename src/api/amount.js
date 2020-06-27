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


const deleteOtherPaid =  (params) => { //其他删除
    return request({
        url: '/otherPaid/delete',
        method: 'DELETE',
        params
    });
}
const otherPaidList  =  (params) => { //其他金额收入
    return request({
        url: '/otherPaid/list',
        method: 'POST',
        data:params
    });
}
const updataOtherPaid =  (params) => { //其他金额收入修改
    return request({
        url: '/otherPaid/update',
        method: 'POST',
        data:params
    });
}
const customerSuccess =  (params) => { //客户成就
    return request({
        url: '/customer/success',
        method: 'POST',
        data:params
    });
}

export {updataBackcourtPaid,backcourtPaidList,deleteBackcourtPaid,
    updataFrontPaid,frontPaidList,deleteFrontPaid,deleteOtherPaid,otherPaidList,updataOtherPaid,customerSuccess
}