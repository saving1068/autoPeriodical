<template>
    <div class="warp"  v-loading='loading'>
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
            <el-select v-model="request.dpId" clearable style="padding:0 20px;" placeholder="请选择部门">
                <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.description"
                :value="item.id">
                </el-option>
            </el-select>
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
                    prop="disTime"
                    label="日期"
                    >
                </el-table-column>
                <el-table-column
                align='center'
                    prop="dpName"
                    label="部门"
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
import {departmentData} from '@/api/customerStatement'
import {departmentList} from '@/api/department'
import {initDate,downFile} from '@/utils'
export default {
    async created(){
        console.log(1)
        this.loading = true;
        this.date = initDate();
        this.request.queryDateBegin = initDate()
        this.request.queryDateEnd = initDate()
            
        let department = await departmentList()
        this.resetList(department.data);
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
                queryDateEnd:"2020-06-12",
                dpId:""
            },
            tableData:[],
            departmentList:[],
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
             let url =`http://wearewwx.com:8001/customerStatement/dbddd?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}&&dpId=${this.request.dpId}`;
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
        resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach(item =>{
         this.departmentList.push(item)
          if(item.child.length){
            this.sonsTree(item);
            // console.log(son,'son')
           
          }
        })
        
        // console.log(pList,123123)
      },
      sonsTree(obj) {
        // console.log(obj.name,obj.child.length)
        // let son  = []
        console.log(obj,'obj')
        if(obj.child.length){
          obj.child.forEach((item)=>{
           
           this.departmentList.push(item)
           
            this.sonsTree(item)
          })
        }
      },
      async  getData(){
          try {
            this.loading = true;

           
            let res = await departmentData(this.request)
            let all = 0;
            let validAll = 0;
            
            res.data.map(item =>{
                item.valid =(Number(item.validTotal)/Number(item.total)*100).toFixed(2)+"(%)"
                all+=Number(item.total);
                validAll+=Number(item.validTotal);
            })
            let percentage =!isNaN((validAll/all).toFixed(2))?(validAll/all).toFixed(2)+"(%)":'0(%)';
            this.info = {
                all,validAll,percentage
            }
            this.tableData = res.data;
            this.total = res.total;
            this.loading = false;
            console.log(res,'22222222222')
          } catch (error) {
              
          }
        
        
        }
    }
}
</script>