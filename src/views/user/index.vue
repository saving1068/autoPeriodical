<template>
	<div class="warp"  v-loading='loading'>
     <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
          <el-select style="padding:0 20px;" clearable v-model="search.roleId" @change="serchRole" placeholder="请选择角色">
           <el-option 
                v-for="item in roleListSelect"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId"
            ></el-option>
            </el-select>
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
                     align='center'
                        prop="account"
                        label="账号"
                        >
                    </el-table-column>
                     <el-table-column
                     align='center'
                        prop="id"
                        label="用户ID"
                        >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="contactName"
                        label="联系人"
                        >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="contactPhone"
                        label="手机号码"
                        >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="roleName"
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
                    <el-pagination
                    style=" padding:20px;"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                   
                    layout="total, prev, pager, next"
                    :total="total">
                    </el-pagination>
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
            width="60%"
            center
            :before-close="addClose">
              <div class="space-between">
                <el-form label-width="100px"  size='mini'>
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
               <el-form-item label="是否部门领导:">
                    <el-checkbox v-model="addItemInfo.dur.isLeader">是</el-checkbox>
               </el-form-item>
               <el-form-item label="联系人:">
                   <el-input  v-model="addItemInfo.contactName"></el-input>
               </el-form-item>
                <el-form-item label="手机号码:">
                   <el-input  v-model="addItemInfo.contactPhone"></el-input>
               </el-form-item>
                 
           </el-form>
           <div>
              
              <div>销售部</div>
                <el-tree
                v-if='userChange'
                 ref="departmentTree"
                    :data="departmentList"
                    show-checkbox :props="departmentProps" node-key="id" 
                     :default-checked-keys='departmentTreeList'
                     default-expand-all 
                    @check="sonCheck"
                   >
                </el-tree>
              </div>  
              <div style=;width:110px;>
                 <div>角色</div>
                <el-tree
                    v-if="userChange"
                    :data="initroleList"
                    show-checkbox
                    default-expand-all
                    node-key="roleId"
                    ref="tree"
                    :default-checked-keys='itemPowerList'
                    highlight-current
                    @check="sonRoleCheck"
                    :props="defaultProps">
                </el-tree>
              </div>
              </div>
             
            <div>
               
  
           </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
