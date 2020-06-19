<template>
	<div class="warp" v-loading='loading'>
    <div class="btn">
        <el-button type="primary" @click="addItem(0)" icon="el-icon-edit">新增</el-button>
    </div>
    <div class="space-between">
      <el-tree style="width:400px" :data="list" :props="defaultProps" :expand-on-click-node="false" node-key="id" default-expand-all  @node-click="check">
             <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                <el-button
                    type="text"
                    size="mini"
                    @click.stop="searchUser(node)">
                    查看员工
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click.stop="edit(node)">
                    修改部门信息
                </el-button>
                </span>
            </span>
      </el-tree>
      <div class="center" style="flex:1">
          <div v-show="editUserFlag"  class="center" style="padding-bottom:20px;width:500px">
              <div style="padding-bottom:20px;">
                所属部门：
                <el-tree :data="list"   ref="tree" show-checkbox :props="defaultProps" default-expand-all node-key="id" ></el-tree>
                </div>
                <el-form label-width="100px" size="mini"  :rules="muneInfoRules" :model="muneInfo" ref="muneInfo"   style="width:300px;flex:1;">
                <el-form-item label="部门描述:">
                    <el-input placeholder='请输入部门描述' v-model="muneInfo.description"></el-input>
                </el-form-item>
                <el-form-item label="部门名称:" prop='name'>
                    <el-input placeholder='请输入部门名称'  v-model="muneInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input placeholder='请输入备注'  v-model="muneInfo.remark"></el-input>
                </el-form-item>
                <el-form-item label="角色所属:" prop='depRole'>
                
                  <el-checkbox-group v-model="muneInfo.depRole">
                   
                    <el-checkbox v-for='item in roleArr' :key="String(item.roleId)" :label="String(item.roleId)">{{item.name}}</el-checkbox>
                    
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="delteItem()">确认删除</el-button>
                    <el-button type="primary" @click="addSure(1)">确认修改</el-button>
                    </el-form-item>
                </el-form>
          </div>
            <div style="width:90%;"  v-show="!editUserFlag">
             <div>部门【{{editUserInfo.name}}】所属人员</div>
                 <el-table
                    :data="tableData"
                    style="width: 100%">
                     <el-table-column
                         align='center'
                        prop="userName"
                        label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="isLeaderStr"
                        label="是否部门领导"
                       >
                    </el-table-column>
                    </el-table>
            </div>
    </div>
     <!-- 新增部门 -->
    <el-dialog  
       width="50%"
        center
      :visible.sync="addMune"
      :before-close="closeEdit"
    >
    <div class="center">
      <div style="padding-bottom:20px;">
        所属部门：
        <el-tree :data="routerList" show-checkbox :props="defaultProps" node-key="id"  default-expand-all @check="sonCheck"></el-tree>
        <!-- <el-radio-group v-model="addMuneInfo.superior">
          <el-radio v-for="(item,index) in list" :key="index" :label="item.id">{{item.description}}</el-radio>
        </el-radio-group> -->
        <!-- <el-tree :data="routerList" node-key="id" show-checkbox :props="routerInfo" @check="check"></el-tree> -->
      </div>
      <el-form label-width="100px" style="width:300px;flex:1;"  :rules="addMuneInfo" :model="addMuneInfo" ref="addMuneInfo">
          <el-form-item label="部门描述:">
              <el-input  v-model="addMuneInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="部门名称:">
              <el-input  v-model="addMuneInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
              <el-input  v-model="addMuneInfo.remark"></el-input>
          </el-form-item>
          <el-form-item label="角色所属:">
             <el-checkbox-group v-model="addMuneInfo.depRole">
              <el-checkbox v-for='item in roleArr' :key="item.roleId" :label="item.roleId">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
      </el-form>
      
      
    </div>
      
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="addSure(0)">确 定</el-button>
            </span>

    </el-dialog>
	</div>
    </div>
</template>

