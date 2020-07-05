<template>
  <div class="warp" v-loading='loading'>
    <el-form inline class="form-inline" label-width='100px'>
        <!-- <el-form-item label="客户姓名" width='100%' >
           <el-input class="width280" v-model='search.name' placeholder='请输入客户姓名'></el-input>
        </el-form-item>
        <el-form-item label="广告负责人" >
            <el-select clearable class="width280" v-model="search.adMan" placeholder="请选择广告负责人">
            <el-option 
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.contactName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
       
        <el-form-item label="平台" >
           <el-select clearable class="width280" v-model="search.platform" placeholder="请选择平台">
           <el-option 
                v-for="item in platform"
                :key="Number(item.key)"
                :label="item.value"
                :value="Number(item.key)"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" >
            <el-input class="width280" placeholder="请输入电子邮箱" v-model="search.email"></el-input>
        </el-form-item> -->
        <el-form-item label="项目">
           <el-select clearable  class="width280" v-model="search.project" placeholder="请选择项目">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="手机号码" >
            <el-input class="width280" placeholder="请输入手机号码" v-model="search.telephone"></el-input>
        </el-form-item> -->
        <el-form-item label="销售员" v-if='filterButton(110)'> 
            <el-select clearable  class="width280"  v-model="search.personnel" placeholder="请选择销售员">
                <el-option 
                v-for="item in saleList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="销售部门"  v-if='filterButton(110)'> 
           <el-select clearable class="width280"  v-model="search.department" placeholder="请选择销售部门">
           
            <el-option 
                v-for="item in departmentList"
                :key="item.id"
                :label="item.description"
                :value="item.id"
            ></el-option>
            </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="下次跟进时间" >
            <el-date-picker class="width280"
                v-model="search.nextFollowUpDate"
                type="date"
                value-format='yyyy-MM-DD'
                placeholder="选择日期">
                </el-date-picker>
        </el-form-item> -->
         <!--
        <el-form-item label="所属人员" > 经理
           <el-select clearable class="width280" v-model="search.personnel" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属部门" > 经理 
           <el-select clearable class="width280" v-model="search.department" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="QQ号码" >
            <el-input class="width280" placeholder="请输入QQ号码" v-model="search.qq"></el-input>
        </el-form-item>
        <el-form-item label="所属省份">
               <el-select clearable v-model="search.province" @change="provinceChange" placeholder="请选择所属省份">
                <el-option 
                v-for="(item,index) in province " :key="index" 
                :label="item.pname" 
                :value="item.pid">
                </el-option>
                
                </el-select>
            </el-form-item>
        <el-form-item label="所属城市">
           <el-select clearable v-model="search.city" @change="cityChange" placeholder="请选择所属城市">
                <el-option 
                v-for="(item,index) in city " :key="index" 
                :label="item.cname" 
                :value="item.cid">
                </el-option>
                </el-select>
            </el-form-item>
         
            <el-form-item label="所属地区">
               <el-select clearable v-model="search.district"  placeholder="请选择所属地区">
                <el-option 
                v-for="(item,index) in district " :key="index" 
                :label="item.dname" 
                :value="item.did">
                </el-option>
                </el-select>
            </el-form-item>
        -->
        <!-- <el-form-item label="关键词" >
            <el-input class="width280" placeholder="请输入关键词" v-model="search.keyword"></el-input>
        </el-form-item>
        <el-form-item label="获取时间" >
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            @change='deteChange'
            value-format='yyyy-MM-dd'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="分配时间" >
            <el-date-picker
                v-model="disTime"
                type="daterange"
                range-separator="至"
                @change='disTimeChange'
                value-format='yyyy-MM-dd'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item> -->
         
        
        
        <div class='message'>
            <div style='color:red;width:500px;float:left'>【温馨提示】增加一条跟踪记录，客户会自动进入我的客户列表里。请对每个客户做好是否有效、客户类型标识。客户没有显示姓名，部分可以在留言内容（和客服的聊天内容）里面找到</div>
            <el-button type="primary" @click="customerList" icon="el-icon-seach">搜索</el-button>
        </div>
    </el-form>
    <div class='table'>
        <div class='button'>
            <!-- <el-button type="primary" @click='addDetail(0)'>新增客户</el-button> -->
            <el-button type="danger" @click="waiveCustomerList">批量放弃</el-button>
            <el-button type="warning" @click="getTransferList">批量转移</el-button>
            <!-- <el-button v-show='filterButton(109)'>导出</el-button> -->
        </div>
        <el-table
            :data="tableData"
            tooltip-effect="dark"
            @row-dblclick='rowDblclic'
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column prop="name" align='center' label="客户姓名">
            </el-table-column>
            <el-table-column prop="telephone" align='center' label="手机号码">
            </el-table-column>
            <el-table-column prop="adManName" align='center' label="广告负责人">
            </el-table-column>
             <el-table-column prop="projectName" align='center' label="项目名称">
            </el-table-column>
            <el-table-column prop="address" align='center' label="详细地址">
            </el-table-column>
            <el-table-column prop="departmentName" align='center' label="销售部">
            </el-table-column>
            <el-table-column prop="personnelName" align='center' label="销售员">
            </el-table-column>
            <el-table-column prop="disTime" align='center' label="分配时间">
            </el-table-column>
            <el-table-column prop="getDate" align='center' label="获取时间">
            </el-table-column>
            <!-- <el-table-column label="处理状态" prop='overdue'>
            
            </el-table-column> -->
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- <el-popconfirm
                        v-show='filterButton(101)' 
                        title="确定成交该数据？"
                        @onConfirm='sureSuccess(scope.row)'
                        @onCancel="canclSuccess"
                        :value='ifSuccess'
                        :tabindex='99'
                    >
                    <el-button style="margin-right:10px" type="text"  slot="reference">成交</el-button>
                    </el-popconfirm> -->
                   <!-- <el-button type="text" >成交</el-button> -->
                    <!-- <el-button type="text" v-show='filterButton(102)'  @click.native='transfer(scope.row)'>转接给他人</el-button> -->
                    <!-- <el-button type="text" v-show='filterButton(103)' @click.native='getVisitList(scope.row)'>来访记录</el-button> -->
                    <el-button type="text" v-show='filterButton(108)' @click.native='rowDblclic(scope.row,2)'>编辑</el-button>
                    <!-- <el-button type="text" v-show='filterButton(106)' @click.native='rowDblclic(scope.row,1)'>详情</el-button>  -->
                               
                    <!-- <el-button  type="text" v-show='filterButton(107)' @click.native="waiveCustomer(scope.row)" slot="reference">放弃</el-button> -->
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
    </div>

    <!-- 新增已付金额管理 -->
    <el-dialog
        title='新增已付金额管理'
        :visible.sync="amountInfoVisi"
        width="30%"
        center
    >
        <el-form  >
            <el-form-item label="金额">
                <el-input v-model="amountInfo.money" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="amountInfo.remark" placeholder="审批人"></el-input>
            </el-form-item>
         </el-form >
        <span slot="footer" class="dialog-footer">
            <el-button @click="amountInfoVisi = false">取 消</el-button>
             <el-button type="primary" @click="sureAddAmount">确 认</el-button>
        </span>
    </el-dialog> 



