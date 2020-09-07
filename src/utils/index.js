import {detailDic} from '@/api/admin';
import axios from 'axios'

const dictApi = (async (sign)=>{
    let res = await detailDic({sign})
    return res.data
})

const filterButton = ((id)=>{
    let buttonList = JSON.parse(sessionStorage.getItem('buttonList'))||[];
    // console.log(buttonList)
   let flag = buttonList.find(item  => item==id);
//    console.log(flag)
   return flag
})

const idChangeStr = ((list,id)=>{
    // let res = list.find(item => item.id == id);
    let resT = list.find(item => item.key == id);
    // console.log(resT,id,list)
    // console.log(res,resT)
    // if(res){
    //     const tip = res?res.value:'暂无数据'
    //     return tip
    // }else{
        const tip = resT?resT.value:'暂无数据'
        console.log(tip)
        return tip
    // }
   
})

const initDate = (item =>{
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate;
    if(item){
        currentdate = year + seperator1 + month
    }else{
        currentdate = year + seperator1 + month + seperator1 + strDate;
    }
   
    return currentdate

})
const parseDate = (rawDate) => {
	let hours;
	let day;
	let month;
	let minutes;
	let seconds;

	if (rawDate.getHours().toString().length === 1) {
		hours = `0${rawDate.getHours()}`;
	} else {
		hours = `${rawDate.getHours()}`;
	}

	if (rawDate.getDate().toString().length === 1) {
		day = `0${rawDate.getDate()}`;
	} else {
		day = `${rawDate.getDate()}`;
	}

	if (rawDate.getMonth().toString().length === 1) {
		month = `0${rawDate.getMonth() + 1}`;
	} else {
		month = `${rawDate.getMonth() + 1}`;
	}
	if (rawDate.getMinutes().toString().length === 1) {
		minutes = `0${rawDate.getMinutes()+ 1}`;
	} else {
		minutes = `${rawDate.getMinutes() + 1}`;
	}
	if (rawDate.getSeconds().toString().length === 1) {
		seconds = `0${rawDate.getSeconds()+ 1}`;
	} else {
		seconds = `${rawDate.getSeconds() + 1}`;
	}

	return `${rawDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

    
    


const downFileGet = ((url,type)=>{
    axios.get(url, {
        withCredentials:true,
         headers:{
             "token":sessionStorage.getItem('token')
         },
         responseType: 'blob', //二进制流
     }).then(function (res) {
         console.log(res)
         if(!res) return
         let blob = new Blob([res.data])
         let url = window.URL.createObjectURL(blob);
         let aLink = document.createElement("a");
         aLink.target = '_blank';
         aLink.style.display = "none";
         aLink.href = url;
         aLink.setAttribute("download",!type?'推广实况.xlsx':'废弃资源.xlsx');
         document.body.appendChild(aLink);
         aLink.click();
         document.body.removeChild(aLink); 
         window.URL.revokeObjectURL(url); 
     }).catch(function (error) {
         console.log(error)
     });
})

const downFile = ((url)=>{
    try {
        // http://wearewwx.com:8001 http://wearewwx.com:8001 127.0.0.1.2y
        let request = '/api/' +url
        console.log(request)
        let aLink = document.createElement("a");
            aLink.target = '_blank';
             aLink.style.display = "none";
             aLink.href = request;
             document.body.appendChild(aLink);
             aLink.click();
             document.body.removeChild(aLink); 
             return
    } catch (error) {
        
    }
})

const encryptionTel = ((tel)=>{
    var dh=tel.substr(0,3)+"******"+tel.substr(8);
    return dh;
})


export {dictApi,idChangeStr,downFile,filterButton,initDate,parseDate,encryptionTel,downFileGet}