<script>
  import {
    updateUserDepartment,
    deleteUserDepartment,
    updataDepartment,
    deleteDepartment,
    departmentList,
    userDepartmentList
} from '@/api/department'
import {accountList} from '@/api/user'
import {
    roleList,
} from '@/api/role'
let initMuneValue = {
  description:'',
  name:'',
  remark:'',
  superior:0,
  depRole:[]
}
  export default {
   async created(){
        this.loading = true;
      await  this.accountList()
      await this.roleList()
      await this.getList({})
       this.loading = false;
    },
    methods: {

        async searchUser(item){
            console.log(item)
            this.editUserInfo = item.data;
            let obj = {
                id:this.editUserInfo.id
            }
            let res = await userDepartmentList(obj)
            res.data.forEach(item =>{
                item.isLeaderStr = item.isLeader == 1?'是':'否'
            })
            this.tableData =res.data;
            this.editUserFlag = false;
        },
     async accountList(){
         let res = await accountList();
         this.userList = res.data
        },
        async roleList(){
          let res = await roleList();
          this.roleArr = res.data
        },
      async getList(obj){
        try {
         
          let res = await departmentList(obj);
          if(res.data.length){
            this.searchUser({data:res.data[0]})
          }
          
           this.routerList =res.data;
           this.list = res.data;
          // this.list = this.resetList(res.data)
          
          
         console.log(this.list,this.routerList)
        } catch (error) {
          console.log(error)
        }
      },
      edit(item){
          this.editUserFlag = true;
          console.log(item)
           this.$refs.tree.setCheckedKeys([item.data.id]);
           let depRole= item.data.depRole?item.data.depRole.split(','):[];
           
        this.muneInfo ={...item.data,depRole}
        console.log(this.muneInfo)
      },
      check(data){
        console.log(data)
        this.$refs.tree.setCheckedKeys([data.id]);
        let depRole= data.depRole?data.depRole.split(','):[];
        this.muneInfo ={...data,depRole}
        // console.log(this.muneInfo)
      },
      sonCheck(data){
          this.addMuneInfo.superior = data.id
           console.log(data)
      },
      resetList(arr){
        arr.map((item)=>{
          item.disabled  = true;
          if(item.child){
            let o = this.sonsTree(item.child);
            item =o;
          
          }
        })
        console.log(arr)
        return arr 
      },
      sonsTree(arr) {
          arr.map(item =>{
            item.disabled  = true;
            if(item.child){
               let o = this.sonsTree(item.child);
            }
          })
          return arr;
      },
      closeEdit(){
        this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                  this.addMuneInfo= {...initMuneValue};
                  this.muneInfo= {...initMuneValue};
                this.addMune = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      addSure(type){
        let tip = type == 0?'是否确认添加页面?':"是否确认修改页面?";
        this.$refs['muneInfo'].validate((valid) => {
          if (valid) {
           this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                  
                  let obj = type == 0?this.addMuneInfo:this.muneInfo;
                  obj.depRole = obj.depRole.join(',');
                  if(obj.depRole.length <=0){
                    return this.$message.warning('请选择所属角色')
                  }
                  
                  console.log(obj)
                  let res=  await updataDepartment(obj)
                  this.$message.success(res.returnMsg)
                  this.addMuneInfo.depRole= [];
                  this.muneInfo.depRole= [];
                  this.getList({})
                  this.addMune = false;
                  
                }).catch((e) => {
                
                       
            });
          }
        })
        
       
      },
      addItem(item){
        if(item){//修改
          this.addMuneInfo = {...item};
        }else{//新增
          this.addMuneInfo = {...initMuneValue};
        };
        this.addMune = true;

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
                   let res=  await deleteDepartment({id:this.muneInfo.id})
                  this.$message.success(res.returnMsg)
                  this.getList({})
                  
                }).catch((e) => {
                
                       
            });
        
      }
    },
    data() {
      return {
        list:[],
        addMune:false,
        searchDicValue:'',
        addMuneInfo:{},
        loading:false,
        defaultProps:{
            children: 'child',
          label:"description"
        },
        muneInfoRules:{
          name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
          depRole:[{ required: true, message: '请选择所属角色', trigger: 'blur' }]
        },
        addMuneInfo:{
          name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
          depRole:[{ required: true, message: '请选择所属角色', trigger: 'blur' }]
        },
        muneInfo:{ 
          description:'',
          name:'',
          remark:'',
          superior:0,
          depRole:[]
        },
        routerList:[],
        editUserInfo:{},
        editUserFlag:false,
        tableData:[],
        roleArr:[]
      };
    }
  };
</script>

<style lang="scss" scoped>
    .btn{
        text-align: left;
       padding-bottom:10px ;
    }
    .data{
       padding-top:20px; 
    }
    .custom-tree-node{
        flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    }
</style>
