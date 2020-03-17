<template>
  <div class="warp">
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane  name="current">
        <span slot="label"> 当前待处理客户 <i class="el-icon-count">1</i></span>
        <current></current> 
      </el-tab-pane>
      <el-tab-pane  name="addcustomer">
      <span slot="label"> 下一次跟进客户 <i class="el-icon-count">1</i></span>
        <awaitcustomer></awaitcustomer>
      </el-tab-pane>
      <el-tab-pane  name="awaitcustomer">
      <span slot="label"> 新增的客户 <i class="el-icon-count">1</i></span>
        <addcustomer></addcustomer>
      </el-tab-pane>
      <el-tab-pane name="history">
      <span slot="label"> 客户跟进历史 <i class="el-icon-count">1</i></span>
        <history></history>
      </el-tab-pane>
      <el-tab-pane name="untreated">
      <span slot="label"> 未处理客户 <i class="el-icon-count">1</i></span>
        <history></history>
      </el-tab-pane>
      <el-tab-pane name="refresh">
      <span slot="label"> 
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
        <!-- <el-button type="primary" icon="el-icon-refresh" ></el-button> -->
      </span>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import echarts from "echarts";
import current from './currentCustomer/index.vue';
import addcustomer from './addCustomer/index.vue';
import awaitcustomer from './awaitCustomer/index.vue';
import history from './historyCustomer/index.vue';
import untreatedCustomer from './untreatedCustomer/index.vue'

export default {
  components:{
    current,addcustomer,awaitcustomer,history,untreatedCustomer
  },
  data() {
    return {
      activeName:"current"
    };
  },
  create(){

  },
  mounted() {
   
  },
  methods: {
   
  }
};
</script>

<style scoped="scoped" lang="scss">
  .el-icon-count{
    width:15px;
    height:15px;
    border-radius:50%;
    background:red;
    text-align: center;
    line-height: 15px;
    color: #fff;
    position: absolute;
    font-size: 12px;
  }
</style>
