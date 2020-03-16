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
                    @row-click='showParent'
                    align="center"
                    style="width: 100%">
                    <el-table-column
                        prop="account"
                        label="账号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="contactName"
                        label="联系人"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="contactPhone"
                        label="手机号码"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="roleList"
                        label="角色"
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
                                placeholder="输入关键字搜索">
                            </el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                            <el-button type="warning" @click.stop="reset(scope.row)" size="mini">重置密码</el-button>
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
      <!-- 新增用户 -->
        <el-dialog
           
            title="新增用户"
            :visible.sync="userChange"
            width="50%"
            center
            :before-close="addClose">
              <div class="space-between">
                <el-form label-width="80px"  size='mini'>
               <el-form-item label="账号:">
                   <el-input  v-model="addItemInfo.account"></el-input>
               </el-form-item>
               <el-form-item label="密码:" v-if="addItemInfo.id">
                    <el-checkbox v-model="addItemInfo.ifChangePassword">是否修改密码</el-checkbox>
                   <el-input :disabled='!addItemInfo.ifChangePassword'  v-model="addItemInfo.password"></el-input>
               </el-form-item>
               <el-form-item label="密码:" v-else>
                   <el-input  v-model="addItemInfo.password"></el-input>
               </el-form-item>
               <el-form-item label="联系人:">
                   <el-input  v-model="addItemInfo.contactName"></el-input>
               </el-form-item>
                <el-form-item label="手机号码:">
                   <el-input  v-model="addItemInfo.contactPhone"></el-input>
               </el-form-item>
                 
           </el-form>
           <div>
              <div>角色</div>
                <el-tree
                    :data="initroleList"
                    show-checkbox
                    default-expand-all
                    node-key="roleId"
                    ref="tree"
                    :default-checked-keys='itemPowerList'
                    highlight-current
                    :props="defaultProps">
                </el-tree>
              </div>
               
            
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
		<!-- <el-tree
  :data="data"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="resetChecked">清空</el-button>
</div> -->
	</div>
</template>

<script>
import {
   accountUpdate,resetUser,accountDetail,accountList,delteAccount
} from '@/api/user'
import {
  roleList
} from '@/api/role'
let addItemInfo = {
  account:'',contactName:'',contactPhone:'',
  roles:[],password:'',ifChangePassword:true,
}
  export default {
    async created(){
      this.loading = true;
     await this.getList()
     await this.roleList()
      this.loading = false;
    },
    methods: {
      addClose(){
        this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userChange = false;
        }).catch(() => {
                
        });
      },
      
      addSure(){
        let tips = this.addItemInfo.id?'是否确认修改用户?':'是否确认新增用户?';
            let success = this.addItemInfo.id?'修改用户成功':'新增用户成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                      console.log(this.$refs.tree.getCheckedNodes())
                      this.addItemInfo.roles = [];
                      this.$refs.tree.getCheckedNodes().forEach(item =>{
                          console.log(item)
                           this.addItemInfo.roles.push(item.roleId)
                      })
                     
                      //  console.log(this.addItemInfo)
                     if(this.addItemInfo.roles.length != 0&&this.addItemInfo.account
                     &&this.addItemInfo.contactName
                     &&this.addItemInfo.contactPhone
                     ){
                       if(this.addItemInfo.id){
                          if(this.addItemInfo.ifChangePassword){
                            if(!this.addItemInfo.password){
                              return this.$message.warning('请为该用户填写密码')
                            }
                       }
                       }else{
                         if(!this.addItemInfo.password){
                              return this.$message.warning('请为该用户填写密码')
                            }
                       }
                      
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await accountUpdate(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.userChange = false;
                       
                     }else{
                       return this.$message.warning('请为该用户填写所有信息')
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
                keyWord:value
                // sign:value
            }
            this.getList(obj)
        } catch (error) {
          
        }
       
      },
      reset(item){
        let tips = '是否确认重置用户密码';
            let success = '重置用户密码成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await resetUser({id:item.id})
                        
                        this.getList({})
                        this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除用户';
            let success = '删除用户成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await delteAccount({id:item.id})
                        
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
           let res =  await accountDetail({id:item.id})
           console.log(res)
           let roles = [];
           res.data.roles.forEach(item =>{
             roles.push(item.roleId)
           })

            this.itemPowerList = roles;
            console.log(this.itemPowerList)
           
            this.addItemInfo = {...res.data,ifChangePassword:false}
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.userChange =true;
        },
        showParent(){

        },
    async getList(obj){
      let res = await accountList(obj);
      res.data.map(item =>{
        item.roleList = '';
      })

      this.list = res.data;
       
      this.list.map(item =>{
        let roleList =[];
       item.roles.map(roleItem =>{
         roleList.push(roleItem.name);
        //  console.log(roleItem,'roleItem')
       })
         item.roleList = roleList.length >0? roleList.join(','):'';
      })
      
      console.log(this.list,221);
      },
    async roleList(){
      let res = await roleList()
      this.initroleList = res.data;
      console.log(res,22222);
    },







      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        sonShow:false,
        userChange:false,
        addItemInfo:{
          ifChangePassword:false
        },
        list:[],
        initroleList:[],
        treeData:[],
        itemPowerList:[],
        defaultProps: {
          // children: 'children',
          label:"description"
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 800px;
    }
</style>