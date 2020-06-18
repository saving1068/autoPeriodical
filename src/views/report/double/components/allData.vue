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
                <span>接收数据量:<span class='reportNum'>{{info.all}}</span></span>
                <span>有效数据量:<span class='reportNum'>{{info.validAll}}</span></span>
                <span>总有效率:<span class='reportNum'>{{info.percentage}}</span></span>
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
                    prop="total"
                    label="接收数据量">
                </el-table-column>
                 <el-table-column
                 align='center'
                    prop="validTotal"
                    label="有效数据量">
                </el-table-column>
                <el-table-column
                align='center'
                    prop="valid"
                    label="有效率(%)">
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
import {allData} from '@/api/customerStatement'
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
                percentage:'',
                validAll:0,
                all:0
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
             let url =`http://wearewwx.com:8001/customerStatement/dad?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}`;
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
              let all = 0;
            let validAll = 0;
            res.data.map(item =>{
                item.valid =(Number(item.validTotal)/Number(item.total)*100).toFixed(2)+"(%)";
                 all+=Number(item.total);
                validAll+=Number(item.validTotal);
            })
             let percentage =!isNaN((validAll/all).toFixed(2))?(validAll/all).toFixed(2)+"(%)":'0(%)';
            this.info = {
                all,validAll,percentage
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