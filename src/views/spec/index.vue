<template>
	<div class="warp" v-loading='loading'>
      <div class="btn center">
        <div>
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
        </div>
          
          <div style="flex:1;" class="center">
            <div class='title' type="primary">{{specInfo.jobName}}</div>
            <el-button @click="sever" :type="specInfo.status == 1?'info':'success'" round>{{specInfo.status == 1?'暂停':"启动"}}</el-button>
          </div>
            
          
      </div>
         <el-table
                    :data="list"
                    fit
                    align="center"
                    style="width: 100%">
                    <el-table-column
                      center
                        prop="needMessage"
                        label="信息流需求数"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="haveMessage"
                        label="已分配信息流需求数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="needSearch"
                        label="配搜索流需求数"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="haveSearch"
                        label="已分配搜索流需求数"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        prop="projectName"
                        label="所属项目"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="saleName"
                        label="销售员"
                        >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="300px"
                        >
                        <!-- <template slot="header" slot-scope="scope">
                            <el-input
                                size="mini"
                                v-model="searchRoleValue"
                                @input="searchRole"
                                placeholder="输入关键字搜索">
                            </el-input>
                        </template> -->
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                           
                        </template>
                        
                    </el-table-column>
                    </el-table>
                    <el-pagination
                    style=" padding:20px;"
                        @current-change="handleCurrentChange"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total">
                    </el-pagination>
                        <!-- 菜单 -->
    <el-dialog
       width="50%"
        center
      :visible.sync="addSpec"
      :before-close="closeEdit"
    >
    <div class="center">
      <el-form label-width="100px" size="mini" :model="addSpecInfo" :rules='rules'>
          <el-form-item label="信息流需求数:">
              <el-input  v-model="addSpecInfo.needMessage"></el-input>
          </el-form-item>
          <el-form-item label="搜索流需求数:">
              <el-input  v-model="addSpecInfo.needSearch"></el-input>
          </el-form-item>
          <el-form-item label="所属项目:">
              <el-select  v-model="addSpecInfo.project" placeholder="请选择所属项目">
                <el-option 
                    v-for="item in projectArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="销售员:">
              <el-select  v-model="addSpecInfo.saleId" placeholder="请选择销售员">
                <el-option 
                    v-for="item in saleArr"
                    :key="item.id"
                    :label="item.contactName"
                    :value="item.id"
                    ></el-option>
                </el-select>
          </el-form-item>     
      </el-form>
    </div>
      
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="addSure(0)">确 定</el-button>
            </span>

    </el-dialog>




    <!-- 菜单 -->
    <el-dialog
       width="50%"
        center
      :visible.sync="select"
      :before-close="closeSelect"
    >
    <div>
      <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      <el-table
                    :data="selectList"
                    fit
                    align="center"
                    style="width: 100%">
                    <el-table-column
                      center
                        prop="needMessage"
                        label="信息流需求数"
                        >
                         <template slot-scope="scope">
                             <el-input placeholder="请输入信息流需求数" v-model="scope.row.needMessage"></el-input>
                        </template>
                    </el-table-column>
                     
                    <el-table-column
                        prop="needSearch"
                        label="配搜索流需求数"
                        >
                         <template slot-scope="scope">
                           <el-input placeholder="请输入搜索流需求数" v-model="scope.row.needSearch"></el-input>
                             
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="projectName"
                        label="所属项目"
                        >
                         <template slot-scope="scope">
                           <el-select  v-model="scope.row.project" placeholder="请选择广告负责人">
                            <el-option 
                                v-for="item in projectArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                ></el-option>
                            </el-select> 
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="saleId"
                        label="销售员"
                        >
                         <template slot-scope="scope">
                           <el-select  v-model="scope.row.saleId" placeholder="请选择销售员">
                            <el-option 
                                v-for="item in saleArr"
                                :key="item.id"
                                :label="item.contactName"
                                :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column> 
                    <el-table-column                      
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button type="danger" @click.stop="delteSelect(scope.$index)" size="mini">删除</el-button> 
                        </template>
                        
                    </el-table-column>
                    </el-table>        
    </div>
      
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeSelect">取 消</el-button>
                <el-button type="primary" @click="addSure(1)">确 定</el-button>
            </span>

    </el-dialog>
	</div>
</template>

