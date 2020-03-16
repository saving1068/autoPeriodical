import {detailDic} from '@/api/admin';

const dictApi = (async (sign)=>{
    let res = await detailDic({sign})
    return res.data
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


export {dictApi,idChangeStr,downFile}