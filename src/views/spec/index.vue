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
                        prop="createAuthorName"
                        label="创建人"
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




    <!-- 菜单 -->
    <el-dialog
       width="50%"
        center
      :visible.sync="addSpec"
      :before-close="closeEdit"
    >
    <div class="center">
      
      <el-form label-width="100px" size="mini">
          <el-form-item label="信息流需求数:">
              <el-input  v-model="addSpecInfo.needMessage"></el-input>
          </el-form-item>
          <el-form-item label="搜索流需求数:">
              <el-input  v-model="addSpecInfo.needSearch"></el-input>
          </el-form-item>
          <el-form-item label="所属项目:">
              <el-select  v-model="addSpecInfo.project" placeholder="请选择广告负责人">
                <el-option 
                    v-for="item in projectArr"
                    :key="item.id"
                    :label="item.name"
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
	</div>
</template>

<script>
  import {
   specList,
    deleteSpec,
    updataSpec,
    stopSever,
    startSever,
    specInfo
} from '@/api/spec'
import {projectList} from '@/api/project'
let saleSpecInfo = {
  needMessage:'',
  needSearch:'',
  project:''
}
  export default {
   async created(){
    await this.projectList()   
    await  this.specList({})
    await this.spec()
    },
    methods: {
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
               size:10,
           }
           let res = await projectList(obj)
            this.projectArr = res.data;
       },

      async specList(obj){
        try {
          this.loading = true;
          let res = await specList(obj);
          this.list = res.data;
       
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
        let tip = this.addSpecInfo.id?"是否确认修改销售配置?":'是否确认添加销售配置?';
        this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                 
                  let res=  await updataSpec(this.addSpecInfo)
                  this.$message.success(res.returnMsg)
                  this.specList({})
                  this.addSpec = false;
                  
                }).catch((e) => {
                
                       
            });
      },
      addItem(item){
        if(item){//修改
          this.addSpecInfo = {...item};
        }else{//新增
          this.addSpecInfo = {...specInfo};
        };
        this.addSpec = true;

      },

      searchDic(value){

      },
      showParent(item){

      },
      delteItem(){
        this.$confirm('是否确认删除页面?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                   let res=  await deleteMenu({id:this.muneInfo.id})
                  this.$message.success(res.returnMsg)
                  this.specList({})
                  
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
        specInfo:{ }
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
