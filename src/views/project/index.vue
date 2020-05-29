<template>
	<div class="warp"  v-loading='loading'>
     <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      </div>
      <div class="data space-between">
        <div class="table" style='flex:1'>
          
                    <el-table
                    :data="list"
                    fit
                  
                    align="center"
                    style="width: 100%">
                    <el-table-column  align="center" prop="name" label="项目名称">

                    </el-table-column>
                    <el-table-column
                    align="center"
                        prop="personnelName"
                        label="项目负责人"
                        >
                    </el-table-column>
                    
                    <el-table-column
                    align="center"
                        prop="createTime"
                        label="创建时间"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
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
                            <el-button type="primary" @click.stop="addPlatformFlag(scope.row)" size="mini">修改配置</el-button>
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
        </div>
  
        
      </div>
      <!-- 新增费用 -->
        <el-dialog
           
            :title="addItemInfo.id?'修改项目信息':'新增项目'"
            :visible.sync="costChange"
            width="700px"
            center
            :before-close="addClose">
              <div class="center">
                <el-form label-width="150px"  size='mini' ref="addItemInfo" >

                <el-form-item label="项目名:" prop="name">
                   <el-input  v-model="addItemInfo.name"  placeholder="请输入项目名" ></el-input>
               </el-form-item>
           </el-form> 
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 配置详情 -->
        <el-dialog
          
            :title="`${platformInfo.name}的配置详情`"
            :visible.sync="platformFlag"
            width="80%"
            center
            >
             <div class="btn">
                <el-button type="primary" @click="addPlatform()" icon="el-icon-edit">新增</el-button>
            </div>
            <el-table
                    :data="platformList"
                    fit
                    align="center"
                    style="width: 100%">
                     <el-table-column
                     align="center"
                        prop="platformStr"
                        label="项目平台"
                        >
                    </el-table-column>
                    <el-table-column
                     align="center"
                        prop="resourceTypeStr"
                        label="资源类别"
                        >
                    </el-table-column>
                    
                    <el-table-column
                    align="center"
                        prop="crmKey"
                        label="今日头条密钥"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
                        prop="crmToken"
                        label="今日头条Token"
                        >
                    </el-table-column>
                    <el-table-column
                    width="140"
                    align="center"
                        prop="isJoin53Str"
                        label="是否接入53客服系统"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
                        prop="join53Url"
                        label="53系统调用接口"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
                        prop="token53"
                        label="53系统接入token"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
                     width="140"

                        prop="url"
                        label="广点通接口调用地址"
                        >
                    </el-table-column>
                    
                    <el-table-column
                    align="center"
                        prop="createTime"
                        label="创建时间"
                        >
                    </el-table-column>
                    <el-table-column
                    align="center"
                        prop="createAuthorName"
                        label="创建人"
                        >
                    </el-table-column>
                    <el-table-column width="200" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addPlatform(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="deltePlatform(scope.row)" size="mini">删除</el-button>
                        </template> 
                    </el-table-column>
                    </el-table>
                    <el-pagination
                    style=" padding:20px;"
                    @current-change="platformPageChange"
                    :page-size="10"
                    :current-page='platformRequest.page'
                    layout="total, prev, pager, next"
                    :total="platformTotal">
                    </el-pagination>
              
              <span slot="footer" class="dialog-footer">
                <el-button @click="platformFlag = false">返 回</el-button>
                
            </span>
        </el-dialog>
        
        <!-- 新增配置 -->
        <el-dialog
           
            :title="addPlatformInfo.id?'修改平台配置信息':'新增平台配置信息'"
            :visible.sync="platformInfoChange"
            width="700px"
            center
            :before-close="addPlatformClose">
              <div class="center">
                <el-form label-width="150px" :rules="addItemInfoRule" :model="addPlatformInfo"  size='mini' ref="addPlatformInfo"  >
               <el-form-item label="项目负责人:" prop="personnel">
                  <el-select v-model="addPlatformInfo.personnel" placeholder="请选择">
                        <el-option 
                            v-for="item in userList"
                          :key="item.id"
                          :label="item.contactName"
                          :value="item.id"
                      >
                        </el-option>
                        
                      </el-select>
               </el-form-item>
                <el-form-item label="项目平台:" prop="platform">
                  <el-select v-model="addPlatformInfo.platform" placeholder="请选择">
                        <el-option 
                        v-for="item in platform"
                          :key="Number(item.key)"
                          :label="item.value"
                          :value="Number(item.key)"
                      >
                        </el-option>
                        
                      </el-select>
               </el-form-item> 
               <el-form-item label="资源类别:" prop="resourceType">
                  <el-select v-model="addPlatformInfo.resourceType" placeholder="请选择">
                        <el-option 
                        v-for="item in resourceType"
                          :key="Number(item.key)"
                          :label="item.value"
                          :value="Number(item.key)"
                      >
                        </el-option>
                        
                      </el-select>
               </el-form-item> 
                <el-form-item label="备注:" prop="remark">
                   <el-input placeholder="请输入备注"  v-model="addPlatformInfo.remark"></el-input>
               </el-form-item>
                <el-form-item label="密钥:" v-show="addPlatformInfo.platform == 1"  prop="crmKey">
                   <el-input placeholder="请输入密钥"  v-model="addPlatformInfo.crmKey"></el-input>
               </el-form-item>
                <el-form-item label="Token:"  v-show="addPlatformInfo.platform == 1"   prop="crmToken">
                   <el-input placeholder="请输入Token"  v-model="addPlatformInfo.crmToken"></el-input>
               </el-form-item>
               <el-form-item label="是否接入53客服系统:">
                    <el-radio-group v-model="addPlatformInfo.isJoin53">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
               </el-form-item>
                 
           </el-form> 
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addPlatformClose">取 消</el-button>
                <el-button type="primary" @click="addPlatformSure">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
import {updataProject,
    deleteProject,
    projectList,updataPlatform,
    deletePlatform,
    platformList} from '@/api/project'
    import {accountList} from '@/api/user'
import { dictApi ,idChangeStr} from "@/utils";
let addItemInfo = {
 name:''
//  ,personnel:'',platform:'',remark:'',crmToken:'',crmKey:'',isJoin53:1,resourceType:'0'
}
let addPlatformInfo = {
 personnel:'',platform:'',remark:'',crmToken:'',crmKey:'',isJoin53:1,resourceType:0
}

  export default {
    async created(){
      this.loading = true;
      await this.dict()
      await this.getList(this.search)
    },
    methods: {
      deltePlatform(item){
        console.log(item)
          let tips = '是否确认删除项目配置';
            let success = '删除项目配置成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deletePlatform({id:item.id})
                        this.addPlatformFlag(this.platformInfo)
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
      addPlatformSure(){
        let tips = this.addPlatformInfo.id?'是否确认修改项目配置?':'是否确认新增项目配置?';
            let success = this.addPlatformInfo.id?'修改项目配置成功':'新增项目配置成功';
            console.log(this.addItemInfo.personnel !='',this.addItemInfo.platform !='')
             this.$refs['addPlatformInfo'].validate((valid) => {
          if (valid) {
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await updataPlatform(this.addPlatformInfo);
                        this.addPlatformInfo = {}
                        this.addPlatformFlag(this.platformInfo)
                         this.$message.success(success);
                         this.platformInfoChange = false;
                    } catch (error) {
                        console.log(error)
                    }
                    
                
                }).catch(() => {
                
                });
          } else {
           
            return false;
          }
        });
     
                
      },
      addPlatform(item){
         console.log(item)
          if(item){     
            let {personnel,platform,remark,id,crmKey,crmToken,isJoin53,resourceType} = {...item}
            this.addPlatformInfo =  {personnel,platform,remark,id,crmKey,crmToken,isJoin53,project:this.platformRequest.project,resourceType};
          }else{
            this.addPlatformInfo = {...addPlatformInfo,project:this.platformRequest.project}
          }
          this.platformInfoChange = true;
      },
     async addPlatformFlag(item){
        try {
          this.platformRequest.project = item.id;
          console.log(this.platformRequest)
          let res = await platformList(this.platformRequest)
          this.platformInfo = {...item};
          res.data.map(item =>{
          item.platformStr = idChangeStr(this.platform,item.platform);
          item.resourceTypeStr = idChangeStr(this.resourceType,item.resourceType);
          item.url = item.url?item.url:'--';
          item.isJoin53Str = item.isJoin53 == 0?"否":"是";
          item.join53Url = item.join53Url?item.join53Url:'--';
          item.token53 = item.token53?item.token53:'--'
          item.crmKey = item.crmKey?item.crmKey:'--';
          item.crmToken = item.crmToken?item.crmToken:'--';
      })
          this.platformTotal = res.total;
          this.platformList = res.data;
          this.platformFlag = true;
        } catch (error) {
          
        }
      },
      platformPageChange(val){
        this.platformRequest.page = val;

        this.addPlatformFlag(this.platformInfo)
      },
       handleCurrentChange(val) {
        this.search.page = val;
       this.getList(this.search)
        console.log(`当前页: ${val}`);
      },
    async  dict(){
      this.platform = await dictApi("platform");
      this.resourceType= await dictApi('resourceType');
      let userList = await accountList({roleId:8});
      this.userList = userList.data;
      console.log(this.platform)
      },
      checkCrmKey(rule, value, callback){
        console.log(value,11111,this.addItemInfo.platform == 1)
        if(this.addItemInfo.platform ==1){
          if (!value) {
              return callback(new Error('秘钥不能为空'));
            }else{
            callback();
          }
        }else{
           callback();
        }
        
      },
      checkCrmToken(rule, value, callback){
         console.log(value,11111,this.addItemInfo.platform == 1)
       if(this.addItemInfo.platform ==1){
          if (!value) {
              return callback(new Error('Token不能为空'));
            }else{
            callback();
          }
        }else{
           callback();
        }
      },
      
      addPlatformClose(){
         this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.platformInfoChange = false;
        }).catch(() => {
                
        });
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
                     if(this.addItemInfo.name){
                       
                       
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await updataProject(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList(this.search)
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
                        
                            this.getList(this.search)
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
        async addItem(item){
          if(item){
            // console.log(item)
           
           let {name,personnel,platform,remark,id,crmKey,crmToken,isJoin53} = {...item}
           
            this.addItemInfo = {name,id} 
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.costChange =true;
        },
    async getList(obj){
       this.loading = true;
      let res = await projectList(obj);
      
      this.total =res.total;
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
        search:{
          page:1,
          size:10
        },
        list:[],
        platform:[],
        userList:[],
        total:0,
        addItemInfoRule:{
          personnel:[
              { required: true, message: '请选择项目负责人', trigger: 'blur' },
          ],
          platform:[
              { required: true, message: '请输入项目平台', trigger: 'blur' },
          ],
          crmKey:[
              { validator: this.checkCrmKey, trigger: 'blur' }
          ],
          crmToken:[
            { validator: this.checkCrmToken, trigger: 'blur' }
              
          ],
          resourceType:[
            { required: true, message: '请输入资源类别', trigger: 'blur' },
          ]
        },
        resourceType:[],
        platformList:[],
        platformFlag:false,
        platformTotal:0,
        platformRequest:{
          project:null,
          page:1,
          size:10
        },
        platformInfo:{},
        addPlatformInfo:{},
        platformInfoChange:false,
      };
    },
   
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 400px;
    }
    .table-son{
      width: 800px;
      flex: 1;
    }
</style>