<!-- 已付金额管理 -->
     <el-dialog
        :title='amountTitle'
        :visible.sync="amountVisi"
        width="80%"
        center
    >
        <div>
            <el-button type="primary" @click="addAmountList()">新增已付金额管理</el-button>
        </div>
        <div class="center">
           <el-table
            :data="amountList"
            style="width: 100%">
             <el-table-column
              align='center'
                prop="payeeName"
                label="创建人"
                width="180">
            </el-table-column>
            <el-table-column
             align='center'
                prop="money"
                label="金额(远)">
            </el-table-column>
            <el-table-column
             align='center'
                prop="remark"
                label="备注">
            </el-table-column>
            <el-table-column
             align='center'
                prop="colTime"
                label="创建日期"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作"
                >
                 <template slot-scope="scope">
                   <el-button style="margin:0 10px" type="primary" @click="addAmountList(scope.row)">修改</el-button>
                  <el-button  @click="delAmountList(scope.row)" type="danger">删除</el-button>
                   
                </template>
            </el-table-column>
                
            </el-table>
        </div>
       
        <span slot="footer" class="dialog-footer">
            <el-button @click="amountVisi = false">取 消</el-button>
        </span>
    </el-dialog>  





    <!-- 放弃 -->
    <el-dialog
        title='批量放弃'
        :visible.sync="waiveVisi"
        width="30%"
        center
    >   
        <span slot="footer" class="dialog-footer">
            <el-button @click="waiveVisi = false">取 消</el-button>
            <el-button type="primary" @click="sureWaiveVisi">确 定</el-button>
        </span>
    </el-dialog>  

     <!-- 批量转移 -->
     <el-dialog
        title='批量转移'
        :visible.sync="transferListVisi"
        width="30%"
        center
    >
        <div class="center">
             <el-select clearable v-model="transferListInfo.receiver "  style="padding:20px 0;" placeholder="请选择销售员">
                <el-option 
                v-for="item in saleList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
            ></el-option>
            </el-select>
            <el-input v-model="transferListInfo.remark" placeholder="请输入转移原因"></el-input>
        </div>
       
        <span slot="footer" class="dialog-footer">
            <el-button @click="transferListVisi = false">取 消</el-button>
            <el-button type="primary" @click="sureTransferListInfo">确 定</el-button>
        </span>
    </el-dialog>  





    <!-- 来访 -->
    <!-- <el-dialog
        title='来访记录'
        :visible.sync="visit"
        width="80%"
        center
        
    >
    <div class="center">
         <el-timeline style="width:50%" v-if="visitList.length">
            <el-timeline-item
                
                v-for="(item, index) in visitList"
                :key="index"
                :timestamp="item.visitingTime">
                <el-card  >
                        <h4>{{item.remark}}</h4>
                        <p style="text-align:right">创建人:{{item.receiverName}}</p>
                    </el-card>
            </el-timeline-item>
            
        </el-timeline>
        <div v-else>暂无记录</div>
        <div class="center width280 divider" >
            <el-input placeholder="请输入备注" v-model="visitInfo.remark"></el-input>
            <el-date-picker
             style="padding:20px 0;"
             v-model="visitInfo.visitingTime"
             value-format='yyyy-MM-dd'
            type="date"
            placeholder="选择日期">
            </el-date-picker>
           
             <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="suerAddVisi">新增来访记录</el-button>
            </span>
        </div>
        
    </div>
       
        <span slot="footer" class="dialog-footer">
            <el-button @click="visit = false">取 消</el-button>
            <el-button type="primary" @click="visit = false">确 定</el-button>
        </span>
    </el-dialog>    -->



    <!-- 移交 -->
    <el-dialog
        title='分配记录'
        :visible.sync="transferVisible"
        width="80%"
        center
        :before-close="transferClose" 
    >
    <div class="center">
         <el-timeline style="width:50%" v-if="transferList.length">
            <el-timeline-item
                v-for="(item, index) in transferList"
                :key="index"
                :timestamp="item.disTime">
                <p>{{item.dispName?item.dispName+'分配':item.remark}}至--{{item.receiverName}}</p>
               
            </el-timeline-item>
        </el-timeline>
        <div v-else>暂无记录</div>
        <div class=" divider" >
            <div class="el-dialog__title" style="padding-bottom:10px">客户移交</div>
            <el-input placeholder="请输入备注" v-model="transferInfo.remark"></el-input>
            <el-select clearable v-model="transferInfo.receiver "  style="padding:20px 0;" placeholder="请选择销售员">
                <el-option 
                v-for="item in saleList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
            ></el-option>
            </el-select>
             <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="suerAddTransfer">新增分配记录</el-button>
            </span>
        </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="transferClose">取 消</el-button>
            <el-button type="primary" @click="transferVisible = false">确 定</el-button>
        </span>
    </el-dialog>   


    <!-- //详情 -->
    <el-dialog 
        :title="type == 1?'客户详情':'编辑客户'"
        :visible.sync="detailFlag"
        width="80%"
       
        center
        :before-close="handleClose">
        <div class="formCenter">
        <div class="formContenView">
          <div class="title">基本信息</div>
          <el-form inline class="form-inline" label-width='100px'  :rules="detailRules" :model="detail" ref="detail">
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
             
        </el-form-item> -->
       
        <el-form-item label="平台" prop="platform">
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
        </el-form-item>
        <el-form-item label="项目" prop="project">
           <!-- <el-select clearable  class="width280" v-model="detail.project" placeholder="请选择项目" :disabled="type == 1?true:false">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
           
            </el-select> -->
            <div class="width280">
                {{detail.projectName||'--'}}
            </div>
            
        </el-form-item>
        
        <el-form-item label="下次跟进时间" >
            <el-date-picker  style="width:200px" :disabled="type == 1?true:false"
                v-model="detail.nextFollowUpDate"
                type="datetime"
                :picker-options='limitDate'
                format='yyyy-MM-dd HH:mm'
                value-format='yyyy-MM-dd HH:mm'
                placeholder="选择日期">
                </el-date-picker>
        </el-form-item>
        <el-form-item label="QQ号码" >
            <el-input  class="width280" placeholder="请输入QQ号码" v-model="detail.qq" :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号" prop="telephone" >
            <el-input class="width280" placeholder="请输入手机号" v-model="detail.telephone " :disabled="type == 1?true:false"></el-input>
        </el-form-item> -->
        <el-form-item label="微信" >
            <el-input class="width280" placeholder="请输入微信" v-model="detail.wechat " :disabled="type == 1?true:false"></el-input>
        </el-form-item>
        <el-form-item label="来源连接" prop="sourceLink">
            <el-input class="width280" placeholder="请输入来源连接" v-model="detail.sourceLink " :disabled="type != 0?true:false"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" prop="type">
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
            
            <el-input class="width280" v-model="detail.departmentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="销售员">
           <el-input class="width280" v-model="detail.personnelName" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属省份">
  
               <el-select clearable class="width280" v-model="detal.province" @change="detailProvinceChange" placeholder="请选择所属省份" :disabled="type == 1?true:false">
                   
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
            <el-form-item label="无效原因" v-if='detail.isValid == 0'>
                <el-input class="width280" placeholder="请输入无效原因" :disabled="type == 1?true:false" v-model="detail.invalidCause"></el-input>
            </el-form-item>
            <el-form-item label="关键词" >
                <el-input class="width280" placeholder="请输入关键词" :disabled="type == 1?true:false" v-model="detail.keyword"></el-input>
            </el-form-item>
           
            <el-form-item label="详细地址" prop="address">
                <el-input class="width280" placeholder="请输入详细地址" v-model="detail.address" :disabled="type == 1?true:false"></el-input>
            </el-form-item>
            <el-form-item label="分配时间" prop="disTime">
              <el-input class="width280" v-model="detail.disTime" disabled></el-input>
            </el-form-item>
             <el-form-item label="留言" prop="leaveWord" v-if="type != 0">
             <el-input
                class="width280" 
                style="width:510px"
                type="textarea"
                disabled
                
                show-word-limit
                        maxlength="1000"
                resize='none'
                placeholder="请输入内容"
                v-model="detail.leaveWord">
                </el-input>
                <!-- <el-input class="width280" placeholder="请输入留言" v-model="detail.leaveWord" :disabled="true"></el-input> -->
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
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" v-if='type != 1' @click="suerAdd()">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
import {updateCustomer,
    customerList,
    detailCustomer,
    deleteCustomer,
    followList,
    deleteFollow,
    updateFollow,
    visitList,
    updataVisitList,
    deleteVisitList,
    distributionList,
    waiveCustomer,
    updataDistribution,
    customerSuccess
    } from '@/api/custormer'
