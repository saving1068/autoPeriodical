import axios from 'axios'
import qs from 'qs'
import { Message, Notification } from 'element-ui'
import router from '@/router'
import store from '@/store'

let token = sessionStorage.getItem('token');

// console.log(sessionStorage.getItem('token'),222)

// 创建axios实例
const service = axios.create({
    baseURL:process.env.NODE_ENV === 'production' ? 'http://wearewwx.com:8080' : '/api/', // api的base_url
    timeout: 30000, // 请求超时时间,
    withCredentials:true,
    headers: {
        "Content-type":"application/json",
        //  'X-Requested-With': 'XMLHtx`tpRequest'
        // 'token':window.sessionStorage.getItem('token')
         }
         
})

// axios.defaults.headers.common["token"] = token?token:'';
// debugger
// console.log(axios.defaults)
// axios.defaults.withCredentials = true

// request请求拦截器
service.interceptors.request.use(
    config => {

        config.headers.token = window.sessionStorage.getItem('token'); 
        config.data = config.data || {}
        config.method = config.method || 'post'
        return config
    }, error => {
        console.log('error>>>>>>>>>>',error) // for debug
        Promise.reject(error)
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const {returnCode, data, returnMsg} = response.data


        // console.log('router.currentRoute+++',router.currentRoute)
        
        // success
        if(returnCode == 200){
			
            return response.data
        }else if(returnCode == 400||returnCode == 'EXPIRY'){
            store.commit('clearToken')
            console.log('登录态 <<<______>>> %c "已失效啦"',"color:red")
            const href = location.href
            
            if(href.indexOf('redirect') == -1 && href.indexOf('admin/login') == -1){
                // console.log('router.currentRoute+++',router.currentRoute)
                router.replace(`/admin/login?redirect=${router.currentRoute.fullPath}`)
            }
            return Promise.reject(response.data)
        }else{
			if(response.config.url.indexOf('welfare/eachWelfareStatus')== -1){
				const errorTxt = returnMsg || '操作失败'
				console.log(errorTxt)
				errorTip(errorTxt)
				return Promise.reject(response.data)
			}else{
				return Promise.reject(response.data)
			}
            
        }
        
    },
    error => {
        console.log('net work err', error)// for debug
        // if(error.indexOf('timeout') > -1){
        //     errorTip('网络错误,请刷新再试')
        // }else{
            Notification({
                title: '错误提示',
                message: error
            })
        // }

        return Promise.reject('网络错误,请刷新再试')
    }
);


function errorTip(errTxt){    
    Message({
        message: errTxt,
        type: 'error',
        duration: 1 * 1000
    })
	return
}

export default service

