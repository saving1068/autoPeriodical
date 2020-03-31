import request from '@/request'

const  provinceList = (params) => { //省
    return request({
        url: '/province/list',
        method: 'GET',
        params
    });
}

const deleteProvince = (params) => { //删除省
    return request({
        url: '/province/delete',
        method: 'DELETE',
        params
    });
}

const updateProvince  = (params) => { //更新省
    return request({
        url: '/province/update',
        method: 'GET',
        params
    });
}

const  cityList = (params) => { //市
    return request({
        url: '/city/list',
        method: 'GET',
        params
    });
}

const deleteCity = (params) => { //删除市
    return request({
        url: '/city/delete',
        method: 'DELETE',
        params
    });
}

const updateCity  = (params) => { //更新市
    return request({
        url: '/City/update',
        method: 'GET',
        params
    });
}


const  districtList = (params) => { //区
    return request({
        url: '/district/list',
        method: 'GET',
        params
    });
}

const deleteDistrict = (params) => { //删除区
    return request({
        url: '/district/delete',
        method: 'DELETE',
        params
    });
}

const updateDistrict  = (params) => { //更新区
    return request({
        url: '/district/update',
        method: 'GET',
        params
    });
}
export {
    updateDistrict,
    deleteDistrict,
    districtList,
    updateCity,
    deleteCity,
    cityList,
    updateProvince,
    deleteProvince,
    provinceList
}