<template>
    <div class="warp"  v-loading='loading'>
        <div class="from center">
            <el-date-picker 
            v-model="request.queryDate"
            value-format='yyyy-MM-dd'
            type='date'
            placeholder="选择日期">
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
        <div class="table">

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
import {departmentSingleData} from '@/api/saleroomStatement'
import {departmentList} from '@/api/department'
import {initDate,downFile} from '@/utils'
export default {
    async created(){
        console.log(1)
        this.loading = true;
        this.request.queryDate = initDate()
        // let department = await departmentList()
        // this.resetList(department.data);
        this.getData()
    },
    data(){
        return{
            loading:false,
            
            info:{
                all:0,bpMoney:0,fpMoney:0
            },
            request:{
                limit:10,
                page:1,
               queryDate:""
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
             let url =`saleroomStatement/oddd?queryDate=${this.request.queryDate}`;
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

           
            let res = await departmentSingleData(this.request)
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
            this.total = res.total;
            this.tableData = res.data;
            this.loading = false;
            console.log(res,'22222222222')
          } catch (error) {
              
          }
        
        
        }
    }
}
</script>