<template>
    <div class="warp"  v-loading='loading'>
        <div class="from center" >
            <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                @change="dataChange"
                
                value-format='yyyy-MM-dd'
                format='yyyy-MM-dd'
                end-placeholder="结束日期">
            </el-date-picker>
             <el-select v-model="request.platform" clearable style="padding:0 20px;" placeholder="请选择平台">
                <el-option
               v-for="item in platform"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)">
                </el-option>
            </el-select>
        </div>
        <div class="center" style="padding:20px 0">
            <el-button type="warning" @click="exportReport">导出报表</el-button>
            <el-button type="primary" @click="getData">查询</el-button>
             <div style="padding-left:100px" class='reportInfo'>
                <span>总收入:<span class='reportNum'>{{info.all}}</span></span>
                <span>总前场收入:<span class='reportNum'>{{info.bpMoney}}</span></span>
                <span>总后场收入:<span class='reportNum'>{{info.fpMoney}}</span></span>
            </div>
        </div>
        <div class="table center">
            <el-table
                :data="tableData"
                fit
                style="width: 100%">
                <el-table-column
                    align='center'
                    prop="disDate"
                    label="日期"
                    >
                </el-table-column>
                <el-table-column
                align='center'
                    prop="platformName"
                    label="平台"
                   >
                </el-table-column>
                <el-table-column
                align='center'
                    prop="fpMoney"
                    label="前场收入(元)">
                </el-table-column>
                 <el-table-column
                 align='center'
                    prop="bpMoney"
                    label="后场收入(元)">
                </el-table-column>
                <el-table-column
                align='center'
                    prop="all"
                    label="总收入(元)">
                </el-table-column>
                </el-table>
                <el-pagination
                   
                    layout="prev, pager, next"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
        </div>
    </div>
</template>

<script>
import {platformData} from '@/api/saleroomStatement'
import {initDate,downFile,dictApi} from '@/utils'
export default {
    async created(){
        this.loading = true;
        console.log(1)
        this.request.queryDateBegin = initDate()
        this.request.queryDateEnd = initDate()
         this.date = initDate();
         this.platform = await dictApi("platform");
        this.getData()
    },
    data(){
        return{
            loading:false,
            date:'',
            request:{
                limit:10,
                page:1,
                queryDateBegin:"2020-06-01",
                queryDateEnd:"2020-06-12",
                platform:""
            },
            info:{
               all:0,bpMoney:0,fpMoney:0
            },
            tableData:[],
            platform:[],
            total:0,
        }
    },
    methods:{
         handleSizeChange(val) {
             this.request.page = val;
             this.getData()
      },
      handleCurrentChange(val) {
       this.request.page = val;
             this.getData()
      },
        exportReport(){
            if(!this.tableData.length){
                return this.$message.warning("暂无数据")
            }
             let url =`http://wearewwx.com:8001/saleroomStatement/dpd?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}&&platform=${this.request.platform}`;
             downFile(url)
        },
        dataChange(value){
            if(value.length){
                this.request.queryDateBegin  = value[0];
                this.request.queryDateEnd  = value[1];
            }else{
                 this.request.queryDateBegin  = initDate();
                this.request.queryDateEnd  = initDate();
            }
            console.log(value)
        },
      async  getData(){
          try {
           this.loading = true;
              
            
            let res = await platformData(this.request)
            let all = 0;
            let bpMoney = 0;
            let fpMoney =0;
            res.data.map(item =>{
                item.all =(Number(item.bpMoney)+Number(item.fpMoney));
                all += item.all
                bpMoney+=Number(item.bpMoney)
                fpMoney+=Number(item.fpMoney)
            })
            // all = all.toFixed(2);
            // bpMoney = bpMoney.toFixed(2);
            // fpMoney = fpMoney.toFixed(2);
            this.info = {
                all,bpMoney,fpMoney
            }
            this.tableData = res.data;
            this.total =res.total;
            this.loading = false;
            console.log(res,'22222222222')
          } catch (error) {
              
          }
        
        
        }
    }
}
</script>