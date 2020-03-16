<template>
  <div class="warp" v-loading='loading'>
      <div class="btn">
          <el-button type="primary" @click="addItem" icon="el-icon-edit">新增</el-button>
      </div>
      
      <div class="data space-between">
        <div class="table">
            <el-table
                    :data="list"
                    fit
                    @row-click='showParent'
                    align="center"
                    style="min-width: 300px;">
                    <el-table-column
                         width="150px"
                        prop="name"
                        label="名字"
                        >
                    </el-table-column>
                    <el-table-column
                         width="150px"
                        prop="sign"
                        label="字典"
                        >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="150px"
                        >
                        <template slot="header" slot-scope="scope">
                            <el-input
                                size="mini"
                                v-model="searchDicValue"
                                @input="searchDic"
                                placeholder="输入关键字搜索">
                            </el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="primary" @click.stop="addItem(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click.stop="delteItem(scope.row)" size="mini">删除</el-button>
                        </template>
                        
                    </el-table-column>
                    </el-table>
        </div>
            <!-- <ul class="data-list"> -->
                <!-- <el-scrollbar > -->
                    
               <!-- <li class="item space-between" v-for="(item,index) in list" :key="index">
                   <div>{{item.name}}</div>
                   <div>{{item.sign}}</div>
                    <el-button type="primary" @click="ifChnageItem" size="mini">修改</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </li>  -->
                 <!-- </el-scrollbar> -->
            <!-- </ul> -->
       
        <div class="item-info" v-show="sonShow">
            <div class="btn">
                <el-button type="primary" @click="ifItemAddValue()" icon="el-icon-edit">新增</el-button>
            </div>
                <!-- <el-scrollbar > -->
                     <el-table
                    :data="sonList"
                     align="center"
                     fit
                    style="width: 100%">
                    <el-table-column
                        prop="sign"
                        label="标识"
                       >
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="内容"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="key"
                        label="key">
                    </el-table-column>
                     <el-table-column
                        align="center"
                         label="操作"
                         width="150px"
                        >
                        <template slot-scope="scope">
                            <el-button type="primary" @click="ifItemAddValue(scope.row)" size="mini">修改</el-button>
                            <el-button type="danger" @click="delteSon(scope.row)"  size="mini">删除</el-button>   
                        </template>                
                    </el-table-column>
                    </el-table>
                <!-- </el-scrollbar> -->
        </div>
      </div>
        <!-- 修改字典中的内容 -->
        <el-dialog
             width="50%"
            center
            :visible.sync="ifItemAdd"
            :before-close="itemAddClose"
        >
             <el-form label-width="100px">
                <!-- <el-form-item label="标识:">
                   <el-input  v-model="itemChangeInfo.sign"></el-input>
               </el-form-item> -->
               <el-form-item label="key:">
                   <el-input  v-model="itemChangeInfo.key"></el-input>
               </el-form-item>
               <el-form-item label="值:">
                   <el-input  v-model="itemChangeInfo.value"></el-input>
               </el-form-item>
                 
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="itemAddClose">取 消</el-button>
                <el-button type="primary" @click="itemAddSure">确 定</el-button>
            </span>

        </el-dialog>


      <!-- 新增字典 -->
        <el-dialog
            title="新增字典"
            :visible.sync="parentChange"
            width="30%"
            center
            :before-close="addClose">
               <el-form label-width="100px">
               <el-form-item label="名字:">
                   <el-input  v-model="addItemInfo.name"></el-input>
               </el-form-item>
               <el-form-item label="字典标识:">
                   <el-input  v-model="addItemInfo.sign"></el-input>
               </el-form-item>
                 
           </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClose">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import {listDic,updateDic,deleteDic,detailDic,deleteItemDic,updateItemDic} from '@/api/admin'
let initItemChangeInfo = {
                key:"",
                value:''
    }
let initAddItemInfo = {
            name:'',
            sign:''
        }