import { 
    districtList,
    cityList,
    provinceList
} from '@/api/region'
import { 
    updataBackcourtPaid,backcourtPaidList,deleteBackcourtPaid,
    updataFrontPaid,frontPaidList,deleteFrontPaid
} from '@/api/amount'
  import {departmentList,userDepartmentList} from '@/api/department'
import {projectList} from '@/api/project'
import {accountList} from '@/api/user'
import { dictApi ,idChangeStr,filterButton,encryptionTel} from "@/utils";
let customerInfo = {
        adMan:'',//广告负责人
        department:"",//所属部门
        platform:"",//逾期
        project:'',//项目
        qq:'',//有效
        personnel:"",//所属人员
        nextFollowUpDate:'',//下次跟进时间
        province:'',//省
        city:"",//市
        district:'',//区
        address:"",
        telephone:"",
        wechat:'',
        name:'',
        sourceLink:"",
        type:"",
        email:'',
        isValid:''
    }
    let amountInfo = {
        remark:'',
        money:''
    }
export default {
  data() {
    return {
        disTime:'',
        activeName:"first",
        valid:[{
            key:1,
            label:"有效"
        },
        {
            key:0,
            label:"无效"
        }
        ],
        nextFollowUpDate:"",
        filterButton:filterButton,
        visitTime:'',
        time:'',
        detailFlag:false,
        addVisible:false,
        transferVisible:false,
        transferList:[],
        transferInfo:{
            ctId:"",
            receiver:'',
            remark:''
        },
        visit:false,
        visitList:[],   
        visitInfo:{
            visitingTime:'',
            remark:''
        },
        ifTransfer:true,
        ifAbandoned:false,
        detail:{
            adMan:'',//广告负责人
            department:"",//所属部门
            platform:"",//逾期
            project:'',//项目
            qq:'',//有效
            personnel:"",//所属人员
            nextFollowUpDate:'',//下次跟进时间
            province:'',//省
            city:"",//市
            district:'',//区
            address:"",
            telephone:"",
            wechat:'',
            name:'',
            sourceLink:"",
            type:"",
            email:'',
            record:[],
            isValid:''
        },
        message:'',
        customerInfo:{},
        type:0,
        search:{
            adMan:'',//广告负责人
            department:"",//所属部门
            platform:"",//逾期
            project:'',//项目
            qq:'',//有效
            getDateBegin:'',
            getDateEnd:"",
            disTimeBegin:'',
            disTimeEnd:'',
            personnel:"",//所属人员
            nextFollowUpDate:'',//下次跟进时间
            province:'',//省
            city:"",//市
            district:'',//区
            isSuccess:0,
            keyword:"",
            isFollowUp:0,
            page:1,
            limit:10
        },
            tableData:[],
            province:[],
            city:[],
            district:[],
            userList:[],//广告人
            saleList:[],//销售
            platform:[],//平台
            departmentList:[],
            projectList:[],//项目
            loading:false,
            detailProvince:[],
            detailCity:[],
            detailDistrict:[],
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
                telephone:[
                     { required: true, message: '请输入联系方式', trigger: 'blur' },
                ],
                isValid:[
                     { required: true, message: '请选择数据有效性', trigger: 'blur' },
                ],
               
            },
            currentType:[],
            userInfo:{},
            personnel:[],
            waiveInfo:{
                ids:[],
                // invalidCause:''
            },
            waiveVisi:false,
            transferListVisi:false,
            transferListInfo:{
                list:[],
                receiver:'',
                remark:''
            },
            ctId:'',
            amountType:0,
            amountTitle:'',
            amountVisi:false,
            amountList:[],
            amountInfoVisi:false,
            amountInfo:{},
            delAmount:false,
            ifSuccess:false,
            choiseItem:{},
            total:0,
            followFlag:false,
            limitDate:{
                disabledDate(time){
                    return time.getTime()<Date.now() -24*60*60*1000
                }
            }
        }
    
  },
    async  created(){
         
      this.userInfo =JSON.parse(sessionStorage.getItem("userInfo")) 
      console.log(this.userInfo,11111111111111111111111111111111111111)
    //    
       if(this.userInfo.role.roleId !=7){
             let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
            this.personnel = personnel.data;
        }
        
      
  },
   async mounted() {
    
    this.dist().then(()=>{
        this.customerList()
        
    })
        // this.loading= false;
  },
  watch:{
    //   search:{
    //     async handler(value) {
            
           
    //     },
    //     deep: true
    //   },
  },
  methods: {
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
        console.log(obj,'obj')
        if(obj.child.length){
          obj.child.forEach((item)=>{
           
           this.departmentList.push(item)
           
            this.sonsTree(item)
          })
        }
      }, 
      showDelAmount(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    async delAmountList(item){
        let res,list;
        let obj = {
                id:this.ctId
            }
        try {
            this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          if(this.amountType == 0){//前
                 res = await deleteFrontPaid({id:item.id})
                list = await frontPaidList(obj)
            }else{//后
                res = await deleteBackcourtPaid({id:item.id})
                list = await  await backcourtPaidList(obj)
            } 
            this.amountList = list.data;
            this.$message({
                    type: 'success',
                    message: res.returnMsg
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
            
           
        } catch (error) {
            
        }
    },
    async  sureAddAmount(){
         this.$loading.show();
        try {
            let res = {};
            let list = []
            let obj = {
                id:this.ctId
            }
            console.log(this.amountInfo)
            if(this.amountType == 0){//前
                res = await updataFrontPaid(this.amountInfo)
                list = await frontPaidList(obj)
            }else{//后
                res = await updataBackcourtPaid(this.amountInfo)
                list = await  await backcourtPaidList(obj)
            } 
             this.amountList = list.data;
             this.amountInfoVisi = false;
             this.amountInfo ={}
             this.$message({
                    type: 'success',
                    message: res.returnMsg
                });
        } catch (error) {
            console.log(error)
             this.$loading.hide();
        }
             this.$loading.hide();
      },
      addAmountList(item){
          if(item){
              let obj = {
                  id:item.id,
                  ctId:this.ctId,
                  money:item.money,
                  remark:item.remark
              }
              this.amountInfo = {...obj}
          }else{
              this.amountInfo = {...amountInfo,ctId:this.ctId}
          }
           console.log(this.amountInfo,item)
          this.amountInfoVisi = true
      },
    async  amount(item,type){
          try {
            this.$loading.show();
            this.amountList =[];
            this.amountType = type;
            this.amountTitle = type == 0?'前场金额':"后场金额";
            this.amountVisi = true;
            this.ctId = item.id;
            let obj = {
                id:item.id
            }
            let res = {};
            if(type == 0){
                res = await frontPaidList(obj)
            }else{
                 res = await backcourtPaidList(obj)
            }
            this.amountList = res.data;
            console.log(this.amountTitle)
          } catch (error) {
              console.log(error)
              this.$loading.hide()
          }
           this.$loading.hide()
          
      },


      waiveCustomerList(){
          if(this.waiveInfo.ids.length){
               this.waiveVisi = true;
          }else{
              return this.$message.warning("请选择客户")
          }
         
      },
     waiveCustomer(item){
        
            this.waiveInfo =  {
                ids:[item.id],
                // invalidCause:''
            }
            // let res = await waiveCustomer(this.waiveInfo);
            this.waiveVisi = true;

     },
    async sureWaiveVisi(){
         this.$confirm('此操作将客户放入废弃池, 是否继续?', '提示', {//废弃
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            try {
              
                let res = await waiveCustomer(this.waiveInfo);
                this.waiveVisi = false;
                // this.waiveInfo.invalidCause ='';
                this.customerList()
                this.$message({
                    type: 'success',
                    message: res.returnMsg
                });
            } catch (error) {
                console.log(error)
            }
           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
      getTransferList(){
          if(this.transferListInfo.list.length){
               this.transferListVisi = true;
          }else{
              return this.$message.warning("请选择客户")
          }
         
      },
     sureTransferListInfo(){
          this.$confirm('此操作将客户转移至所选销售员, 是否继续?', '提示', {//废弃
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            if(!this.transferListInfo.remark){
                return this.$message.warning('请输入转移意见')
            }
            let list = [];
            this.transferListInfo.list.forEach(item =>{
                console.log(item)
                let obj = {
                    ctId:item.id,
                    receiver: this.transferListInfo.receiver,
                    remark:this.transferListInfo.remark
                }
                list.push(obj)
            })
            let obj = {
                list:list
            }
            console.log(obj)
            let res = await updataDistribution(obj)
                this.$message.success(res.returnMsg)
             this.transferListVisi = false;
             this.transferListInfo.remark =''
              this.transferListInfo.receiver =''
             this.customerList()
            this.$message({
                type: 'success',
                message: res.returnMsg
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
    async dist(){
           console.log(this.userInfo,'------------------')  
         this.loading= true;
                  //this.search.department = this.userInfo.did;

        let province = await provinceList();
        this.province = province.data;
        this.detailProvince = province.data;
       
        
        //  
        this.platform = await dictApi("platform");
        this.currentType = await dictApi('currentType');
        let userList = await accountList({roleId:8});
        this.userList = userList.data;
        
        
        // let saleList = await accountList({roleId:7});
        // this.saleList = saleList.data;
        
        let project = await projectList();
        this.projectList = project.data;
        let departObj = {
            id:this.userInfo.did,
            viewSale:1
        }
         let saleList = await userDepartmentList(departObj);
        this.saleList = saleList.data;
        let department = await departmentList();
        this.resetList(department.data);
       
       
          console.log(this.projectList,21312)
      
    },

     async customerList(){//客户列表
        let res = await customerList(this.search)
        res.data.map(item => {
         
          item.sourceLink = item.sourceLink.indexOf('?')<0?item.sourceLink:item.split('?')[0];
          if(this.userInfo.role.roleId !=7&&this.userInfo.role.roleId !=1){
            item.telephone = encryptionTel(item.telephone)
          }
          
        });
        console.log(res,222222222222)
        this.tableData = res.data;
        this.total =res.total||0;
         this.loading= false;
      },
    async provinceChange(value){
          if(value){
                this.search.city =''
                this.search.district = '';
                let city = await cityList({fid:value});
                this.city = city.data;
            }
      },
    async cityChange(value){
            if(value){
                // this.district = [];
                 this.search.district = '';
                let district = await districtList({fid:value});
                this.district = district.data;
            }
      },
      async detailProvinceChange(value){
          if(value){
                this.detail.city =''
                this.detail.district = '';
                let city = await cityList({fid:value});
                this.detailCity = city.data;
            }
      },
    async detailCityChange(value){
            if(value){
                // this.district = [];
                 this.detail.district = '';
                let district = await districtList({fid:value});
                this.detailDistrict = district.data;
            }
      },
    async getVisitList(item){ //来访记录
        this.$loading.show()
        try {
            this.visit = true;
            let res = await visitList({id:item.id})
            this.visitList = res.data;
            this.visitInfo.ctId = item.id;
        } catch (error) {
            this.$loading.hide()
        }
        
        this.$loading.hide()
      },
     async suerAddVisi(){
         console.log(this.visitInfo)
          this.$loading.show()
        try {
          
            let res = await updataVisitList(this.visitInfo)
            this.$message.success(res.returnMsg)
            let resList = await visitList({id:this.visitInfo.ctId})
            this.visitList = resList.data;
            this.visitInfo.visitTime =''
        } catch (error) {
            console.log(error)
            this.$loading.hide()
        }
         this.$loading.hide()
     },
    canclSuccess(){//放弃
          this.ifSuccess = false;
      },
    async  sureSuccess(item){
           try {
              let obj = {
                  id:item.id,
              }
            let res = await customerSuccess(obj);
            
            this.$message.success(res.returnMsg);
            //  this.$emit('succreeRefresh');
            this.customerList()

          } catch (error) {
              console.log(error)
          }
      },
     async transfer(item){
         
           
        try { 
            this.$loading.show()
          this.transferVisible =  true;
         
           
            let res = await distributionList({id:item.id})
            this.transferList = res.data;
             this.transferInfo.ctId = item.id;
        } catch (error) {
            this.$loading.hide()
        }
        
        this.$loading.hide()
      },
      async suerAddTransfer(){
            this.$loading.show()
            try {
                console.log(this.transferInfo)
                let list = [this.transferInfo]
                console.log(list)
                let res = await updataDistribution({list})
                this.$message.success(res.returnMsg)
                let resList = await distributionList({id:this.transferInfo.ctId})
                this.transferList = resList.data;
            } catch (error) {
                console.log(error)
                this.$loading.hide()
            }
         this.$loading.hide()
      },
      transferClose(){
        //   this.$confirm('确认关闭？')
        //   .then(_ => {
            this.transferVisible =  false;
        //   })
        //   .catch(_ => {});
      },
      addClose(){
        //   this.$confirm('确认关闭？')
        //   .then(_ => {
            this.addVisible =  false;
        //   })
        //   .catch(_ => {});
      },
       handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
              this.$refs['detail'].resetFields
            this.detailFlag =  false;
        //   })
        //   .catch(_ => {});
      },
      disTimeChange(value){
          if(value){
              this.search.disTimeBegin = value[0];
              this.search.disTimeEnd = value[1];
          }else{
              this.search.disTimeBegin = '';
              this.search.disTimeEnd = '';
          }
      },
      deteChange(value){
          if(value){
              this.search.getDateBegin = value[0];
              this.search.getDateEnd = value[1];
          }else{
              this.search.getDateBegin = '';
              this.search.getDateEnd = '';
          }
      },

     async suerAdd(){
          try {
        this.$refs['detail'].validate((valid) => {
          if (valid) {
              let tips = this.type == 2?'是否确认修改客户':'是否确认新增客户';
                this.$confirm(tips, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=>{
                    this.detail.department = this.userInfo.did;
                    if(this.userInfo.role.roleId == 7){
                        this.detail.personnel = this.userInfo.id;
                    }
                    let res = await updateCustomer(this.detail);
                    this.$message.success(res.returnMsg)
                        this.customerList()
                         this.$refs['detail'].resetFields
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
      addDetail(){
          this.type = 0;
           this.detail = {...customerInfo};
           this.detailFlag =  true;
           console.log(this.detail,this.detailFlag) 
      },
     async rowDblclic(item,value){
          console.log(value,123213,item)
          try {
              this.$loading.show()
               this.type = value;
               this.choiseItem = {...item}
                if(item){
                    if(item.city&&item.district){
                        let city = await cityList({fid:item.province});
                         this.detailCity = city.data;
                         let district = await districtList({fid:item.city});
                        this.detailDistrict = district.data;
                    }
                  
                   let  {
                        adMan,
                        department,
                        platform,
                        project,
                        qq,
                        personnel,//所属人员
                        nextFollowUpDate,//下次跟进时间
                        province,//省
                        city,//市
                        district,//区
                        address,
                        telephone,
                        wechat,
                        disTime,
                        name,
                        sourceLink,
                        type,
                        email,
                        personnelName,departmentName,
                        id,isValid,
                        keyword,leaveWord,invalidCause
                    } = {...item}
                    
                    this.detail = { adMan,
                         department,
                        platform,
                        project,
                        qq,
                        disTime,
                        id,
                        nextFollowUpDate:nextFollowUpDate?nextFollowUpDate:"",//下次跟进时间
                        province,//省
                        city,//市
                        district,//区
                        address,
                        telephone,
                        wechat,
                        name,
                        sourceLink,
                        type,
                        email,
                        keyword,leaveWord,
                        personnelName,
                        departmentName,
                        isValid:isValid?isValid:isValid == 0?0:'',invalidCause
                        };
                        
                        this.followFlag = false;
                    let res = await followList({id:item.id})
                    this.followFlag = true;
                    
                    
                    this.detail.record = res.data
                    console.log(res)
                }
                this.detailFlag =  true;
                console.log(this.detail) 
          }catch (error) {
             this.$loading.hide()
         }
         this.$loading.hide()
         
      },
      delFollowList(item){
          if(this.type == 1){
              return
          }
         console.log(item)
         this.$confirm('是否删除跟踪记录', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=>{
                    let obj = {
                        id:item.id
                    }
                    this.followFlag = false;
                    let res = await deleteFollow(obj);
                    this.$message.success(res.returnMsg)
                   let followInfo = await followList({id:this.choiseItem.id})
                    
                    
                    
                    this.detail.record = followInfo.data;
                     this.followFlag = true;
                    console.log(this.detail.record)
                       
                })
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
      handleSelectionChange(value){
          console.log(value)
          let list = [];
          let transferListInfo = [];
          value.forEach(item=>{
              list.push(item.id)
              transferListInfo.push(item)
          })
          this.waiveInfo.ids = list;
          this.transferListInfo.list = transferListInfo;
          
      },
      handleCurrentChange(val) {
        this.search.page = val;
       this.customerList()
        console.log(`当前页: ${val}`);
      }
  }
};
</script>
<style lang='scss'>
    .lMessage{
         position:relative;
         padding-top:20px;
        .lMessageSure{
                position:absolute;
                right:0;
                bottom:0;
                padding:0 20px  10px 10px;
            }
        .el-textarea{
           
            
            .el-textarea__inner{
                padding-right: 60px;
            }
        }
        
    }
</style>

<style scoped="scoped" lang="scss">
    .width280{
        min-width: 200px;
    }
    .divider{
        margin-left:10px;
        padding: 0 10px;
        width: 200px;
        border-left: 1px solid #dcdfe6;
    }
    .table{
        
        .button{
            padding:20px 0;
        }
    }
    .title{
        padding: 20px 0;
    }
    .record{
        width: 100%;
    }
    .manager{
        color: red;
    }
    .message{
        // overflow:hidden;
       display: flex;
    align-items: center;
    }
</style>
