<template>
  <div class="warp">
    <el-tabs v-model="activeName" type="card" @tab-click='tabClick'  :before-leave="beforeLeave">
      <el-tab-pane  name="current">
        <span slot="label"> <p class="title">待跟进客户</p>
          <i class="count">{{totalInfo.pending<100?totalInfo.pending:'99+'}}</i>
        </span>
        <current @succreeRefresh='refresh' v-if="activeName =='current'"></current> 
      </el-tab-pane>
      <el-tab-pane  name="awaitcustomer">
      <span slot="label">  
      <p class="title">我的客户</p>
        <i class="count">{{totalInfo.own<100? totalInfo.own:'99+'}}</i>
        </span>
        <awaitcustomer v-if="activeName =='awaitcustomer'"></awaitcustomer>
      </el-tab-pane>
     
      <el-tab-pane name="history">
      <span slot="label">  
      <p class="title">已来访</p>
        <i class="count">{{totalInfo.visit<100?totalInfo.visit:'99+'}}</i>
        </span>
        <history v-if="activeName =='history'"></history>
      </el-tab-pane>
      <el-tab-pane  name="addcustomer" v-if='filterButton(201)' >
        <span slot="label">  
        <p class="title">全部客户</p>
        <i class="count">{{totalInfo.all<100?totalInfo.all:'99+'}}</i></span>
          <addcustomer v-if="activeName =='addcustomer'"></addcustomer>
      </el-tab-pane>
      <!-- <el-tab-pane name="untreated">
        <span slot="label"> 废弃池 
        
        </span>
        <untreatedCustomer></untreatedCustomer>
      </el-tab-pane>
       
      <el-tab-pane name="5">
      <span slot="label" > 
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>

      </span>
        
      </el-tab-pane> -->
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
       totalInfo:{},
    };
  },
  created(){
    
    this.refresh()
  },
  mounted() {

   console.log(this.activeName)
  },
  methods: {
    beforeLeave(item){
      console.log(item)
      if(item == 5){
        this.refresh()
        return false
      }
    },

    tabClick(tab, event){
      console.log(tab, event,"----------------------------")
    },
  async refresh(){
    let res = await customerTotal();
    res.data.pending = res.data.pending||0;
    res.data.own = res.data.own||0;
    res.data.visit = res.data.visit||0;
    res.data.all = res.data.all||0;
    this.totalInfo = res.data;
    console.log(res)
     console.log('refresh')
   }
  }
};
</script>

<style scoped="scoped" lang="scss">
  .count{
    // width:40px;
    // height:40px;
    // border-radius:50%;
    // background:red;
    text-align: center;
    // line-height: 25px;
    color: red;
    // position: absolute;
    font-size: 12px;
  }
  .title{
    float: left;
    padding: 0 20px 0 10px;
    line-height: 40px;
  }
</style>
