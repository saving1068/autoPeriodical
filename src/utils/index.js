import {detailDic} from '@/api/admin';

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
    console.log(item.name +currentdate)
    return currentdate

})
    
    




const downFile = ((url)=>{
    try {
        console.log(url)
        let aLink = document.createElement("a");
             aLink.style.display = "none";
             aLink.href = url;
             document.body.appendChild(aLink);
             aLink.click();
             document.body.removeChild(aLink); 
             return
    } catch (error) {
        
    }
})


export {dictApi,idChangeStr,downFile,filterButton,initDate}