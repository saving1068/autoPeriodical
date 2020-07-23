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
             <el-select clearable v-model="request.platform"  style="padding:0 20px;" placeholder="请选择平台">
                <el-option
               v-for="item in platform"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)">
                </el-option>
            </el-select>
        </div>
        <div class="center" style="padding:20px 0">
            <div style="flex:1;">
                <el-button type="warning" @click="exportReport">导出报表</el-button>
                <el-button type="primary" @click="getData">查询</el-button>
            </div>
            
            <div  class='reportInfo'>
               
                 <div>
                    <span>接收数据量:<span class='reportNum'>{{info.sumTotal}}</span></span>
                    <span>有效数据量:<span class='reportNum'>{{info.sumValidTotal}}</span></span>
                    <span>总有效率:<span class='reportNum'>{{info.sumValidTotalRate}}</span></span>
                 </div>
                <div>
                    <span>来访总数(来访时间):<span class='reportNum'>{{info.sumVisTotal}}</span></span>
                    <span>来访总效率(来访时间):<span class='reportNum'>{{info.sumVisTotalRate}}</span></span>
                </div>
                <div>
                    <span>来访总数(分配时间):<span class='reportNum'>{{info.sumDisVisTotal}}</span></span>
                    <span>来访总效率(分配时间):<span class='reportNum'>{{info.sumDisVisTotalRate}}</span></span>
                </div>
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
                <el-table-column
                    align='center'
                    prop="disVisTotal"
                    label="来访量(分配时间)">
                </el-table-column>
                 <el-table-column
                 align='center'
                    prop="disVisTotalRate"
                    label="来访率(%)(分配时间)">
                </el-table-column>
                <el-table-column
                    align='center'
                    prop="visTotal"
                    label="来访量(来访时间)">
                </el-table-column>
                 <el-table-column
                    align='center'
                    prop="visTotalRate"
                    label="来访率(%)(来访时间)">
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
import {platformData} from '@/api/customerStatement'
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
                percentage:'',
                validAll:0,
                all:0
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
             let url =`customerStatement/dpd?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}&&platform=${this.request.platform}`;
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
            let sumTotal =res.sumTotal;//总数
            let sumVisTotal =res.sumVisTotal;//来访总数（来访时间）
            let sumValidTotal = res.sumValidTotal;//有效总数
            let sumDisVisTotal = res.sumDisVisTotal;//来访总数（分配时间）
            // let visTotalRate = 0;
            res.data.map(item =>{
                item.visTotalRate =(Number(item.visTotal)/Number(item.total)*100).toFixed(2)+"(%)";
                item.disVisTotalRate = (Number(item.disVisTotal)/Number(item.total)*100).toFixed(2)+"(%)";
                item.valid = (Number(item.validTotal)/Number(item.total)*100).toFixed(2)+"(%)";
               
            })
           
            let sumVisTotalRate = !isNaN((sumVisTotal/sumTotal).toFixed(2))?(sumVisTotal/sumTotal*100).toFixed(2)+"(%)":'0(%)';
            let sumValidTotalRate = !isNaN((sumValidTotal/sumTotal).toFixed(2))?(sumValidTotal/sumTotal*100).toFixed(2)+"(%)":'0(%)';
            let sumDisVisTotalRate = !isNaN((sumDisVisTotal/sumTotal).toFixed(2))?(sumDisVisTotal/sumTotal*100).toFixed(2)+"(%)":'0(%)';
            this.info = {
                sumTotal,sumVisTotal,sumValidTotal,sumDisVisTotal,
                
                sumVisTotalRate,sumValidTotalRate,sumDisVisTotalRate
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