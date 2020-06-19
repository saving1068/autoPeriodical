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
            <el-select clearable v-model="request.adMan"  style="padding:0 20px;" placeholder="请选择广告负责人">
                <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.contactName"
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
                    prop="disDate"
                    label="日期"
                    >
                </el-table-column>
                <el-table-column
                align='center'
                    prop="adManName"
                    label="广告负责人"
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
import {extensionData} from '@/api/customerStatement'
    import {accountList} from '@/api/user'
import {initDate,downFile} from '@/utils'
export default {
    async created(){
        this.loading = true;
        this.date = initDate();
        this.request.queryDateBegin = initDate()
        this.request.queryDateEnd = initDate()
        let userList = await accountList({roleId:8});
        this.userList = userList.data;
        console.log(1)
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
                adMan:""
            },
            userList:[],
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
             let url =`http://wearewwx.com:8001/customerStatement/ppdodb?queryDateBegin=${this.request.queryDateBegin}&&queryDateEnd=${this.request.queryDateEnd}&&adMan=${this.request.adMan}`;
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
              
             let all = 0;
            let validAll = 0;
            let res = await extensionData(this.request)
            res.data.map(item =>{
                item.valid =(Number(item.validTotal)/Number(item.total)*100).toFixed(2)+"(%)"
                all+=Number(item.total);
                validAll+=Number(item.validTotal);
            })
            let percentage =!isNaN((validAll/all).toFixed(2))?(validAll/all).toFixed(2)+"(%)":'0(%)';
            this.info = {
                all,validAll,percentage
            }
            this.total =res.total;
            this.tableData = res.data;
            this.loading = false;
            console.log(res,'22222222222')
          } catch (error) {
              
          }
        
        
        }
    }
}
</script>