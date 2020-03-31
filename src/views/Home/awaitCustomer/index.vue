<template>
  <div class="warp">
    <el-form inline class="form-inline" label-width='100px'>
        <el-form-item label="客户姓名" width='100%' >
           <el-input class="width280" v-model='search.name' placeholder='请输入客户姓名'></el-input>
        </el-form-item>
        <el-form-item label="广告负责人" >
            <el-select class="width280" v-model="search.adMan" placeholder="请选择广告负责人">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
       
        <el-form-item label="平台" >
           <el-select class="width280" v-model="search.platform" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" >
            <el-input class="width280" placeholder="请输入电子邮箱" v-model="search.email"></el-input>
        </el-form-item>
        <el-form-item label="项目">
           <el-select  class="width280" v-model="search.project" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="下次跟进时间" >
            <el-date-picker class="width280"
                v-model="search.nextFollowUpDate"
                type="date"
                value-format='yyyy-MM-DD'
                placeholder="选择日期">
                </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="是否成交">
           <el-select v-model="search.deal" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item> -->
        
        <el-form-item label="所属人员" > <!-- 经理 -->
           <el-select class="width280" v-model="search.personnel" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属部门" > <!-- 经理 -->
           <el-select class="width280" v-model="search.department" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="QQ号码" >
            <el-input class="width280" placeholder="请输入QQ号码" v-model="search.qq"></el-input>
        </el-form-item>
        <el-form-item label="所属省份">
               <el-select v-model="search.province" @change="provinceChange" placeholder="请选择所属省份">
                <el-option 
                v-for="(item,index) in province " :key="index" 
                :label="item.pname" 
                :value="item.pid">
                </el-option>
                
                </el-select>
            </el-form-item>
        <el-form-item label="所属城市">
           <el-select v-model="search.city" @change="cityChange" placeholder="请选择所属城市">
                <el-option 
                v-for="(item,index) in city " :key="index" 
                :label="item.cname" 
                :value="item.cid">
                </el-option>
                </el-select>
            </el-form-item>
         
            <el-form-item label="所属地区">
               <el-select v-model="search.district"  placeholder="请选择所属地区">
                <el-option 
                v-for="(item,index) in district " :key="index" 
                :label="item.dname" 
                :value="item.did">
                </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="关键词" >
            <el-input class="width280" placeholder="请输入关键词" v-model="search.keyword"></el-input>
        </el-form-item>
        <el-form-item label="获取时间" >
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            format='yyyy-MM-DD'
            @change='deteChange'
            value-format='yyyy-MM-DD'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
         
        
        
        <div class='center'>
            <el-button type="primary" icon="el-icon-seach">搜索</el-button>
        </div>
    </el-form>
    <div class='table'>
        <div class='button'>
            <el-button >导出</el-button>
        </div>
        <el-table
            :data="tableData"
            tooltip-effect="dark"
            @row-dblclick='rowDblclic'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column prop="name" label="客户姓名">
            </el-table-column>
            <el-table-column label="是否超期" prop='overdue'>
            
            </el-table-column>
            <el-table-column prop="address" label="处理状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="text">来访</el-button>
                   <el-button type="text" @click.native='rowDblclic(1,scope.row)'>详情</el-button>
                   <el-popconfirm
                    title="确定放弃该数据吗？"
                     @onConfirm='sueAbandoned(scope.row)'
                    @onCancel="canclAbandoned"
                    :value='ifAbandoned'
                    :tabindex='99'
                    >
                    <el-button  type="text" style='margin: 0 10px'  slot="reference">放弃</el-button>
                    </el-popconfirm>
                   
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- //详情 -->
    <el-dialog 
        :title="type == 1?'客户详情':'新增客户'"
        :visible.sync="detailFlag"
        width="80%"
        center
        :before-close="handleClose">
        
        <el-form inline class="form-inline" label-width='100px'>
            <el-form-item label="客户姓名" width='100%' >
           <el-input class="width280" v-model='detail.name' placeholder='请输入客户姓名' :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="广告负责人" >
            <el-select class="width280" v-model="detail.adMan" placeholder="请选择广告负责人" :disabled="type == 1?true:false">
            <el-option 
                v-for="item in userList"
                :key="item.id"
                :label="item.contactName"
                :value="item.id"
            ></el-option>
            
            </el-select>
        </el-form-item>
       
        <el-form-item label="平台" >
           <el-select class="width280" v-model="detail.platform" placeholder="请选择平台" :disabled="type == 1?true:false">
           <el-option 
                v-for="item in platform"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" >
            <el-input class="width280" placeholder="请输入电子邮箱" v-model="detail.email" :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="项目">
           <el-select  class="width280" v-model="detail.project" placeholder="请选择项目" :disabled="type == 1?true:false">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
           
            </el-select>
        </el-form-item>
        
        <el-form-item label="下次跟进时间" >
            <el-date-picker class="width280" :disabled="type == 1?true:false"
                v-model="detail.nextFollowUpDate"
                type="date"
                value-format='yyyy-MM-DD'
                placeholder="选择日期">
                </el-date-picker>
        </el-form-item>
        <el-form-item label="QQ号码" >
            <el-input class="width280" placeholder="请输入QQ号码" v-model="detail.qq" :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="所属省份">
               <el-select v-model="detail.province" @change="provinceChange" placeholder="请选择所属省份" :disabled="type == 1?true:false">
                    <el-option 
                    v-for="(item,index) in province " :key="index" 
                    :label="item.pname" 
                    :value="item.pid">
                    </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="所属城市">
           <el-select v-model="detail.city" @change="cityChange" placeholder="请选择所属城市" :disabled="type == 1?true:false">
                <el-option 
                v-for="(item,index) in city " :key="index" 
                :label="item.cname" 
                :value="item.cid">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属地区">
               <el-select v-model="detail.district"  placeholder="请选择所属地区" :disabled="type == 1?true:false">
                <el-option 
                v-for="(item,index) in district " :key="index" 
                :label="item.dname" 
                :value="item.did">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" >
                <el-input class="width280" placeholder="请输入详细地址" v-model="detail.address" :disabled="type == 1?true:false"></el-input>
            </el-form-item>
        </el-form>
        <div class="title space-between">
            <h1 style="font-width:600;font-size:32px">追踪记录</h1>
            <el-button  type="primary">新增跟进记录</el-button>
        </div>
        <div class="center">
            <el-form :inline="true"  class="form-inline">
            <el-form-item label="客户:">
                {{detail.customer}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
            <el-form-item label="电话号码:">
                {{detail.ipone}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
             <el-form-item label="地址:">
                {{detail.address}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
             <el-form-item label="微信:">
                {{detail.we}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
            </el-form>
        </div>
        <div class="center">
            <ul class="record">
                <li v-for="(item,index) in detail.record" :key="index">
                    <div :class="item.type == 1?'manager':''">
                        {{item.text}}
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class='center lMessage'>
                 <el-input
                 clearable
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    resize='none'
                    
                    v-model="message">
                </el-input>
                <el-button class='lMessageSure' type="text">确定</el-button>
            </div>
        
        

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="suerAdd()">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
import {updateCustomer,
    customerList,
    detailCustomer,
    deleteCustomer,} from '@/api/custormer'
import { 
    districtList,
    cityList,
    provinceList
} from '@/api/region'
import {projectList} from '@/api/project'
import {accountList} from '@/api/user'
import { dictApi ,idChangeStr} from "@/utils";
let customerInfo = {
        adMan:'',//广告负责人
                department:"",//所属部门
                platform:"",//逾期
                project:'',//项目
                qq:'',//有效
                getDateBegin:'',
                getDateEnd:"",
                personnel:"",//所属人员
                nextFollowUpDate:'',//下次跟进时间
                province:'',//省
                city:"",//市
                district:'',//区
                address:""
    }
export default {
  data() {
    return {
        time:"",
        detailFlag:false,
        addVisible:false,
        transferVisible:false,
        ifTransfer:true,
        transferInfo:{},
        ifAbandoned:false,
        detail:{
            customer:'入货',
            ipone:"1371111111",
            address:'地址',
            we:'微信',
            record:[
                {type:0,text:'销售员记录'},
                {type:1,text:'经理记录111111111111111111111111sasdfsd谁知道发送到发送到股份'},
            ]
        },
        message:'',
        customerInfo:{},
        type:0,
        search:{
            adMan:'',//广告负责人
            department:"",//所属部门
            platform:"",//逾期
            project:'',//项目
            qq:'',//有效
            getDateBegin:'',
            getDateEnd:"",
            personnel:"",//所属人员
            nextFollowUpDate:'',//下次跟进时间
            province:'',//省
            city:"",//市
            district:'',//区
            isSuccess:1,
            isValid:1,
            keyword:"",
        },
            tableData:[1],
            province:[],
            city:[],
            district:[],
            userList:[],
            platform:[],
            projectList:[]
        }
    
  },
  create(){

  },
   async mounted() {
    console.log(111)
    this.dist().then(()=>{
        this.customerList()
    })
  },
  watch:{
    //   search:{
    //     async handler(value) {
            
           
    //     },
    //     deep: true
    //   },
  },
  methods: {

    async dist(){
        let province = await provinceList();
        this.province = province.data;
        
       
        
        // debugger
        this.platform = await dictApi("platform");
        let userList = await accountList({roleId:8});
        this.userList = userList.data;
 let project = await projectList();
        this.projectList = project.data;
          console.log(this.projectList,21312)
      
    },

     async customerList(){//客户列表
        let res = await customerList(this.search)
        console.log(res,222222222222)
        this.tableData = res.data;
      },
    async provinceChange(value){
          if(value){
                this.search.city =''
                this.search.district = '';
                let city = await cityList({fid:value});
                this.city = city.data;
            }
      },
    async cityChange(value){
            if(value){
                // this.district = [];
                 this.search.district = '';
                let district = await districtList({fid:value.city});
                this.district = district.data;
            }
      },
    canclAbandoned(){//放弃
          this.ifAbandoned = false;
      },
      sueAbandoned(item){
          console.log(item)
      },
      canclTransfer(){//移交
          this.ifTransfer = false;
      },
      sueTransfer(item){
          console.log(item)
      },
      transfer(item){
          this.transferVisible =  true;
          this.transferInfo = item;
      },
      transferClose(){
          this.$confirm('确认关闭？')
          .then(_ => {
            this.transferVisible =  false;
          })
          .catch(_ => {});
      },
      addClose(){
          this.$confirm('确认关闭？')
          .then(_ => {
            this.addVisible =  false;
          })
          .catch(_ => {});
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.detailFlag =  false;
          })
          .catch(_ => {});
      },
      deteChange(value){
          if(value){
              this.search.getDateBegin = value[0];
              this.search.getDateEnd = value[1];
          }else{
              this.search.beginTime = '';
              this.search.endTime = '';
          }
      },
      handleChange(value){
          console.log(value)
      },
     async suerAdd(){
          try {
              this.$confirm(tips, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(async()=>{
               let res = await updateCustomer(this.detail);
                this.customerList()
                this.detailFlag =  false;
          })
         
        } catch (error) {
            
        }
        
      },
      addDetail(){
          this.type = 0;
           this.detail = {...customerInfo};
           this.detailFlag =  true;
           console.log(this.detail,this.detailFlag) 
      },
      rowDblclic(value,item){
          console.log(value)
        //   try {
               this.type = value;
                if(item){
                    this.detail = {...item};
                }
                this.detailFlag =  true;
        //         console.log(this.detail,this.detailFlag) 
        //   } catch (error) {
        //       console.log(error)
        //   }
         
      },
      handleSelectionChange(value){
          console.log(value)
      },
  }
};
</script>
<style lang='scss'>
    .lMessage{
         position:relative;
         padding-top:20px;
        .lMessageSure{
                position:absolute;
                right:0;
                bottom:0;
                padding:0 20px  10px 10px;
            }
        .el-textarea{
           
            
            .el-textarea__inner{
                padding-right: 60px;
            }
        }
        
    }
</style>

<style scoped="scoped" lang="scss">
    .width280{
        width: 200px;
    }
    .table{
        
        .button{
            padding:20px 0;
        }
    }
    .title{
        padding: 20px 0;
    }
    // .record{
    //     width: 100%;
    // }
    .manager{
        color: red;
    }
</style>