export default {
    
    data(){
        return{
            sonShow:false,
            parentChange:false,
            ifItemAdd:false,
            searchDicValue:'',
            itemChangeInfo:{
                key:"",
                value:''
            },
            addItemInfo:{
                name:'',
                sign:''
            },
            sonList:[],
            list:[
                
            ],
            choiseItem:{

            },
            selectParentId:'',
            loading:false
        }
    },
    created(){
        this.getList({})
    },
    methods:{
        searchDic(value){
            console.log(value)
            let obj ={
                keyWord:value
                // sign:value
            }
            this.getList(obj)
        },
        ifItemAddValue(item){
            console.log(item)
            if(item){
                this.itemChangeInfo = {...item,pId:this.selectParentId}    
            }else{
                this.itemChangeInfo = {...initItemChangeInfo,pId:this.selectParentId}    
            }
           
            this.ifItemAdd = true;
        },
        delteSon(item){
            let tips = '是否确认删除字典';
            let success = '删除字典成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteItemDic({id:item.id})
                    let obj = {
                            id:this.selectParentId,
                    }
                    let res = await detailDic(obj);
                    this.sonList = res.data;
                          
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
        itemAddSure(){
            let tips = this.itemChangeInfo.id?'是否确认修改字典?':'是否确认新增字典?';
            let success = this.itemChangeInfo.id?'修改字典成功':'新增字典成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        // if(this.itemChangeInfo.id){//修改
                        //     let obj = {
                        //         ...this.addItemInfo,
                              
                        //     }
                            await updateItemDic(this.itemChangeInfo);
                        // }else{//新增
                        //     console.log(this.addItemInfo)
                        //     await updateDic(this.addItemInfo);
                           
                        // }
                        let obj = {
                             id:this.selectParentId,
                        }
                        let res = await detailDic(obj);
                        this.sonList = res.data;
                        
                        this.$message.success(success);
                        
                        this.ifItemAdd = false;
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
        },
        itemAddClose(){
            this.$confirm('取消新增, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.ifItemAdd = false;
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        addItemList(){

        },
        async getList(obj){
            try {
                this.loading = true;
                 let res = await listDic(obj)
                this.list = res.data;
            } catch (error) {
                
            }
           this.loading = false;
            // console.log(res)
        },
        async showParent(row, column, event){
            console.log(row)
            try {
                let obj = {
                    id:row.id,
                    sign:row.sign
                }
                this.selectParentId = row.id;
                let res = await detailDic(obj);
                this.sonList = res.data;
                this.sonShow = true;
            } catch (error) {
                
            }
            


        },
        addSure(){
            let tips = this.addItemInfo.id?'是否确认修改字典?':'是否确认新增字典?';
            let success = this.addItemInfo.id?'修改字典成功':'新增字典成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        if(this.addItemInfo.id){//修改
                            await updateDic(this.addItemInfo);
                        }else{//新增
                            console.log(this.addItemInfo)
                            await updateDic(this.addItemInfo);
                           
                        }
                            this.getList({})
                         this.$message.success(success);
                         this.parentChange = false;
                    } catch (error) {
                        
                    }
                    
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });

        },
        addClose(){
         this.$confirm('取消新增, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.parentChange = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        delteItem(item){
             let tips = '是否确认删除字典';
            let success = '删除字典成功';
            this.$confirm(tips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async() => {
                    try {
                        await deleteDic({id:item.id})
                        
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
        addItem(item){
            if(item){
                this.addItemInfo = {...item}
            }else{
                 this.addItemInfo = {...initAddItemInfo}
            }
            this.parentChange = true;
        }
    }
}
</script>
<style lang="scss" scoped>
    .btn{
        text-align: left;
       
    }
    .data{
         padding:20px; 
        min-width: 800px;
        .data-list{
           
                
            .item{
                padding: 5px 0;
            }
        }
       
    }
   
</style>