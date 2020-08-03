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
                            <div class="space-between" @click='customerDetail(item)'>
                                <div style="padding:0 10px">{{item.content}}</div>
                                <el-tag style="margin-right:10px;" size="mini"   :type="item.isRead == 1?'info':'warning'">{{item.isRead == 1?'已读':'未读'}}</el-tag>
                                <el-button @click.stop="readMsg(item)" size="mini" v-if="item.isRead !=1" type="primary">标记已读</el-button>

                            </div>
                            
                        </el-dropdown-item>
                        <el-pagination
                            small
                              @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                            layout="total, prev, pager, next"
                            :total="total">
                            </el-pagination>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-badge>
            
            <div class="avatar space-between">
                <!-- <el-avatar  size="small" src="../../images/icon.jpg"></el-avatar> -->
                <div class="userInfo">{{userInfo.contactName}}</div>
                <div class="userInfo">{{userInfo.loginTime}}</div>
                <div class="userInfo">{{userInfo.loginIp}}</div>
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

    <el-dialog 
        title="编辑客户"
        :visible.sync="detailFlag"
        width="80%"
        center
        >
        <div class="formCenter">
        <div class="formContenView">
          <div class="title">基本信息</div>
          <el-form
            inline
            class="form-inline"
            label-width="100px"
            :rules="detailRules"
            :model="detail"
            ref="detail"
          >
            <el-form-item label="客户姓名" width='100%' prop="name">
           <el-input class="width280" v-model='detail.name' placeholder='请输入客户姓名' :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <!-- <el-form-item label="广告负责人" prop="adMan">
            <el-select clearable class="width280" v-model="detail.adMan" placeholder="请选择广告负责人" :disabled="type == 1?true:false">
            <el-option 
                v-for="item in userList"
                :key="item.id"
                :label="item.contactName"
                :value="item.id"
            ></el-option>
            
            </el-select>
             <div class="width280">
               {{detail.adManName||'--'}}
            </div>
             
        </el-form-item>
        -->
        <!-- <el-form-item label="平台" prop="platform">
           <el-select clearable class="width280" v-model="detail.platform" placeholder="请选择平台" :disabled="type != 0?true:false">
           <el-option 
                v-for="item in platform"
                :key="item.key"
                :label="item.value"
                :value="item.key"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" >
            <el-input class="width280" placeholder="请输入电子邮箱" v-model="detail.email" :disabled="type == 1?true:false"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="项目" prop="project">
           <el-select clearable  class="width280" v-model="detail.project" placeholder="请选择项目" :disabled="type == 1?true:false">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
           
            </el-select>
            <div class="width280">
                {{detail.projectName||'--'}}
            </div>
            
        </el-form-item> -->
        
        <el-form-item label="下次跟进时间" >
            <el-date-picker class="width280" :disabled="type == 1?true:false"
                v-model="detail.nextFollowUpDate"
                type="datetime"
                format='yyyy-MM-dd HH:mm'
                value-format='yyyy-MM-dd HH:mm'
                placeholder="选择日期">
                </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="QQ号码" >
            <el-input class="width280" placeholder="请输入QQ号码" v-model="detail.qq" :disabled="type == 1?true:false"></el-input>
        </el-form-item> -->
        <el-form-item label="手机号" prop="telephone" >
            <el-input class="width280" placeholder="请输入手机号" v-model="detail.telephone " :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="微信" >
            <el-input class="width280" placeholder="请输入微信" v-model="detail.wechat " :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="来源连接" prop="sourceLink">
          
            <a target="_blank" style='display:block;height:28px;width:280px' :href="detail.sourceLink">{{detail.sourceLink}}</a>
            
            <!-- <el-input class="width280" v-else placeholder="请输入来源连接" v-model="detail.sourceLink "></el-input> -->
            <!-- <el-input class="width280" placeholder="请输入来源连接" v-model="detail.sourceLink " :disabled="type != 0?true:false"></el-input> -->
        </el-form-item>
        <el-form-item label="客户类型" prop='type'>
            <el-select clearable  class="width280" v-model="detail.type" placeholder="请选择客户类型" :disabled="type == 1?true:false">
            <el-option
                v-for="item in currentType"
                :key="String(item.key)"
                :label="item.value"
                :value="String(item.key)"
            ></el-option>
           
            </el-select>
        </el-form-item>
        <el-form-item label="销售部" v-if="userInfo.role.roleId !=7" >
            
            <el-input v-model="detail.departmentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="销售员">
           <el-input v-model="detail.personnelName" disabled></el-input>
        </el-form-item>
       
        <!-- <el-form-item label="所属省份">
  
               <el-select clearable class="width280" v-model="detail.province" @change="detailProvinceChange" placeholder="请选择所属省份" :disabled="type == 1?true:false">
                   
                    <el-option 
                    v-for="item in province "
                     :key="item.pid" 
                    :label="item.pname" 
                    :value="String(item.pid)">
                    </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="所属城市">
           <el-select clearable class="width280" v-model="detail.city" @change="detailCityChange" placeholder="请选择所属城市" :disabled="type == 1?true:false">
               
                <el-option 
                v-for="item in detailCity "
                 :key="item.cid" 
                :label="item.cname" 
                :value="String(item.cid)">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属地区">
                
               <el-select clearable class="width280" v-model="detail.district"  placeholder="请选择所属地区" :disabled="type == 1?true:false">
                <el-option 
                v-for="item in detailDistrict " 
                :key="item.did" 
                :label="item.dname" 
                :value="String(item.did)">
                </el-option>
                </el-select>
            </el-form-item> -->
             <el-form-item label="是否有效" prop="isValid">
           <el-select clearable class="width280" v-model="detail.isValid" :disabled="type == 1?true:false" placeholder="请选择是否有效">
               
                 <el-option 
                v-for="item in valid "
                 :key="Number(item.key)" 
                :label="item.label" 
                :value="Number(item.key)">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="无效原因" v-if='detail.isValid == 0' prop="invalidCause">
                <el-input class="width280" placeholder="请输入无效原因" :disabled="type == 1?true:false" v-model="detail.invalidCause"></el-input>
            </el-form-item>
             <el-form-item label="关键词" >
                <el-input class="width280" placeholder="请输入关键词" :disabled="type == 1?true:false" v-model="detail.keyword"></el-input>
            </el-form-item>
            
            <el-form-item label="详细地址" prop="address">
                <el-input class="width280" placeholder="请输入详细地址" v-model="detail.address" :disabled="type == 1?true:false"></el-input>
            </el-form-item>
            <el-form-item label="分配时间" prop="disTime" v-if="type == 1">
              <el-input class="width280" v-model="detail.disTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="留言" prop="leaveWord" v-if="type == 1">
              <div  v-html="detail.leaveWord" class="center width280"></div>

            </el-form-item>
             <el-form-item label="留言" prop="leaveWord" v-else>
              <el-input
                style="width:480px"
                type="textarea"
                show-word-limit
                maxlength="1000"
                resize='none'
                placeholder="请输入内容"
                v-model="detail.leaveWord">
                </el-input>
                
            </el-form-item>
        </el-form>
        </div>
        <div class="formContenView" v-if="type != 0">
          <div>
            <div class="title">跟踪记录</div>
            <div class="center">
              <div class="record" v-if="detail.record.length">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item,index) in detail.record"
                    :key="index"
                    size="large"
                    :timestamp="item.fuTime"
                  >
                    <el-card>
                      <h4 :class="item.roleId != 7?'manager':''">{{item.remark}}</h4>
                      <p>{{item.fupName}}</p>
                      <el-button type="text" @click="delFollowList(item)" slot="reference">删除</el-button>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div v-else>暂无跟踪记录</div>
            </div>
            <el-button @click="updataFollowList" type="primary">保存记录</el-button>
            <div class="center lMessage">
              <el-input
                clearable
                type="textarea"
                show-word-limit
                maxlength="1000"
                placeholder="请输入内容"
                resize="none"
                v-model="message"
              ></el-input>
            </div>
          </div>
    </div>
      </div>
        

        <span slot="footer" class="dialog-footer">
            <el-button @click="detailFlag = false;">取 消</el-button>
            <el-button type="primary" @click="suerAdd()">确 定</el-button>
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
import {detailCustomer,updateFollow,followList,updateCustomer
    } from '@/api/custormer'
