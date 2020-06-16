import request from '@/request'


const allData = (params) => { //分日总数据
    return request({
        url: '/view/saleroomStatement/dad',
        method: 'POST',
        data:params
    });
}
const departmentData = (params) => { //分日部门数据
    return request({
        url: '/view/saleroomStatement/dbddd',
        method: 'POST',
        data:params
    });
}
const platformData = (params) => { //分日平台数据
    return request({
        url: '/view/saleroomStatement/dpd',
        method: 'POST',
        data:params
    });
}
const extensionData = (params) => { //分日推广个人数据
    return request({
        url: '/view/saleroomStatement/ppdodb',
        method: 'POST',
        data:params
    });
}
const saleData = (params) => { //分日销售个人数据
    return request({
        url: '/view/saleroomStatement/spdbd',
        method: 'POST',
        data:params
    });
}
const extensionSingleData = (params) => { //单日推广个人数据
    return request({
        url: '/view/saleroomStatement/dpopd',
        method: 'POST',
        data:params
    });
}
const saleSingleData = (params) => { //单日销售个人数据
    return request({
        url: '/view/saleroomStatement/dsopd',
        method: 'POST',
        data:params
    });
}
const departmentSingleData = (params) => { //单日部门数据
    return request({
        url: '/view/saleroomStatement/oddd',
        method: 'POST',
        data:params
    });
}
const platformSingleData = (params) => { //单日平台数据
    return request({
        url: '/view/saleroomStatement/odpd',
        method: 'POST',
        data:params
    });
}



export {
    platformSingleData,
    departmentSingleData,
    saleSingleData,
    extensionSingleData,
    saleData,
    extensionData,
    platformData,
    departmentData,
    allData,
}