import {
   accountUpdate,resetUser,accountDetail,accountList,delteAccount
} from '@/api/user'
import {
  roleList
} from '@/api/role'
  import {
    updateUserDepartment,
    departmentList,
} from '@/api/department'
import md5 from 'md5'
let addItemInfo = {
  account:'',contactName:'',contactPhone:'',
  roles:[],password:'',ifChangePassword:true,
  dur:{did:"", isLeader:""}
}
  export default {
    async created(){
      this.loading = true;
     await this.getList(this.search)
     await this.getDepartmentList()
    await this.getAllRole()
    //  await this.roleList()
      this.loading = false;
    },
    methods: {
      serchRole(){
        this.search.page = 1;
        this.getList(this.search)
      },
      async getAllRole(){
        let res = await roleList({});
        this.roleListSelect =res.data;
      },
      sonCheck(data){
          this.addItemInfo.dur.did = data.id;
          this.$refs.departmentTree.setCheckedKeys([data.id]);
          this.roleList(data)
           console.log(data)
      },
      sonRoleCheck(data){
        console.log(data)
        this.$refs.tree.setCheckedKeys([data.roleId]);
      },
      addClose(){
        // this.$confirm('取消新增, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
          this.userChange = false;
        // }).catch(() => {
                
        // });
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
                      this.addItemInfo.roleId =''
                      this.$refs.tree.getCheckedNodes().forEach(item =>{
                          console.log(item)
                            this.addItemInfo.roleId = item.roleId;
                      })
                     
                       console.log(this.addItemInfo,typeof(this.addItemInfo.dur.isLeader))
                     if(this.addItemInfo.roleId&&this.addItemInfo.account
                     &&this.addItemInfo.contactName
                     &&this.addItemInfo.contactPhone
                     &&this.addItemInfo.dur.did
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
                        this.addItemInfo.dur.isLeader = this.addItemInfo.dur.isLeader?1:0;
                        this.addItemInfo.password = this.addItemInfo.ifChangePassword? md5(this.addItemInfo.password):this.addItemInfo.password
                       console.log(this.addItemInfo)
                       // if(this.addItemInfo.id){//修改
                            await accountUpdate(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo ={dur: {did:"", isLeader:""}}
                        this.search.page =1;
                            this.getList(this.search)
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
                keyWord:value,
                // sign:value
                page:1,
                limit:10
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
                        this.search.page =1;
                        this.getList(this.search)
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
                        this.search.page =1;
                            this.getList(this.search)
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                
                });
      },
        async addItem(item){
          if(item){
            console.log(item)
           let res =  await accountDetail({id:item.id})
          
           console.log(res)
           let roles = [res.data.role.roleId];
          //  res.data.roles.forEach(item =>{
          //    roles.push(item.roleId)
          //  })
           
            this.itemPowerList = roles;
            console.log(this.itemPowerList)
            let obj = {
              did:res.data.did, isLeader:res.data.isLeader==1?true:false
            }
            this.departmentTreeList = [res.data.did];

           let findItem =  this.departmentArr.find(item =>item.id == res.data.did);
           console.log(findItem,'findItem')
           if(findItem){
             this.roleList({depRole:findItem.depRole})
           }
           
             
            this.addItemInfo = {...res.data,ifChangePassword:false,dur:obj}
            console.log(this.addItemInfo)
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.userChange =true;
          
        },
        showParent(){

        },
        async getDepartmentList(){
              let res = await departmentList({});
              this.departmentList = res.data;
              this.resetList(res.data)
               console.log(this.departmentArr,'departmentArr')
              // this.departmentArr = this.resetList(res.data)
              
        },
        resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach(item =>{
         this.departmentArr.push(item)
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
           
           this.departmentArr.push(item)
           
            this.sonsTree(item)
            // console.log(son)
            console.log(this.departmentArr)
            

          })
        }
        // console.log(son)
        // debugger
        
        //  console.log(son)
      
          
         
         
          // for (var i = 0; i < arr.length; i++) {
          //   console.log(arr[i].superior == obj.id)
          //     if (arr[i].superior == obj.id) {  //等于加入数组
          //         this.sonsTree(arr[i], arr);//递归出子元素
          //         return obj;
          //     }
          // }
          // if (children.length > 0) {
              // obj.children = children;
          // }
          
      },  
      handleCurrentChange(val) {
        this.search.page = val;
       this.getList(this.search)
        console.log(`当前页: ${val}`);
      },
    async getList(obj){
      let res = await accountList(obj);
      console.log(res.data)
      // res.data.map(item =>{
       
      //   item.roleList = '';
      // })

      this.list = res.data;
       this.total = res.total;
      this.list.map(item =>{
        item.roleName = item.role.name
      //   let roleList =[];
      //  item.roles.map(roleItem =>{
      //    roleList.push(roleItem.name);
      //   //  console.log(roleItem,'roleItem')
      //  })
      //    item.roleList = roleList.length >0? roleList.join(','):'';
      })
      
      console.log(this.list,221);
      },
    async roleList(data){
      let roleIds  = data.depRole?data.depRole.split(","):[];
      // let roleIds  = data.depRole.split(",");

      let obj = {roleIds};
      let res = await roleList(obj);
      this.initroleList = res.data;
      console.log(res,22222);
    },


    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        sonShow:false,
        userChange:false,
        addItemInfo:{
          ifChangePassword:false,
          dur:{did:"", isLeader:""}
        },
        list:[],
        initroleList:[],
        treeData:[],
        itemPowerList:[],
        departmentTreeList:[],
        defaultProps: {
          // children: 'children',
          label:"description"
        },
        
        departmentProps:{
            children: 'child',
          label:"description"
        },
        departmentList:[],
        departmentArr:[],
        search:{
          page:1,
          limit:10
        },
        total:0,
        roleListSelect:[]
      };
    }
  };
</script>

<style lang="scss" scoped>
    .table{
        min-width: 800px;
    }
</style>