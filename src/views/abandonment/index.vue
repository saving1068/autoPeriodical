<template>
  <div class="warp" v-loading="loading">
    <el-form inline class="form-inline" label-width="100px">
      <el-form-item label="客户姓名" width="100%">
        <el-input class="width280" v-model="search.name" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <!-- <el-form-item label="广告负责人" >
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
        </el-form-item>
        <el-form-item label="项目">
           <el-select clearable  class="width280" v-model="search.project" placeholder="请选择项目">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
            </el-select>
      </el-form-item>-->
      <el-form-item label="手机号码">
        <el-input class="width280" placeholder="请输入手机号码" v-model="search.telephone"></el-input>
      </el-form-item>
      <el-form-item label="销售员" v-if="filterButton(110)">
        <el-select clearable class="width280" v-model="search.personnel" placeholder="请选择销售员">
          <el-option
            v-for="item in saleList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售部门" v-if="filterButton(110)">
        <el-select clearable class="width280" v-model="search.department" placeholder="请选择销售部门">
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
      </el-form-item>-->
      <!--
        <el-form-item label="销售员" > 经理
           <el-select clearable class="width280" v-model="search.personnel" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="销售部" > 经理 
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
        <el-form-item label="是否已成交">
           <el-select clearable  class="width280" v-model="search.isSuccess" placeholder="请选择是否已成交">
            <el-option
                v-for="item in isSuccess"
                :key="item.index"
                :label="item.value"
                :value="item.key"
            ></el-option>
            </el-select>
      </el-form-item>-->
      <el-form-item label="是否已来访">
        <el-select
          clearable
          class="width280"
          disabled
          v-model="search.isVisit"
          placeholder="请选择是否已来访"
        >
          <el-option
            v-for="item in visitSelect"
            :key="item.index"
            :label="item.lable"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-select clearable class="width280" v-model="search.isValid" placeholder="请选择是否有效">
          <el-option
            v-for="item in valid "
            :key="Number(item.key)"
            :label="item.label"
            :value="Number(item.key)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否当天跟进客户">
        <el-select clearable class="width280" v-model="nowDate" placeholder="请选择是否当天跟进客户">
          <el-option
            v-for="item in nowList"
            :key="Number(item.key)"
            :label="item.label"
            :value="Number(item.key)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select clearable class="width280" v-model="search.type" placeholder="请选择客户类型">
          <el-option
            v-for="item in currentType"
            :key="String(item.key)"
            :label="item.value"
            :value="String(item.key)"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="获取时间" >
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            @change='deteChange'
            value-format='yyyy-MM-dd'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="分配时间">
        <el-date-picker
          v-model="disTime"
          type="daterange"
          range-separator="至"
          @change="disTimeChange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <div class="center">
        <el-button type="primary" @click="customerList" icon="el-icon-seach">搜索</el-button>
      </div>
    </el-form>
    <div class="table">
      <div class="button">
        <!-- <el-button type="primary" @click='addDetail(0)'>新增客户</el-button>
        <el-button type="danger" @click="waiveCustomerList">批量放弃</el-button>-->
        <el-button type="warning" @click="getTransferList">批量转移</el-button>
        <!-- <el-button >导出</el-button> -->
      </div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        @row-dblclick="rowDblclic"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="客户姓名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="手机号码"></el-table-column>
        <el-table-column align="center" prop="adManName" label="广告负责人"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="address" label="详细地址"></el-table-column>
        <el-table-column prop="departmentName" align='center' label="销售部">
            </el-table-column>
            <el-table-column prop="personnelName" align='center' label="销售员">
            </el-table-column>
        <!-- <el-table-column align="center" prop="getDate" label="获取时间"></el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" >成交</el-button> -->
            <el-button
              type="text"
              v-show="filterButton(102)"
              @click.native="transfer(scope.row)"
            >转接给他人</el-button>
            <el-button
              type="text"
              v-show="filterButton(108)"
              @click.native="rowDblclic(scope.row,0)"
            >编辑</el-button>
            <el-button  type="text" @click.native="deleteCustomerList(scope.row)" >删除</el-button>
            <el-button
              type="text"
              v-show="filterButton(106)"
              @click.native="rowDblclic(scope.row,1)"
            >详情</el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style=" padding:20px;"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增已付金额管理 -->
    <el-dialog title="新增已付金额管理" :visible.sync="amountInfoVisi" width="30%" center>
      <el-form>
        <el-form-item label="金额">
          <el-input v-model="amountInfo.money" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="amountInfo.remark" placeholder="金额"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="amountInfoVisi = false">取 消</el-button>
        <el-button type="primary" @click="sureAddAmount">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 已付金额管理 -->
    <el-dialog :title="amountTitle" :visible.sync="amountVisi" width="80%" center>
      <div>
        <el-button type="primary" @click="addAmountList()">新增已付金额管理</el-button>
      </div>
      <div class="center">
        <el-table :data="amountList" style="width: 100%">
          <el-table-column align="center" prop="payeeName" label="创建人" width="180"></el-table-column>
          <el-table-column align="center" prop="money" label="金额(远)"></el-table-column>
          <el-table-column align="center" prop="remark" label="备注"></el-table-column>
          <el-table-column align="center" prop="colTime" label="创建日期" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button style="margin:0 10px" type="primary" @click="addAmountList(scope.row)">修改</el-button>
              <el-button @click="delAmountList(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="amountVisi = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 放弃 -->
    <el-dialog title="批量放弃" :visible.sync="waiveVisi" width="30%" center>
      <div class="center">
        <el-input v-model="waiveInfo.invalidCause" placeholder="请输入放弃原因"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="waiveVisi = false">取 消</el-button>
        <el-button type="primary" @click="sureWaiveVisi">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 批量转移 -->
    <el-dialog title="批量转移" :visible.sync="transferListVisi" width="30%" center>
      <div class="center">
        <el-select
          clearable
          v-model="transferListInfo.receiver "
          style="padding:20px 0;"
          placeholder="请选择销售员"
        >
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
    </el-dialog>   
    -->

    <!-- 移交  -->
    <el-dialog
      title="分配记录"
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
            :timestamp="item.disTime"
          >
            <p>{{item.dispName?item.dispName+'分配':item.remark}}至--{{item.receiverName}}</p>
          </el-timeline-item>
        </el-timeline>
        <div v-else>暂无记录</div>
        <div class="center width280 divider">
          <div class="el-dialog__title" style="padding-bottom:10px">客户移交</div>
          <el-input placeholder="请输入备注" v-model="transferInfo.remark"></el-input>
          <el-select
            clearable
            v-model="transferInfo.receiver "
            style="padding:20px 0;"
            placeholder="请选择销售员"
          >
            <el-option
              v-for="item in saleList"
              :key="item.id"
              :label="item.contactName"
              :value="item.id"
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
      :before-close="handleClose"
    >
    <div class="formCenter">
        <div :class="[type != 1?'formContenView100':'formContenView']">
          <div class="title">基本信息</div>
          <el-form
            inline
            class="form-inline"
            label-width="100px"
            :rules="detailRules"
            :model="detail"
            ref="detail"
          >
            <el-form-item label="客户姓名" width="100%" prop="name">
              <el-input
                class="width280"
                v-model="detail.name"
                placeholder="请输入客户姓名"
                :disabled="type == 1?true:false"
              ></el-input>
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
              <div class="width280">{{detail.adManName||'--'}}</div>
            </el-form-item> -->

            <el-form-item label="平台" prop="platform">
              <el-select
                clearable
                class="width280"
                v-model="detail.platform"
                placeholder="请选择平台"
                :disabled="type != 0?true:false"
              >
                <el-option
                  v-for="item in platform"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="电子邮箱">
              <el-input
                class="width280"
                placeholder="请输入电子邮箱"
                v-model="detail.email"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目" prop="project">
              <el-select clearable  class="width280" v-model="detail.project" placeholder="请选择项目" :disabled="type == 1?true:false">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
           
              </el-select>
              <div class="width280">{{detail.projectName||'--'}}</div>
            </el-form-item> -->

            <el-form-item label="下次跟进时间">
              <el-date-picker
                class="width280"
                :disabled="type == 1?true:false"
                v-model="detail.nextFollowUpDate"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="QQ号码">
              <el-input
                class="width280"
                placeholder="请输入QQ号码"
                v-model="detail.qq"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="手机号" prop="telephone">
              <el-input
                class="width280"
                placeholder="请输入手机号"
                v-model="detail.telephone "
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input
                class="width280"
                placeholder="请输入微信"
                v-model="detail.wechat "
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="来源连接" prop="sourceLink">
              <a target="_blank" style='display:block;height:28px;width:280px' v-if="type==1" :href="detail.sourceLink">{{detail.sourceLink}}</a>
            <el-input class="width280" v-else placeholder="请输入来源连接" v-model="detail.sourceLink "></el-input>
            </el-form-item>
            <el-form-item label="资源类别" prop="resourceType">
                <el-select clearable  class="width280" v-model="detail.resourceType" placeholder="请选择资源类别" :disabled="type == 1?true:false">
                <el-option
                    v-for="item in resourceType"
                    :key="String(item.key)"
                    :label="item.value"
                    :value="Number(item.key)"
                ></el-option>
                
                </el-select>
            </el-form-item>
            <el-form-item label="客户类型">
              <el-select
                clearable
                class="width280"
                v-model="detail.type"
                placeholder="请选择客户类型"
                :disabled="type == 1?true:false"
              >
                <el-option
                  v-for="item in currentType"
                  :key="String(item.key)"
                  :label="item.value"
                  :value="String(item.key)"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="销售部人员" v-if="userInfo.role.roleId !=7" >
            <el-select clearable  class="width280" v-model="detail.personnel" placeholder="请选择客户类型" :disabled="type == 1?true:false">
                <el-option
                    v-for="item in personnel"
                    :key="item.id"
                    :label="item.contactName"
                    :value="item.id"
                ></el-option>
           
            </el-select>
            </el-form-item>-->
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
            </el-form-item>-->
            <!-- <el-form-item label="是否有效" >
           <el-select clearable class="width280" v-model="detail.isValid" :disabled="type == 1?true:false" placeholder="请选择是否有效">
               
                <el-option 
                v-for="item in valid "
                 :key="item.key" 
                :label="item.label" 
                :value="item.key">
                </el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="无效原因">
              <el-input
                class="width280"
                placeholder="请输入无效原因"
                :disabled="type == 1?true:false"
                v-model="detail.invalidCause"
              ></el-input>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input class="width280" disabled placeholder="请输入关键词" v-model="detail.keyword"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input
                class="width280"
                placeholder="请输入详细地址"
                v-model="detail.address"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="分配时间" prop="disTime" v-if="type == 1">
              <el-input class="width280" v-model="detail.disTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="留言" prop="leaveWord" v-if="type == 1">
              <div v-html="detail.leaveWord" class="center"></div>

            </el-form-item>
             <el-form-item label="留言" prop="leaveWord" v-else>
              <el-input
                class="width280" 
                style="width:510px"
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
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" v-if="type != 1" @click="suerAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  updateCustomer,
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
  waiveList,
  updataDistribution
} from "@/api/custormer";
import { districtList, cityList, provinceList } from "@/api/region";
import {
  updataBackcourtPaid,
  backcourtPaidList,
  deleteBackcourtPaid,
  updataFrontPaid,
  frontPaidList,
  deleteFrontPaid
} from "@/api/amount";
import { projectList } from "@/api/project";
import { userDepartmentList } from "@/api/department";
import { accountList } from "@/api/user";
import { dictApi, idChangeStr, filterButton ,encryptionTel} from "@/utils";
let customerInfo = {
  adMan: "", //广告负责人
  department: "", //销售部
  platform: "", //逾期
  project: "", //项目
  qq: "", //有效
  personnel: "", //销售员
  nextFollowUpDate: "", //下次跟进时间
  province: "", //省
  city: "", //市
  district: "", //区
  address: "",
  telephone: "",
  wechat: "",
  name: "",
  sourceLink: "",
  type: "",
  email: ""
};
let amountInfo = {
  remark: "",
  money: ""
};
export default {
  data() {
    return {
      disTime: "",
      activeName: "first",
      filterButton: filterButton,
      visitTime: "",
      time: "",
      detailFlag: false,
      addVisible: false,
      transferVisible: false,
      transferList: [],
      transferInfo: {
        ctId: "",
        receiver: "",
        remark: ""
      },
      visit: false,
      visitList: [],
      visitInfo: {
        visitingTime: "",
        remark: ""
      },
      ifTransfer: true,
      ifAbandoned: false,
      detail: {
        record: []
      },
      message: "",
      customerInfo: {},
      type: 0,
      search: {
        name: "",
        adMan: "", //广告负责人
        platform: "", //平台
        project: "", //项目
        qq: "", //有效
        getDateBegin: "",
        getDateEnd: "",
        disTimeBegin: "",
        disTimeEnd: "",
        personnel: "", //销售员
        nextFollowUpDate: "", //下次跟进时间
        province: "", //省
        city: "", //市
        district: "", //区
        isSuccess: 0,
        isValid: 1,
        keyword: "",
        page: 1,
        limit: 10
      },
      tableData: [],
      province: [],
      city: [],
      district: [],
      userList: [], //广告人
      saleList: [], //销售
      platform: [], //平台
      projectList: [], //项目
      loading: false,
      detailProvince: [],
      detailCity: [],
      detailDistrict: [],
      detailRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        adMan: [
          { required: true, message: "请选择广告负责人", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        sourceLink: [
          { required: false, message: "请输入来源连接", trigger: "blur" }
        ],
        project: [{ required: true, message: "请选择项目", trigger: "blur" }],
        platform: [{ required: true, message: "请选择平台", trigger: "blur" }],
        resourceType:[
                     { required: true, message: '请输入资源类别', trigger: 'blur' },
                ],
        telephone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      currentType: [],
      userInfo: {},
      personnel: [],
      waiveInfo: {
        ids: [],
        invalidCause: ""
      },
      waiveVisi: false,
      transferListVisi: false,
      transferListInfo: {
        list: [],
        receiver: "",
        remark: ""
      },
      ctId: "",
      amountType: 0,
      amountTitle: "",
      amountVisi: false,
      amountList: [],
      amountInfoVisi: false,
      amountInfo: {},
      delAmount: false,
      total: 0,
      resourceType:[]
    };
  },
  async created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (this.userInfo.role.roleId != 7) {
      let personnel = await accountList({
        roleId: this.userInfo.role.roleId,
        did: this.userInfo.did
      });
      this.personnel = personnel.data;
    }
  },
  async mounted() {
    this.dist().then(() => {
      this.customerList();
    });
    // this.loading= false;
  },
  watch: {
    //   search:{
    //     async handler(value) {
    //     },
    //     deep: true
    //   },
  },
  methods: {
     deleteCustomerList(item){
           this.$confirm('确认删除该数据？')
          .then(async _ => {
              let obj = {
                  id:item.id
              }
            let res = await deleteCustomer(obj);
            this.$message.success(res.returnMsg);
            this.search.page = 1;
            this.customerList()
          })
          .catch(_ => {});
      },
    showDelAmount() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async delAmountList(item) {
      let res, list;
      let obj = {
        id: this.ctId
      };
      try {
        this.$confirm("删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            if (this.amountType == 0) {
              //前
              res = await deleteFrontPaid({ id: item.id });
              list = await frontPaidList(obj);
            } else {
              //后
              res = await deleteBackcourtPaid({ id: item.id });
              list = await await backcourtPaidList(obj);
            }
            this.amountList = list.data;
            this.$message({
              type: "success",
              message: res.returnMsg
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } catch (error) {}
    },
    async sureAddAmount() {
      this.$loading.show();
      try {
        let res = {};
        let list = [];
        let obj = {
          id: this.ctId
        };
        console.log(this.amountInfo);
        if (this.amountType == 0) {
          //前
          res = await updataFrontPaid(this.amountInfo);
          list = await frontPaidList(obj);
        } else {
          //后
          res = await updataBackcourtPaid(this.amountInfo);
          list = await await backcourtPaidList(obj);
        }
        this.amountList = list.data;
        this.amountInfoVisi = false;
        this.amountInfo = {};
        this.$message({
          type: "success",
          message: res.returnMsg
        });
      } catch (error) {
        console.log(error);
        this.$loading.hide();
      }
      this.$loading.hide();
    },
    addAmountList(item) {
      if (item) {
        let obj = {
          id: item.id,
          ctId: this.ctId,
          money: item.money,
          remark: item.remark
        };
        this.amountInfo = { ...obj };
      } else {
        this.amountInfo = { ...amountInfo, ctId: this.ctId };
      }
      console.log(this.amountInfo, item);
      this.amountInfoVisi = true;
    },
    async amount(item, type) {
      try {
        this.$loading.show();
        this.amountList = [];
        this.amountType = type;
        this.amountTitle = type == 0 ? "前场金额" : "后场金额";
        this.amountVisi = true;
        this.ctId = item.id;
        let obj = {
          id: item.id
        };
        let res = {};
        if (type == 0) {
          res = await frontPaidList(obj);
        } else {
          res = await backcourtPaidList(obj);
        }
        this.amountList = res.data;
        console.log(this.amountTitle);
      } catch (error) {
        console.log(error);
        this.$loading.hide();
      }
      this.$loading.hide();
    },

    waiveCustomerList() {
      if (this.waiveInfo.ids.length) {
        this.waiveVisi = true;
      } else {
        return this.$message.warning("请选择客户");
      }
    },
    waiveCustomer(item) {
      this.waiveInfo = {
        ids: [item.id],
        invalidCause: ""
      };
      // let res = await waiveCustomer(this.waiveInfo);
      this.waiveVisi = true;
    },
    async sureWaiveVisi() {
      this.$confirm("此操作将客户放入废弃池, 是否继续?", "提示", {
        //废弃
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            if (!this.waiveInfo.invalidCause) {
              return this.$message.warning("请输入放弃意见");
            }
            let res = await waiveCustomer(this.waiveInfo);
            this.waiveVisi = false;
            this.waiveInfo.invalidCause = "";
            this.customerList();
            this.$message({
              type: "success",
              message: res.returnMsg
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getTransferList() {
      if (this.transferListInfo.list.length) {
        this.transferListVisi = true;
      } else {
        return this.$message.warning("请选择客户");
      }
    },
    sureTransferListInfo() {
      this.$confirm("此操作将客户转移至所选销售员, 是否继续?", "提示", {
        //废弃
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (!this.transferListInfo.remark) {
            return this.$message.warning("请输入转移意见");
          }
          let list = [];
          this.transferListInfo.list.forEach(item => {
            console.log(item);
            let obj = {
              ctId: item.id,
              receiver: this.transferListInfo.receiver,
              remark: this.transferListInfo.remark
            };
            list.push(obj);
          });
          let obj = {
            list: list
          };
          console.log(obj);
          let res = await updataDistribution(obj);
          this.$message.success(res.returnMsg);
          this.transferListVisi = false;
          this.transferListInfo.remark = "";
          this.transferListInfo.receiver = "";
          this.customerList();
          this.$message({
            type: "success",
            message: res.returnMsg
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async dist() {
      console.log(this.userInfo, "------------------");
      this.loading = true;
      let province = await provinceList();
      this.province = province.data;
      this.detailProvince = province.data;

      //
      this.resourceType = await dictApi('resourceType')
      this.platform = await dictApi("platform");
      this.currentType = await dictApi("currentType");
      let userList = await accountList({ roleId: 8 });
      this.userList = userList.data;
      // let saleList = await accountList({roleId:7});
      // this.saleList = saleList.data;
      let departObj = {
        id: this.userInfo.did,
        viewSale: 1
      };
      let saleList = await userDepartmentList(departObj);
      this.saleList = saleList.data;
      let project = await projectList();
      this.projectList = project.data;
      // if(this.userInfo.role.roleId !=7){
      //      let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
      //     this.personnel = personnel.data;
      // }

      console.log(this.projectList, 21312);
    },

    async customerList() {
      //客户列表
      let res = await waiveList(this.search);
      console.log(res, 222222222222);
      res.data.map(item => {
          if(item.sourceLink){
             item.sourceLink = item.sourceLink.indexOf('?')<0?item.sourceLink:item.sourceLink.split('?')[0];
         }
          if(this.userInfo.role.roleId !=7&&this.userInfo.role.roleId !=1){
            item.telephone = encryptionTel(item.telephone)
          }
          
        });
      this.tableData = res.data;
      this.total = res.total;
      this.loading = false;
    },
    async provinceChange(value) {
      if (value) {
        this.search.city = "";
        this.search.district = "";
        let city = await cityList({ fid: value });
        this.city = city.data;
      }
    },
    async cityChange(value) {
      if (value) {
        // this.district = [];
        this.search.district = "";
        let district = await districtList({ fid: value });
        this.district = district.data;
      }
    },
    async detailProvinceChange(value) {
      if (value) {
        this.detail.city = "";
        this.detail.district = "";
        let city = await cityList({ fid: value });
        this.detailCity = city.data;
      }
    },
    async detailCityChange(value) {
      if (value) {
        // this.district = [];
        this.detail.district = "";
        let district = await districtList({ fid: value });
        this.detailDistrict = district.data;
      }
    },
    async getVisitList(item) {
      //来访记录
      this.$loading.show();
      try {
        this.visit = true;
        let res = await visitList({ id: item.id });
        this.visitList = res.data;
        this.visitInfo.ctId = item.id;
      } catch (error) {
        this.$loading.hide();
      }

      this.$loading.hide();
    },
    async suerAddVisi() {
      console.log(this.visitInfo);
      this.$loading.show();
      try {
        let res = await updataVisitList(this.visitInfo);
        this.$message.success(res.returnMsg);
        let resList = await visitList({ id: this.visitInfo.ctId });
        this.visitList = resList.data;
        this.visitInfo.visitTime = "";
      } catch (error) {
        console.log(error);
        this.$loading.hide();
      }
      this.$loading.hide();
    },
    canclSuccess() {
      //放弃
      this.ifSuccess = false;
    },
    async sureSuccess(item) {
      try {
        let obj = {
          id: item.id,
          isSuccess: 1
        };
        let res = await updateCustomer(obj);
        this.$message.success(res.returnMsg);
        this.customerList();
      } catch (error) {}
    },
    async transfer(item) {
      try {
        this.$loading.show();
        this.transferVisible = true;

        let res = await distributionList({ id: item.id });
        this.transferList = res.data;
        this.transferInfo.ctId = item.id;
      } catch (error) {
        this.$loading.hide();
      }

      this.$loading.hide();
    },
    async suerAddTransfer() {
      this.$loading.show();
      try {
        console.log(this.transferInfo);
        let list = [this.transferInfo];
        console.log(list);
        let res = await updataDistribution({ list });
        this.$message.success(res.returnMsg);
        let resList = await distributionList({ id: this.transferInfo.ctId });
        this.transferList = resList.data;
      } catch (error) {
        console.log(error);
        this.$loading.hide();
      }
      this.$loading.hide();
    },
    transferClose() {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
          this.transferVisible = false;
        // })
        // .catch(_ => {});
    },
    addClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.addVisible = false;
        })
        .catch(_ => {});
    },
    handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
          this.detailFlag = false;
        // })
        // .catch(_ => {});
    },
    disTimeChange(value) {
      if (value) {
        this.search.disTimeBegin = value[0];
        this.search.disTimeEnd = value[1];
      } else {
        this.search.disTimeBegin = "";
        this.search.disTimeEnd = "";
      }
    },
    deteChange(value) {
      if (value) {
        this.search.getDateBegin = value[0];
        this.search.getDateEnd = value[1];
      } else {
        this.search.getDateBegin = "";
        this.search.getDateEnd = "";
      }
    },

    async suerAdd() {
      try {
        this.$refs["detail"].validate(valid => {
          if (valid) {
            this.$confirm("是否确认新增客户", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(async () => {
              this.detail.department = this.userInfo.did;
              if (this.userInfo.role.roleId == 7) {
                this.detail.personnel = this.userInfo.id;
              }
              let res = await updateCustomer(this.detail);
              this.$message.success(res.returnMsg);
              this.customerList();
              this.detailFlag = false;
            });
          } else {
            this.$message.warning("请填写所需信息");
            return false;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    addDetail() {
      this.type = 0;
      this.detail = { ...customerInfo };
      this.detailFlag = true;
      console.log(this.detail, this.detailFlag);
    },
    async rowDblclic(item, value) {
      console.log(value, 123213);
      try {
        this.$loading.show();
        this.type = value;

        if (item) {
          if (item.city && item.district) {
            let city = await cityList({ fid: item.province });
            this.detailCity = city.data;
            let district = await districtList({ fid: item.city });
            this.detailDistrict = district.data;
          }

          let {
            adMan,
            department,
            platform,
            project,
            qq,
            personnel, //销售员
            nextFollowUpDate, //下次跟进时间
            province, //省
            city, //市
            district, //区
            address,
            telephone,
            wechat,
            name,
            sourceLink,
            type,
            email,
            keyword,
            leaveWord,
            disTime,
            invalidCause,
            resourceType,
            id
          } = { ...item };

          this.detail = {
            adMan,
            department,
            platform,
            project,
            qq,
            id,
            nextFollowUpDate, //下次跟进时间
            province, //省
            city, //市
            district, //区
            address,
            telephone,
            wechat,
            name,
            sourceLink,
            type,
            keyword,
            leaveWord,
            disTime,
            invalidCause,
            resourceType,
            email
          };

          let res = await followList({ id: item.id });

          this.detail.record = res.data;
          console.log(res);
        }
        this.detailFlag = true;
        console.log(this.detail);
      } catch (error) {
        this.$loading.hide();
      }
      this.$loading.hide();
    },
    async updataFollowList() {
      this.$loading.show();
      try {
        let obj = {
          ctId: this.detail.id,
          remark: this.message
        };

        let res = await updateFollow(obj);
        let follow = await followList({ id: this.detail.id });
        this.message = "";
        this.detail.record = follow.data;
      } catch (error) {
        console.log(error);
        this.$loading.hide();
      }
      this.$loading.hide();
    },
    handleSelectionChange(value) {
      console.log(value);
      let list = [];
      let transferListInfo = [];
      value.forEach(item => {
        list.push(item.id);
        transferListInfo.push(item);
      });
      this.waiveInfo.ids = list;
      this.transferListInfo.list = transferListInfo;
    },
    handleCurrentChange(val) {
      this.search.page = val;
      this.customerList();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang='scss'>
.lMessage {
  position: relative;
  padding-top: 20px;
  .lMessageSure {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 20px 10px 10px;
  }
  .el-textarea {
    .el-textarea__inner {
      padding-right: 60px;
    }
  }
}
</style>

<style scoped="scoped" lang="scss">
.width280 {
  width: 200px;
}
.divider {
  margin-left: 10px;
  padding: 0 10px;
  border-left: 1px solid #dcdfe6;
}
.table {
  .button {
    padding: 20px 0;
  }
}
.title {
  padding: 20px 0;
}
.record {
  width: 100%;
}
.formContenView100{
   width: 100%;
}
.manager {
  color: red;
}
</style>
