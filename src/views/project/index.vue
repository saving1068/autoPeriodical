<template>
	<div class="warp"  v-loading='loading'>
     <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      </div>
      <div class="data space-between">
        <div class="table">
          <!-- <el-scrollbar > -->
                    <el-table
                    :data="list"
                    fit
                   
                    align="center"
                    style="width: 100%">
                    <el-table-column prop="name" label="项目名称">

                    </el-table-column>
                    <el-table-column
                        prop="personnelName"
                        label="项目负责人"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="platformStr"
                        label="项目平台"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="url"
                        label="接口调用地址"
                        >
                    </el-table-column>
                    
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
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
                        <template slot="header" slot-scope="scope">
                            <el-input
                                size="mini"
                                v-model="searchRoleValue"
                                @input="searchRole"
                                placeholder="输入名称搜索">
                            </el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
                    </el-table>
                 <!-- </el-scrollbar> -->
        </div>
        <!-- <div class="tree" v-show="sonShow">
          <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
        </div> -->
        
      </div>
      <!-- 新增费用 -->
        <el-dialog
           
            :title="addItemInfo.id?'修改项目信息':'新增项目'"
            :visible.sync="costChange"
            width="500px"
            center
            :before-close="addClose">
              <div class="center">
                <el-form label-width="100px"  size='mini'>

                <el-form-item label="项目名:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
               <el-form-item label="项目负责人:">
                  <el-select v-model="addItemInfo.personnel" placeholder="请选择">
                        <el-option 
                            v-for="item in userList"
                          :key="item.id"
                          :label="item.contactName"
                          :value="item.id"
                      >
                        </el-option>
                        
                      </el-select>
               </el-form-item>
                <el-form-item label="项目平台:">
                  <el-select v-model="addItemInfo.platform" placeholder="请选择">
                        <el-option 
                        v-for="item in platform"
                          :key="Number(item.key)"
                          :label="item.value"
                          :value="Number(item.key)"
                      >
                        </el-option>
                        
                      </el-select>
               </el-form-item>
                <el-form-item label="备注:">
                   <el-input placeholder="请输入备注"  v-model="addItemInfo.remark"></el-input>
               </el-form-item>
               <el-form-item label="接口调用地址:">
                   <el-input placeholder="请输入接口调用地址"  v-model="addItemInfo.url"></el-input>
               </el-form-item>
                 
           </el-form> 
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
import {updataProject,
    deleteProject,
    projectList,} from '@/api/project'
    import {accountList} from '@/api/user'
import { dictApi ,idChangeStr} from "@/utils";
let addItemInfo = {
 name:'',personnel:'',platform:'',remark:''
}
  export default {
    async created(){
      await this.dict()
      await this.getList({})
    },
    methods: {
    async  dict(){
      this.platform = await dictApi("platform");
      let userList = await accountList({roleId:7});
      this.userList = userList.data;
      console.log(this.platform)
      },
      addClose(){
        this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.costChange = false;
        }).catch(() => {
                
        });
      },
      addSure(){
        let tips = this.addItemInfo.id?'是否确认修改项目?':'是否确认新增项目?';
            let success = this.addItemInfo.id?'修改项目成功':'新增项目成功';
            console.log(this.addItemInfo.personnel !='',this.addItemInfo.platform !='')
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                      //  console.log(this.addItemInfo)
                     if(this.addItemInfo.name
                     &&String(this.addItemInfo.personnel)
                     &&String(this.addItemInfo.platform)
                     ){
                       
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await updataProject(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.costChange = false;
                       
                     }else{
                       return this.$message.warning('请填写所有信息')
                     }
                    
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                
                }).catch(() => {
                
                });
      },
      async searchRole(value){
        try {
           let obj ={
                name:value,
                page:1
                // sign:value
            }
            this.getList(obj)
        } catch (error) {
          
        }
       
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除项目';
            let success = '删除项目成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteProject({id:item.id})
                        
                            this.getList({})
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
        async addItem(item){
          if(item){
            // console.log(item)
           
           let {name,personnel,platform,remark,id} = {...item}
           
            this.addItemInfo = {name,personnel,platform,remark,id} 
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.costChange =true;
        },
    async getList(obj){
       this.loading = true;
      let res = await projectList(obj);
      res.data.map(item =>{
          item.platformStr = idChangeStr(this.platform,item.platform);
          item.url = item.url?item.url:'--'
      })
      this.list = res.data;
       this.loading = false;
      },
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        costChange:false,
        addItemInfo:{
        },
        list:[],
        platform:[],
        userList:[]
      };
    },
   
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 800px;
        flex: 1;
    }
</style>