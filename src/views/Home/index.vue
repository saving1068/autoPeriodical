<template>
  <div class="warp">
    <el-tabs v-model="activeName" type="card" @tab-click='tabClick'  :before-leave="beforeLeave">
      <el-tab-pane  name="current">
        <span slot="label"> <p class="title">待跟进客户</p>
          <i class="count">{{totalInfo.pending<10000?totalInfo.pending:'9999+'}}</i>
        </span>
        <current @succreeRefresh='refresh' v-if="activeName =='current'"></current> 
      </el-tab-pane>
      <el-tab-pane  name="awaitcustomer">
      <span slot="label">  
      <p class="title">我的客户</p>
        <i class="count">{{totalInfo.own<10000? totalInfo.own:'9999+'}}</i>
        </span>
        <awaitcustomer v-if="activeName =='awaitcustomer'"></awaitcustomer>
      </el-tab-pane>
     
      <el-tab-pane name="history">
      <span slot="label">  
      <p class="title">已来访</p>
        <i class="count">{{totalInfo.visit<10000?totalInfo.visit:'9999+'}}</i>
        </span>
        <history v-if="activeName =='history'"></history>
      </el-tab-pane>
      <!-- <el-tab-pane  name="addcustomer" v-if='filterButton(201)' >
        <span slot="label">  
        <p class="title">全部客户</p>
        <i class="count">{{totalInfo.all<10000?totalInfo.all:'9999+'}}</i></span>
          <addcustomer v-if="activeName =='addcustomer'"></addcustomer>
      </el-tab-pane> -->
      <el-tab-pane name="untreated">
        <span slot="label"> 
        <p class="title">批量客户</p>
        <i class="count">{{totalInfo.batch<10000?totalInfo.batch:'9999+'}}</i>
        </span>
        <untreatedCustomer  v-if="activeName =='untreated'"></untreatedCustomer>
         
        
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
    let obj = {
      all:{},
      pending:{
        isFollowUp:0,
        isSuccess:0,
        isAgainAllot:0,
      },
      own:{
        isFollowUp:1,
        isVisit:0,
        isAgainAllot:0,
      },
      visit:{
        isVisit:1,
      },
      batch:{
        isAgainAllot:1,
         isVisit:0,
      }
    }
    let res = await customerTotal(obj);
    res.data.pending = res.data.pending||0;
    res.data.own = res.data.own||0;
    res.data.visit = res.data.visit||0;
    res.data.all = res.data.all||0;
    res.data.batch = res.data.batch||0;
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
