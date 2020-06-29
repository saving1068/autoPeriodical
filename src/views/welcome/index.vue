<template>
    <div class='warpBack'>
        <el-card shadow="always">
            <div class='space-between'>
                <div>
                    欢迎进入嘉信自动化招商系统
                </div>
                <div>
                    {{nowDate}}
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>

 import { parseDate } from "@/utils";
export default {
    
    data(){
        return{
            nowDate:""
        }
    },
    created(){
        // 
        // console.log(this.nowDate)
        console.log(this);
        this.nowDate = parseDate(new Date())
    },
    methods:{
        
    }
}
</script>

