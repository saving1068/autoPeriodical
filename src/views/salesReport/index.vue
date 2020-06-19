<template>
    <div class="warp" v-loading='loading'>
        <div class="report">
            <div class="reportItem" :class="item.isL?'reportL':''" v-for="(item,index) in report"  :key='index'>
                <div class="content">
                    <div>{{item.name}}</div>
                    <div class="deta" >
                        <el-date-picker 
                            v-if="item.showDate"
                            v-model="item.date"
                            :value-format='item.format'
                            type='month'
                            :format='item.format'
                            placeholder="选择日期">
                        </el-date-picker>
                      
                         <el-date-picker 
                            v-else
                            v-model="item.date"
                            :value-format='item.format'
                            type='date'
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="deta" v-if="item.type == 2" >
                        <el-select clearable v-model="item.platform " placeholder="请选择平台">
                            <el-option
                            v-for="item in platform"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="deta" v-if="item.type == 1">
                      <el-select clearable v-model="item.dpId"  placeholder="请选择部门">
                            <el-option
                            v-for="item in departmentList"
                :key="item.id"
                :label="item.description"
                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                     <div class="deta"  v-if="item.type == 7">
                      <el-select clearable v-model="item.adMan " placeholder="请选择广告负责人">
                            <el-option
                             v-for="item in userList"
                            :key="item.id"
                            :label="item.contactName"
                            :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                     <div class="deta"  v-if="item.type == 8" >
                      <el-select clearable v-model="item.saleId" placeholder="请选择销售员">
                            <el-option 
                                v-for="item in saleList"
                                :key="item.id"
                                :label="item.contactName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    
                    
                    <div>
                        <el-button type="primary" @click="exportRepot(item)">导出报表</el-button>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
    import {departmentList} from '@/api/department'
    import {projectList} from '@/api/project'
    import {accountList} from '@/api/user'
    import { dictApi ,filterButton,initDate,downFile} from "@/utils";

    export default {
        created(){
         this.dist()
            
        },

        data(){
            return {
                loading:false,
                 userList:[],//广告人
                saleList:[],//销售
                platform:[],//平台
                projectList:[],//项目
                departmentList:[],//部门
                report:[
                    {name:'分日总数据',isL:true,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:0,showDate:true,format:'yyyy-MM'},
                    {name:'分日部门数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:1,showDate:true,format:'yyyy-MM'},
                    {name:'分日平台数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:2,showDate:true,format:'yyyy-MM'},
                    {name:'单日推广个人数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:3,showDate:false,format:'yyyy-MM-dd'},
                    {name:'单日销售个人数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:4,showDate:false,format:'yyyy-MM-dd'},
                    {name:'单日部门数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:5,showDate:false,format:'yyyy-MM-dd'},
                    {name:'单日平台数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:6,showDate:false,format:'yyyy-MM-dd'},
                    {name:'分日推广个人数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:7,showDate:true,format:'yyyy-MM'},
                    {name:'分日销售个人数据',isL:false,date:'',saleId:"",adMan:'',platform:'',dpId:"",type:8,showDate:true,format:'yyyy-MM'},
                    
                ]
            }
        },
        methods:{
            exportRepot(item){
                let url ='http://wearewwx.com:8001';
                console.log(url)
               switch(item.type){
                case 0:
                    

                    url += `/saleroomStatement/dad?date=${item.date}`
                    downFile(url)
                //TODO
                break;
                case 1:
                    if(!item.dpId){
                       return this.$message.warning("请选择部门")
                    }
                     url += `/saleroomStatement/dbddd?date=${item.date}&&dpId=${item.dpId}`
                    downFile(url)
                //TODO
                break;
                 case 2:
                      if(!item.platform){
                       return this.$message.warning("请选择平台")
                    }
                      url += `/saleroomStatement/dpd?date=${item.date}&&platform=${item.platform}`
                    downFile(url)
                //TODO
                break;
                 case 3:
                     
                     url += `/saleroomStatement/dpopd?date=${item.date}`
                    downFile(url)
                //TODO
                break;
                 case 4:
                     url += `/saleroomStatement/dsopd?date=${item.date}`
                    downFile(url)
                //TODO
                break;
                 case 5:
                      url += `/saleroomStatement/oddd?date=${item.date}`
                    downFile(url)
                //TODO
                break;
                 case 6:
                      url += `/saleroomStatement/odpd?date=${item.date}`
                    downFile(url)
                //TODO
                break;
                 case 7:
                     if(!item.adMan){
                       return this.$message.warning("请选择广告负责人")
                    }
                       url += `/saleroomStatement/ppdodb?date=${item.date}&&adMan=${item.adMan}`
                    downFile(url)
                     
                //TODO
                break;
                 case 8:
                     if(!item.saleId){
                       return this.$message.warning("请选择销售员")
                    }
                        url += `/saleroomStatement/spdbd?date=${item.date}&&saleId=${item.saleId}`
                    downFile(url)
                //TODO
                break;
               
                default:
                //TODO
            }
            },
            async dist(){
         
         this.loading= true;

        this.platform = await dictApi("platform");
        this.currentType = await dictApi('currentType');
        let userList = await accountList({roleId:8});
        this.userList = userList.data;
        let saleList = await accountList({roleId:7});
        this.saleList = saleList.data;
        let project = await projectList();
        this.projectList = project.data;
        let department = await departmentList();
        this.resetList(department.data);
        this.report.map(item =>{
           
            item.date = initDate(item.showDate?item:'')
           
        })
        this.loading= false;
        // debugger
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
        }
        
    }
</script>

<style lang="scss" scoped>
    .report{
        display: grid;
        grid-template-columns: 200px 200px 200px 200px;
        grid-template-rows: 200px 200px 200px ;
        justify-content:center;
        align-content:center;
        grid-auto-flow: row dense;
        grid-row-gap: 20px;
  grid-column-gap: 20px;
        .reportL{
            grid-column-start: 1;
            grid-column-end: 3;  
            grid-row-start: 1;
            grid-row-end:3;
        }
        .reportItem{
            // width: 100px;
            // height: 100px;
            // background: coral;
            display: flex;
            align-items: center;
            justify-content: center;
             text-align: center;
             border: 1px solid #e5e4e9;
             .content{
                 div{
                     padding: 4px 0;
                     
                 }
                 .deta{
                     width: 80%;
                     margin: 0 auto;
                     
                 }
             }
             .el-input{
                         width: auto;
                     }
        }
    }

</style>
