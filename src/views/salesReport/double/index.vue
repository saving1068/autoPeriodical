<template>
    <div class="warp">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="分日总数据" name="all">
                <!-- 分日总数据 -->
                <all v-if="activeName =='all' "></all>
            </el-tab-pane>
            <el-tab-pane label="分日部门数据" name="department">
                <!-- 分日部门数据 -->
                <department v-if="activeName =='department' "></department>
            </el-tab-pane>
            <el-tab-pane label="分日平台数据" name="platform">
                <!-- 分日平台数据 -->
                <platform v-if="activeName =='platform' "></platform>
            </el-tab-pane>
            <el-tab-pane label="分日推广个人数据" name="extension">
                <!-- 分日推广个人数据 -->
                <extension v-if="activeName =='extension' "></extension>
               
            </el-tab-pane>
            <el-tab-pane label="分日销售个人数据" name="sale">
                <!-- 分日销售个人数据 -->
                <sale v-if="activeName =='sale' "></sale>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import all from './components/allData.vue';
import department from './components/departmentData.vue';
import extension from './components/extension.vue';
import platform from './components/platform.vue';
import sale from './components/saleData.vue';
export default {
    components:{
        all,department,extension,platform,sale
    },
    created(){

    },
    data(){
        return{
            activeName:"all"
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>

</style>