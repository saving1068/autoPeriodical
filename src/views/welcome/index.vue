<template>
    <div class='warpBack'>
        <el-card shadow="always">
            <div class='space-between'>
                <div>
                    欢迎进入嘉信自动化招商系统
                </div>
                
            </div>
            <el-form  style="padding:5px 0" inline>
                <el-form-item label="当前时间" >
                   <div>{{nowDate}}</div>
                </el-form-item>
                <el-form-item label="本次登录ip" >
                   <div>{{userInfo.loginIp}}</div>
                </el-form-item>
                <el-form-item label="上次登录时间" >
                    <div>{{userInfo.lastLoginTime}}</div>
                </el-form-item>
                <el-form-item label="上次登录ip">
                    <div>{{userInfo.lastLoginIp}}</div>
                </el-form-item>
                </el-form>
        </el-card>
    </div>
</template>
<script>

 import { parseDate } from "@/utils";
export default {
    
    data(){
        return{
            nowDate:"",
            timer:null,
            userInfo:{}
        }
    },
    created(){
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        // 
        // console.log(this.nowDate)
        console.log(this);
      this.update()
    },
    methods:{
        update(){
           this.timer = setInterval(() => {
                this.nowDate = parseDate(new Date())
                console.log(this.nowDate)
            }, 1000);
            
        }
    },
    berforeDestroy(){
        console.log('clearInterval')
        
    },
    destroyed(){
        clearInterval(this.timer)
        console.log('destroyed')
    }
}
</script>