import {loginOut,updatePassword} from '@/api/user'
import {dictApi,initDate} from "@/utils"
import {projectList} from '@/api/project'
import {accountList} from '@/api/user'
import {departmentList,userDepartmentList} from '@/api/department'
import md5 from 'md5'
     export default{
        data(){
            return{
                type:2,
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
                },
                detail:{
                    record:[]
                },
                detailFlag:false,
                detailRules:{
                 name:[
                      { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                adMan:[
                     { required: true, message: '请选择广告负责人', trigger: 'blur' },
                ],
                address:[
                     { required: true, message: '请输入详细地址', trigger: 'blur' },
                ],
                sourceLink:[
                     { required: false, message: '请输入来源连接', trigger: 'blur' },
                ],
                type:[
                     { required: true, message: '请输入客户类型', trigger: 'blur' },
                ],
                project:[
                     { required: true, message: '请选择项目', trigger: 'blur' },
                ],
                platform:[
                     { required: true, message: '请选择平台', trigger: 'blur' },
                ],
                isValid:[
                     { required: true, message: '请选择是否有效', trigger: 'blur' },
                ],
                invalidCause:[
                     { required: true, message: '请输入无效原因', trigger: 'blur' },
                ],
                telephone:[
                     { required: true, message: '请输入联系方式', trigger: 'blur' },
                ],
              

            },
                saleList:[],
                userList:[],
                currentType:[],
                projectList:[],
                departmentList:[],
                message:'',
                valid:[{
                    key:1,
                    label:"有效"
                },
                {
                    key:0,
                    label:"无效"
                }
                ],
            }
        },
        async created(){
            
            this.userInfo =JSON.parse(sessionStorage.getItem("userInfo")) 
            console.log(this.userInfo)
            await this.dist()
           await this.notReadMsg()
            await this.msgList()
        },
        methods:{
            async suerAdd(){
          try {
        this.$refs['detail'].validate((valid) => {
          if (valid) {
                this.$confirm('是否确认新增客户', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=>{
                    let date = new Date(`${initDate()} 00:00`);
                    let nextFollowUpDate = new Date(this.detail.nextFollowUpDate)
                    if(nextFollowUpDate.getTime() - date.getTime() == 0){
                        return this.$message.warning('请精确到分秒（请勿输入00：00）')
                    }
                    this.detail.department = this.userInfo.did;
                    if(this.userInfo.role.roleId == 7){
                        this.detail.personnel = this.userInfo.id;
                    }
                    
                    let res = await updateCustomer(this.detail);
                    this.$message.success(res.returnMsg)
                    this.notReadMsg() 
                    this.detailFlag =  false;
                })
          } else {
            this.$message.warning("请填写所需信息")
            return false;
          }
        });
              
          
         
        } catch (error) {
            console.log(error)
        }
        
      },
            async updataFollowList(){
         this.$loading.show()
         try {
             
             let obj = {
             ctId:this.detail.id,
             remark:this.message
            }

            let res = await updateFollow(obj)
            let follow = await followList({id:this.detail.id});
            this.message = '';
            this.detail.record = follow.data;

         } catch (error) {
             console.log(error)
             this.$loading.hide()
         }
         this.$loading.hide()
         
     },
            resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach(item =>{
         this.departmentList.push(item)
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
       
        if(obj.child.length){
          obj.child.forEach((item)=>{
           
           this.departmentList.push(item)
           
            this.sonsTree(item)
          })
        }
      },
            async dist(){
        // let province = await provinceList();
        // this.province = province.data;
        // this.detailProvince = province.data;
       
        
        //  
        this.platform = await dictApi("platform");
        this.currentType = await dictApi('currentType');
        let userList = await accountList({roleId:8});
        this.userList = userList.data;
        // let saleList = await accountList({roleId:7});
        // this.saleList = saleList.data;
        let departObj = {
            id:this.userInfo.did,
            viewSale:1
        }
        let saleList = await userDepartmentList(departObj);
        this.saleList = saleList.data;
        let project = await projectList();
        this.projectList = project.data;
                 //this.search.department = this.userInfo.did;

         let department = await departmentList();
        this.resetList(department.data);
        // if(this.userInfo.role.roleId !=7){
        //      let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
        //     this.personnel = personnel.data;
        // }
       
          console.log(this.projectList,21312)
      
    },
            async customerDetail(item){
                console.log(item)
                try {
                    let detail = await detailCustomer({id:item.ctId})
                    if(detail.data.sourceLink){
                        detail.data.sourceLink = detail.data.sourceLink.indexOf('?')<0?detail.data.sourceLink:detail.data.split('?')[0];
                    }
                    this.detail = {...detail.data,record:[]};
                    let res = await followList({id:item.ctId});
                    this.detail.record = res.data;
                    this.detailFlag = true;
                } catch (error) {
                    console.log(error)
                }
                
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
            .userInfo{
                padding:0 10px;
            }
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