<script>
  import {
   specList,
    deleteSpec,
    updataSpec,
    stopSever,
    startSever,
    specInfo,
    selectUpdata
} from '@/api/spec'
import {accountList} from '@/api/user'
import {projectList} from '@/api/project'

  export default {
   async created(){
     await this.spec()
    await this.projectList()  
     await this.saleList() 
    await  this.specList()
   
    
    },
    methods: {
      async saleList(){
        let res = await accountList({roleId:7});
        console.log(res)
        this.saleArr = res.data;
      },
      async sever(){
        let tips = null;
        try {
          if(this.specInfo.status == 1){//停止
        let res=  await stopSever(this.specInfo.id)
          tips = res.returnMsg
        }else{
         let res =  await startSever(this.specInfo.id);
          tips = res.returnMsg
        }
        this.spec()
        this.specList()

        this.$message.success(tips)
        } catch (error) {
          
        }
        
      },
      async spec(){
        let res = await specInfo();
        console.log(res)
        this.specInfo =res.data;
      },
       async projectList(){
           let obj = {
               page:1,
               limit:10,
           }
           let res = await projectList(obj)
            this.projectArr = res.data;
       },

      async specList(){
        try {
          this.loading = true;
          let res = await specList(this.search);
          this.list = res.data;
          this.total = res.total
        } catch (error) {
          console.log(error)
        }
        this.loading = false;
      },
      check(data){
        console.log(data)
        this.specInfo ={...data}
        this.showAddButton = true;
        console.log(this.specInfo)
      },
      delteSelect(index){
        this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   this.selectList.splice(index,1);
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
       
      },
      closeSelect(){
         this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                          this.select = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      closeEdit(){
        this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.addSpec = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      addSure(type){
        if(type == 0){
          let tip = this.addSpecInfo.id?"是否确认修改销售配置?":'是否确认添加销售配置?';
        this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                 
                  let res=  await updataSpec(this.addSpecInfo)
                  this.$message.success(res.returnMsg)
                  this.specList()
                  this.addSpec = false;
                  
                }).catch((e) => {
                
                       
            });
        }else{
          let tip = this.addSpecInfo.id?"是否确认修改销售配置?":'是否确认添加销售配置?';
          this.$confirm(tip, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(async () => {
                  
                    let res=  await selectUpdata({list:this.selectList})
                    this.$message.success(res.returnMsg)
                    this.specList()
                    this.select = false;
                    
                  }).catch((e) => {
                  
                        
              });
        }
        
      },
      addItem(item){
        if(item){//修改
          this.addSpecInfo = {...item};
          this.addSpec = true;
        }else{//新增
         
          let saleSpecInfo = {
            needMessage:0,
            needSearch:0,
            project:'',
            saleId:""
          }
           console.log(saleSpecInfo)
          this.selectList.push(saleSpecInfo);
          this.select = true;
        };
        

      },

      searchDic(value){

      },
      showParent(item){

      },
      handleCurrentChange(val) {
        this.search.page = val;
       this.specList()
        console.log(`当前页: ${val}`);
      },
      delteItem(){
        this.$confirm('是否确认删除页面?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                   let res=  await deleteMenu({id:this.muneInfo.id})
                  this.$message.success(res.returnMsg)
                  this.specList()
                  
                }).catch((e) => {
                
                       
            });
        
      }
    },
    data() {
      return {
        list:[],
        projectArr:[],
        addSpec:false,
        searchDicValue:'',
        addSpecInfo:{},
        loading:false,
        specInfo:{ },
        saleArr:[],
        rules:{
          needMessage:[{ required: true, message: '请输入信息流需求数', trigger:['blur','change'] }],
          needSearch:[{ required: true, message: '请输入搜索流需求数', trigger:['blur','change'] }],
          project:[{ required: true, message: '请选择所属项目', trigger:['blur','change'] }],
          saleId:[{ required: true, message: '请选择销售员', trigger:['blur','change'] }],
        },
        selectList:[],
        select:false,
        search:{
          limit:10,
          page:1
        },
        total:0

      };
    }
  };
</script>

<style lang="scss" scoped>
    .btn{
        text-align: left;
        .title{
          width: 200px;
          height: 100px;
          text-align: center;
          line-height: 100px;
          font-size: 26px;
        }
    }
    .data{
       padding-top:20px; 
    }
</style>
