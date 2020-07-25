<template>
    <div class="warp" v-loading='loading'>
        <div class="from center">
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
            
        </div>
        <div class="center" style="padding:20px 0">
            
                <el-button type="warning" @click="exportReport">导出报表</el-button>
                <el-button type="primary" @click="getData">查询</el-button>
            
            <div style="padding-left:100px" class='reportInfo'>
                <span>总收入:<span class='reportNum'>{{info.all}}</span></span>
                <span>总前场收入:<span class='reportNum'>{{info.bpMoney}}</span></span>
                <span>总后场收入:<span class='reportNum'>{{info.fpMoney}}</span></span>
                <span>总其他收入:<span class='reportNum'>{{info.opMoney}}</span></span>
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
                    prop="company"
                    label="公司"
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
                    prop="opMoney"
                    label="其他收入(元)">
                </el-table-column>
                <el-table-column
                align='center'
                    prop="all"
                    label="总收入(元)">
                </el-table-column>
                </el-table>
                <el-pagination
                   
                    layout="total, prev, pager, next"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
        </div>
    </div>
</template>

<script>
import {allData} from '@/api/saleroomStatement'
import {initDate,downFile} from '@/utils'
export default {
    created(){
        this.loading = true;
        console.log(1)
        this.date = initDate();
        this.request.queryDateBegin = initDate()
        this.request.queryDateEnd = initDate()
        this.getData()
        
    },
    data(){
        return{
            loading:false,
            date:'',
            info:{
                 all:0,bpMoney:0,fpMoney:0
            },
            request:{
                limit:10,
                page:1,
                queryDateBegin:"2020-06-01",
                queryDateEnd:"2020-06-12"
            },
            tableData:[],
            total:0
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
             let url =`saleroomStatement/dad?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}`;
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
             
            let res = await allData(this.request)
            let all = (Number(res.sumBpMoney)+Number(res.sumFpMoney)+Number(res.sumOpMoney));
            let bpMoney = res.sumBpMoney;
            let fpMoney =res.sumFpMoney;
            let opMoney = res.sumOpMoney;
            res.data.map(item =>{
                item.all =(Number(item.bpMoney)+Number(item.fpMoney)+Number(item.opMoney));
            })

            all = all.toFixed(2);
            bpMoney = bpMoney.toFixed(2);
            fpMoney = fpMoney.toFixed(2);
            opMoney = opMoney.toFixed(2);
            this.info = {
                all,bpMoney,fpMoney,opMoney
            }
            this.tableData = res.data;
            this.total =res.total;
            this.loading = false;
            console.log(res,'22222222222')
          } catch (error) {
              console.log(error)
          }
        
        
        }
    }
}
</script>