<template>
	<div class="warp" v-loading='loading'>
    <div class="btn">
        <el-button type="primary" @click="addItem(0)" icon="el-icon-edit">新增</el-button>
    </div>
    <div class="space-between">
      <el-tree :data="list" :props="defaultProps" node-key="id"  @node-click="check"></el-tree>
      <div class="space-between">
        <div style="padding-bottom:20px;width:100px">
          所属菜单：
          <el-radio-group v-model="muneInfo.pid">
            <el-radio v-for="(item,index) in list" :key="index" :label="item.id">{{item.description}}</el-radio>
          </el-radio-group>
        </div>
        <el-form label-width="100px" size="mini" >
          <el-form-item label="内容:">
              <el-input  v-model="muneInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
              <el-input  v-model="muneInfo.url"></el-input>
          </el-form-item>
          <el-form-item label="编号:">
              <el-input  v-model="muneInfo.type"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序:">
              <el-input  v-model="muneInfo.sort"></el-input>
          </el-form-item> 
           <el-form-item>
              <el-button type="danger" @click="delteItem()">确认删除</el-button>
              <el-button type="primary" @click="addSure(1)">确认修改</el-button>
            </el-form-item>
        </el-form>
      </div>
        
    </div>
    <el-dialog
       width="50%"
        center
      :visible.sync="addMune"
      :before-close="closeEdit"
    >
    <div class="center">
      <div style="padding-bottom:20px;">
        所属菜单：
        <el-radio-group v-model="addMuneInfo.pid">
          <el-radio v-for="(item,index) in list" :key="index" :label="item.id">{{item.description}}</el-radio>
        </el-radio-group>
        <!-- <el-tree :data="routerList" node-key="id" show-checkbox :props="routerInfo" @check="check"></el-tree> -->
      </div>
      <el-form label-width="100px" size="mini">
          <el-form-item label="内容:">
              <el-input  v-model="addMuneInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
              <el-input  v-model="addMuneInfo.url"></el-input>
          </el-form-item>
          <el-form-item label="编号:">
              <el-input  v-model="addMuneInfo.type"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序:">
              <el-input  v-model="addMuneInfo.sort"></el-input>
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
    byUserMenu,
    userMenu,
    updataMenu,
    deleteMenu,
    menuList
} from '@/api/menu'
let initMuneValue = {
  description:'',
  url:'',
  type:'',
  sort:'',
  pid:""
}
  export default {
    created(){
      this.getList({})
    },
    methods: {
      async getList(obj){
        try {
          this.loading = true;
          let res = await menuList(obj);
          this.list = this.resetList(res.data);
          
          this.routerList =res.data;
        } catch (error) {
          console.log(error)
        }
        this.loading = false;
      },
      check(data){
        console.log(data)
        this.muneInfo ={...data}
        console.log(this.muneInfo)
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
                  let res=  await updataMenu(obj)
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
                   let res=  await deleteMenu({id:this.muneInfo.id})
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
          label:"description"
        },
        muneInfo:{ },
        routerList:[],
        cheakInfo:{}

      };
    }
  };
</script>

<style lang="scss" scoped>
    .btn{
        text-align: left;
       
    }
    .data{
       padding-top:20px; 
    }
</style>
