<template>
    <div class="warp">
        <div style="flex:1" class="center">
            <div style="width:60px;height:60px;" class="center">
                <img src="../../images/icon.jpg" >
            </div>
            <div style="flex:1;font-width:600;font-size:32px;letter-spacing:5px;color:#409eff;">
               招商自动化系统
            </div>
        </div>
        <div class="login">
            <el-badge :value="notReadNum" :hidden='notReadNum == 0' style="margin:0 35px;">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                        跟进提醒<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in msg" :key="index">
                            <div class="space-between">
                                <div style="padding:0 10px">{{item.content}}</div>
                                <el-tag style="margin-right:10px;" size="mini"   :type="item.isRead == 1?'info':'warning'">{{item.isRead == 1?'已读':'未读'}}</el-tag>
                                <el-button @click.native.prevent="readMsg(item)" size="mini" v-if="item.isRead !=1" type="primary">标记已读</el-button>
                
                            </div>
                            
                        </el-dropdown-item>
                        <el-pagination
                            small
                              @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :total="total">
                            </el-pagination>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-badge>
            
            <div class="avatar">
                <!-- <el-avatar  size="small" src="../../images/icon.jpg"></el-avatar> -->
                {{userInfo.contactName}}
            </div>
            <div style="margin:0 10px;">
                <el-button type='warning' @click="updatapasswar = true">
                    修改密码
                </el-button>  
            </div>
            <div>
                <el-button type='info' @click="signOut">
                    注销登录
                </el-button>  
            </div>
                <!-- 修改密码 -->
    <el-dialog
        title='修改密码'
        :visible.sync="updatapasswar"
        width="30%"
        center
    >   
        <el-form :model="pawInfo" status-icon :rules="rules" ref="pawInfo" label-width="100px"  autocomplete="off">
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" show-password v-model="pawInfo.newPassword" autocomplete="new-password"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" show-password v-model="pawInfo.oldPassword" autocomplete="new-password"></el-input>
            </el-form-item>
           
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updatapasswar = false">取 消</el-button>
            <el-button type="primary" @click="updataPaw">确 定</el-button>
        </span>
    </el-dialog> 
            <!-- <el-dropdown szie="mini" @command="signOut" size="medium" >
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item style="min-width:100px">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown> -->
        </div>
    </div>
</template>
<script>
    import {
    updataMsg,
    msgDetail,
    deleteMsg,
    msgList,
    readMsg,
    notReadMsg
}  from '@/api/msgTips'
import {loginOut,updatePassword} from '@/api/user'
import md5 from 'md5'
     export default{
        data(){
            return{
                allValue:"",
                notReadNum:0,
                msg:[],
                total:0,
                searchValue:{
                    limit:5,
                    page:1,
                },
                userInfo:{

                },
                pawInfo:{
                    newPassword:"",
                    oldPassword:"",
                },
                updatapasswar:false,
                rules:{
                    newPassword:[{ required: true, message: '请输入新密码', trigger:['change','blur']  }],
                    oldPassword:[{ required: true, message: '请输入旧密码', trigger: ['change','blur'] }]
                }
            }
        },
        async created(){
            this.userInfo =JSON.parse(sessionStorage.getItem("userInfo")) 
            console.log(this.userInfo)
           await this.notReadMsg()
            await this.msgList()
        },
        methods:{
            
            handleMsg(data){
                console.log(data,213)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                 this.searchValue.page = val;
       this.msgList()
            },
            async readMsg(item){
                let res = await readMsg({id:item.id})
                await this.msgList()
                    this.$message.success(res.returnMsg)
            },
            async deleteMsg(item){
                try {
                    let res = await deleteMsg({id:item.id})
                    this.$message.success(res.returnMsg)
                    
                } catch (error) {
                    
                }
                
     
            },
            async msgList(){
                try {
                    let res = await msgList(this.searchValue)
                    console.log(res)
                    this.msg = res.data
                    this.total = res.total
                } catch (error) {
                    
                }
               
            },
            async notReadMsg(){
                try {
                    let res = await notReadMsg();
                    this.notReadNum = res.data;
                    console.log(res)
                } catch (error) {
                    
                }
              
            },
          async  updataPaw(){
            //   this.pawInfo.newPassword = md5(this.pawInfo.newPassword);
            //   this.pawInfo.oldPassword = md5(this.pawInfo.oldPassword);
            let obj = {
                newPassword:md5(this.pawInfo.newPassword),
                oldPassword:md5(this.pawInfo.oldPassword)
            }
              let res = await updatePassword(obj)
               this.$message.success(res.returnMsg)
            },
           async signOut(value){
               let res = await loginOut()
               this.$message.success(res.returnMsg)
                console.log(value)
                this.$store.commit('clearToken')
                sessionStorage.removeItem('userInfo');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('pageList');
                this.$router.replace({
                    name:"admin"
                }).catch(err => {err})
            }
        }
    }
</script>
<style lang="scss" scoped>

    .warp{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        .avatar{
            padding: 0 20px;
        }
        .login{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
    }
</style>