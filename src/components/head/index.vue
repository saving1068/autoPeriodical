<template>
    <div class="warp">
        <div style="flex:1" class="center">
            <div style="width:60px;height:60px;">
                <img src="../../images/icon.jpg" >
            </div>
            <div style="flex:1;font-width:600;font-size:32px;letter-spacing:5px;color:#409eff;">
               佛山市南海区彩雅纸箱包装有限公司管理平台
            </div>
        </div>
        <div class="login">
            <el-badge :value="notReadNum" :hidden='notReadNum == 0' style="margin:0 35px;">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                        信息列表<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in msg" :key="index">
                            <div class="space-between">
                                <div style="padding:0 10px">{{item.content}}</div>
                                <el-tag style="margin-right:10px;" size="mini"   :type="item.isRead == 1?'info':'warning'">{{item.isRead == 1?'已读':'未读'}}</el-tag>
                                <el-button @click.native.prevent="readMsg(item)" size="mini" v-if="item.isRead !=1" type="primary">标记已读</el-button>
                                <!-- <el-button @click.native.prevent="deleteMsg(item)"  size="mini"  type="danger">删除</el-button> -->
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
            
            <!-- <div class="avatar">
                <el-avatar  size="small" src="../../images/icon.jpg"></el-avatar>
            </div> -->
            <!-- <div>退出登录</div> -->
            <el-dropdown szie="mini" @command="signOut" size="medium" >
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item style="min-width:100px">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
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
                }
            }
        },
        async created(){
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
            signOut(value){
                console.log(value)
                this.$store.commit('clearToken')
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