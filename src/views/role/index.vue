<template>
	<div class="warp"  v-loading='loading'>
     <!-- <div class="btn">
          <el-button type="primary" @click="addItem()" icon="el-icon-edit">新增</el-button>
      </div> -->
      <div class="data space-between">
        <div class="table" style="width:600px;">
                    <el-table
                    :data="list"
                    fit
                    @row-click='showParent'
                    align="center"
                    style="width: 100%">
                    <el-table-column
                     align='center'
                        prop="name"
                        label="名字"
                        >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="description"
                        label="描述"
                        >
                    </el-table-column>
                    <el-table-column
                     align='center'
                        prop="sort"
                        label="排序"
                        >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="150px"
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
                            <!-- <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button> -->
                        </template>
                        
                    </el-table-column>
                    </el-table>
        </div>
        
      </div>
      <!-- 新增角色 -->
        <el-dialog
           
            :title="addItemInfo.roleId?'新增角色':'修改角色'"
            :visible.sync="roleChange"
            width="50%"
            center
            :before-close="addClose">
              <div class="space-between">
                <el-form label-width="50px"  size='mini'>
               <el-form-item label="名字:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
               <el-form-item label="描述:">
                   <el-input  v-model="addItemInfo.description"></el-input>
               </el-form-item>
                <el-form-item label="排序:">
                   <el-input  v-model="addItemInfo.sort"></el-input>
               </el-form-item>
                 
           </el-form>
              <el-tree
            :data="initMenuList"
            v-if='roleChange'
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :default-checked-keys='itemPowerList'
            highlight-current
            :props="defaultProps">
          </el-tree>
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
    updataRole,
    roleDetail,
    deleteRole,
    roleList,
} from '@/api/role'
import {
  menuList
} from '@/api/menu'
let addItemInfo = {
  name:'',description:'',sort:'',
  pids:[]
}
  export default {
    async created(){
      this.loading = true;
     await this.getList()
     await this.menuList()
     this.loading = false;
    },
    methods: {
      addClose(){
        // this.$confirm('取消新增, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
          this.roleChange = false;
        // }).catch(() => {
                
        // });
      },
      addSure(){
         console.log(this.$refs.tree.getCheckedNodes(),2222)
         console.log(this.addItemInfo)
        let tips = this.addItemInfo.roleId?'是否确认修改角色?':'是否确认新增角色?';
            let success = this.addItemInfo.roleId?'修改角色成功':'新增角色成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                     
                      this.addItemInfo.pids = [];
                      // let list = [];
                      // this.$refs.tree.getCheckedNodes().filter(item => item.pid!=0).forEach((item)=>{
                      //   list.push(item.pid)
                      // })
                      
                      // console.log(list)
                      
                      this.$refs.tree.getCheckedNodes().forEach(item =>{
                          if(item.pid != 0){
                            this.addItemInfo.pids.push(item.pid)
                          }
                           this.addItemInfo.pids.push(item.id)
                      })
                     this.addItemInfo.pids = Array.from(new Set([...this.addItemInfo.pids])) 
                       console.log(this.addItemInfo.pids,this.addItemInfo.name,this.addItemInfo.description,this.addItemInfo.sort)
                      //   
                     if(this.addItemInfo.pids.length != 0&&this.addItemInfo.name
                     &&this.addItemInfo.description
                     &&this.addItemInfo.sort != 'undefined'
                     ){
                       // if(this.addItemInfo.id){//修改
                            await updataRole(this.addItemInfo);
                        // }else{//新增
                            
                            // await updataRole(this.addItemInfo);
                           
                        // }
                        this.addItemInfo = {}
                            this.getList({})
                         this.$message.success(success);
                         this.roleChange = false;
                       
                     }else{
                       return this.$message.warning('请为该角色填写所有信息')
                     }
                    
                        
                    } catch (error) {
                        console.log(error)
                    }
                    
                
                }).catch(() => {
                
                });
      },
      async searchRole(row, column, event){
        try {
          
          let obj = {name:this.searchRoleValue,page:1}
          console.log(obj)
             this.getList(obj)
        } catch (error) {
          console.log(error)
        }
       
      },
      delteItem(item){
        console.log(item)
          let tips = '是否确认删除角色';
            let success = '删除角色成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteRole({id:item.roleId})
                        
                            this.getList({})
                         this.$message.success(success);
                        
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
      },
        async addItem(item){
          if(item){
            console.log(item)
            try {
              let res =  await roleDetail({id:item.roleId})
           let perList = [];
           
          let menuList = [...this.initMenuList];//全部角色
          let curList = menuList.find(item =>item.id == 229);//客户跟进
          let contrastList = [];//父角色中的东西
          let perItem = null;
          // console.log(menuList)
          // console.log(res.data.perList)
          // contrastList = res.data.perList.map(item => item.pid == 0);
           res.data.perList.forEach((item,index) =>{//当前角色的
            // console.log(index,menuList.length-1,menuList[index])
            //   perItem = menuList.find(sitem =>sitem.id == item.id);
            //   console.log(perItem)
            //   if(item.pid !=0||(item.pid==0&&perItem)){
              console.log(item)
            
                if(item.pid == 229){
                  perList.push(item.id)
                }

                contrastList.push(item.id)
              // } 
             
           })
           if(curList.children.length != perList.length){
             contrastList = contrastList.filter(item => item!=229)
           }
           
           console.log(contrastList)
            this.itemPowerList = contrastList;
            // console.log(this.itemPowerList,'itemPowerList')
          //  console.log(res)
            this.addItemInfo = {...res.data}
            } catch (error) {
              console.log(error)
            }
           
          }else{
            this.addItemInfo = {...addItemInfo}
           
          }
           console.log(this.addItemInfo)
          this.roleChange =true;
        },
        showParent(){

        },
    async getList(obj){
      let res = await roleList(obj)
      this.list = res.data
  
      },
    async menuList(){
      let res = await menuList()
       
      this.initMenuList = this.resetList(res.data);
      this.menuList = res.data;
      console.log(this.initMenuList,'initMenuList');
    },
    resetList(arr){
        console.log(arr)
        let pList = [];
        arr.forEach((item)=>{
          if(item.pid == 0){
            let o = this.sonsTree(item, arr);
            pList.push(o)
          }
        })
        return pList
        console.log(pList,123123)
      },
      sonsTree(obj, arr) {
          var children = [];
          for (var i = 0; i < arr.length; i++) {
              if (arr[i].pid == obj.id) {  //等于加入数组
                  this.sonsTree(arr[i], arr);//递归出子元素
                  children.push(arr[i]);
              }
          }
          // if (children.length > 0) {
              obj.children = children;
          // }
          return obj;
      },
    },

    data() {
      return {
        loading:false,
        searchRoleValue:'',
        roleChange:false,
        addItemInfo:{

        },
        list:[],
        initMenuList:[],
        itemPowerList:[],
        defaultProps: {
          // children: 'children',
          label: 'description'
        }
      };
    }
  };
</script>

<style>
</style>
