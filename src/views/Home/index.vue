<template>
  <div class="warp">
    <el-tabs v-model="activeName" type="card" :tab-click='tabClick' >
      <el-tab-pane  name="current">
        <span slot="label"> 当前待处理客户 <i class="el-icon-count">{{totalInfo.pending}}</i></span>
        <current v-if="activeName =='current'"></current> 
      </el-tab-pane>
      <el-tab-pane  name="awaitcustomer">
      <span slot="label"> 已成交客户 <i class="el-icon-count">{{totalInfo.success}}</i></span>
        <awaitcustomer v-if="activeName =='awaitcustomer'"></awaitcustomer>
      </el-tab-pane>
     
      <el-tab-pane name="history">
      <span slot="label"> 客户跟进历史 <i class="el-icon-count">{{totalInfo.fuHistory}}</i></span>
        <history v-if="activeName =='history'"></history>
      </el-tab-pane>
      <el-tab-pane name="untreated">
        <span slot="label"> 废弃池 
        <!-- <i class="el-icon-count">1</i> -->
        </span>
        <untreatedCustomer></untreatedCustomer>
      </el-tab-pane>
       <el-tab-pane  name="addcustomer" v-if='filterButton(201)' >
        <span slot="label"> 资源池
         <!-- <i class="el-icon-count">1</i> -->
         </span>
          <addcustomer v-if="activeName =='addcustomer'"></addcustomer>
      </el-tab-pane>
      <el-tab-pane :name="activeName" >
      <span slot="label" > 
        <el-button type="primary" @click.native="refresh" icon="el-icon-refresh">刷新</el-button>
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
import {filterButton} from '@/utils'
import {customerTotal} from '@/api/custormer'
export default {
  components:{
    current,addcustomer,awaitcustomer,history,untreatedCustomer
  },
  data() {
    return {
      activeName:"current",
       filterButton:filterButton,
       totalInfo:{}
    };
  },
  created(){
    this.refresh()
  },
  mounted() {
   console.log(this.activeName)
  },
  methods: {

    tabClick(tab, event){
      console.log(tab, event,"----------------------------")
    },
  async refresh(){
    let res = await customerTotal();
    this.totalInfo = res.data
    console.log(res)
     console.log('refresh')
   }
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
