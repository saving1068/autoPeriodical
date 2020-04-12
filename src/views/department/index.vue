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
          <div v-show="editUserFlag">
              <div style="padding-bottom:20px;">
                所属部门：
                <el-tree :data="list"  ref="tree" show-checkbox :props="defaultProps" default-expand-all node-key="id" ></el-tree>
                </div>
                <el-form label-width="100px" size="mini" >
                <el-form-item label="部门描述:">
                    <el-input  v-model="muneInfo.description"></el-input>
                </el-form-item>
                <el-form-item label="部门名称:">
                    <el-input  v-model="muneInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input  v-model="muneInfo.remark"></el-input>
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
                        prop="userName"
                        label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
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
        <el-tree :data="list" show-checkbox :props="defaultProps" node-key="id"  default-expand-all @check="sonCheck"></el-tree>
        <!-- <el-radio-group v-model="addMuneInfo.superior">
          <el-radio v-for="(item,index) in list" :key="index" :label="item.id">{{item.description}}</el-radio>
        </el-radio-group> -->
        <!-- <el-tree :data="routerList" node-key="id" show-checkbox :props="routerInfo" @check="check"></el-tree> -->
      </div>
      <el-form label-width="100px" >
          <el-form-item label="部门描述:">
              <el-input  v-model="addMuneInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="部门名称:">
              <el-input  v-model="addMuneInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
              <el-input  v-model="addMuneInfo.remark"></el-input>
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
let initMuneValue = {
  description:'',
  name:'',
  remark:'',
  superior:0,
}
  export default {
   async created(){
        this.loading = true;
      await  this.accountList()
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
      async getList(obj){
        try {
         
          let res = await departmentList(obj);
          this.searchUser({data:res.data[0]})
          this.list = res.data;
          
          this.routerList =res.data;
        //   console.log(this.list)
        } catch (error) {
          console.log(error)
        }
      },
      edit(item){
          this.editUserFlag = true;
          console.log(item)
           this.$refs.tree.setCheckedKeys([item.data.id]);
        this.muneInfo ={...item.data}
      },
      check(data){
        console.log(data)
        this.$refs.tree.setCheckedKeys([data.id]);
        this.muneInfo ={...data}
        // console.log(this.muneInfo)
      },
      sonCheck(data){
          this.addMuneInfo.superior = data.id
           console.log(data)
      },
      resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach((item)=>{
          if(item.superior == 0){
            let o = this.sonsTree(item, arr);
            pList.push(o)
          }
        })
        return pList
        // console.log(pList,123123)
      },
      sonsTree(obj, arr) {
          var children = [];
          for (var i = 0; i < arr.length; i++) {
              console.log(arr[i].superior,obj.id)
              if (arr[i].superior == obj.id) {  //等于加入数组
                  this.sonsTree(arr[i], arr);//递归出子元素
                  children.push(arr[i]);
              }
          }
          // if (children.length > 0) {
              obj.children = children;
          // }
          return obj;
      },
      closeEdit(){
        this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
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
        this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                  console.log(this.addMuneInfo)
                  let obj = type == 0?this.addMuneInfo:this.muneInfo;

                  let res=  await updataDepartment(obj)
                  this.$message.success(res.returnMsg)
                  this.getList({})
                  this.addMune = false;
                  
                }).catch((e) => {
                
                       
            });
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
        muneInfo:{ },
        routerList:[],
        editUserInfo:{},
        editUserFlag:false,
        tableData:[]
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
