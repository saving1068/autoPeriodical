<template>
    <div class="warp">
        <el-tabs v-model="activeName" type="card" >
           
            <el-tab-pane label="单日部门数据" name="department">
                <!-- 单日部门数据 -->
                <department v-if="activeName =='department' "></department>
            </el-tab-pane>
            <el-tab-pane label="单日平台数据" name="platform">
                <!-- 单日平台数据 -->
                <platform v-if="activeName =='platform' "></platform>
            </el-tab-pane>
            <el-tab-pane label="单日推广个人数据" name="extension">
                <!-- 单日推广个人数据 -->
                <extension v-if="activeName =='extension' "></extension>
               
            </el-tab-pane>
            <el-tab-pane label="单日销售个人数据" name="sale">
                <!-- 单日销售个人数据 -->
                <sale v-if="activeName =='sale' "></sale>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

import department from './components/departmentData.vue';
import extension from './components/extension.vue';
import platform from './components/platform.vue';
import sale from './components/saleData.vue';
export default {
    components:{
        department,extension,platform,sale
    },
    created(){

    },
    data(){
        return{
            activeName:"department"
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>

</style>