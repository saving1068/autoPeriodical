<template>
  <div class="warp" v-loading="loading">
    <el-form inline class="form-inline" label-width="100px">
      <el-form-item label="客户姓名" width="100%">
        <el-input class="width280" v-model="search.name" placeholder="请输入客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="广告负责人" v-if="showAdMan">
        <el-select clearable class="width280" v-model="search.adMan" placeholder="请选择广告负责人">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.contactName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="平台">
        <el-select clearable class="width280" v-model="search.platform" placeholder="请选择平台">
          <el-option
            v-for="item in platform"
            :key="Number(item.key)"
            :label="item.value"
            :value="Number(item.key)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input class="width280" placeholder="请输入手机号码" v-model="search.telephone"></el-input>
      </el-form-item>
      <el-form-item label="是否已成交">
        <el-select clearable class="width280" v-model="search.isSuccess" placeholder="请选择是否已成交">
          <el-option
            v-for="item in isSuccess"
            :key="item.index"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否已来访">
        <el-select clearable class="width280" v-model="search.isVisit" placeholder="请选择是否已来访">
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
          <el-option v-for="item in valid" :key="item.index" :label="item.lable" :value="item.key"></el-option>
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
      <el-form-item label="获取时间">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          @change="deteChange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
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
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        @row-dblclick="rowDblclic"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" align="center" label="客户姓名"></el-table-column>
        <el-table-column prop="telephone" align="center" label="手机号码"></el-table-column>
        <el-table-column prop="adManName" align="center" label="广告负责人"></el-table-column>
        <el-table-column prop="projectName" align="center" label="项目名称"></el-table-column>
        <el-table-column prop="address" align="center" label="详细地址"></el-table-column>
        <el-table-column prop="personnelName" align="center" label="销售员"></el-table-column>
        <el-table-column prop="disTime" align="center" label="分配时间"></el-table-column>
        <el-table-column prop="getDate" align="center" label="获取时间"></el-table-column>
        <el-table-column label="是否有效" align="center" prop="isSuccessStr">
          <template slot-scope="scope">{{scope.row.isValid == 0?'无效':'有效'}}</template>
        </el-table-column>
        <el-table-column label="是否已成交" align="center" prop="isSuccessStr"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
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

    <!-- //详情 -->
    <el-dialog
      :title="type == 1?'客户详情':'编辑客户'"
      :visible.sync="detailFlag"
      width="80%"
      center
      :before-close="handleClose"
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
            <el-form-item label="客户姓名" width="100%" prop="name">
              <el-input
                class="width280"
                v-model="detail.name"
                placeholder="请输入客户姓名"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="广告负责人" prop="adMan">
              <!-- <el-select class="width280" v-model="detail.adMan" placeholder="请选择广告负责人" :disabled="type == 1?true:false">
            <el-option 
                v-for="item in userList"
                :key="item.id"
                :label="item.contactName"
                :value="item.id"
            ></el-option>
            
              </el-select>-->
              <div class="width280">{{detail.adManName||'--'}}</div>
            </el-form-item>

            <el-form-item label="平台" prop="platform">
              <el-select
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
            <el-form-item label="电子邮箱">
              <el-input
                class="width280"
                placeholder="请输入电子邮箱"
                v-model="detail.email"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目" prop="project">
              <!-- <el-select  class="width280" v-model="detail.project" placeholder="请选择项目" :disabled="type == 1?true:false">
            <el-option
                v-for="item in projectList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id)"
            ></el-option>
           
              </el-select>-->
              <div class="width280">{{detail.projectName||'--'}}</div>
            </el-form-item>

            <el-form-item label="下次跟进时间">
              <el-date-picker
                class="width280"
                :disabled="type == 1?true:false"
                v-model="detail.nextFollowUpDate"
                type="date"
                value-format="yyyy-MM-DD"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="QQ号码">
              <el-input
                class="width280"
                placeholder="请输入QQ号码"
                v-model="detail.qq"
                :disabled="type == 1?true:false"
              ></el-input>
            </el-form-item>
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
              <el-input
                class="width280"
                placeholder="请输入来源连接"
                v-model="detail.sourceLink "
                :disabled="type != 0?true:false"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户类型" prop="type">
              <el-select
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
            <!-- <el-form-item label="所属部门人员" v-if="userInfo.role.roleId !=7" >
            <el-select  class="width280" v-model="detail.personnel" placeholder="请选择客户类型" :disabled="type == 1?true:false">
                <el-option
                    v-for="item in personnel"
                    :key="item.id"
                    :label="item.contactName"
                    :value="item.id"
                ></el-option>
           
            </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="所属省份">
  
               <el-select class="width280" v-model="detail.province" @change="detailProvinceChange" placeholder="请选择所属省份" :disabled="type == 1?true:false">
                   
                    <el-option 
                    v-for="item in province "
                     :key="item.pid" 
                    :label="item.pname" 
                    :value="String(item.pid)">
                    </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="所属城市">
           <el-select class="width280" v-model="detail.city" @change="detailCityChange" placeholder="请选择所属城市" :disabled="type == 1?true:false">
               
                <el-option 
                v-for="item in detailCity "
                 :key="item.cid" 
                :label="item.cname" 
                :value="String(item.cid)">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属地区">
                
               <el-select class="width280" v-model="detail.district"  placeholder="请选择所属地区" :disabled="type == 1?true:false">
                <el-option 
                v-for="item in detailDistrict " 
                :key="item.did" 
                :label="item.dname" 
                :value="String(item.did)">
                </el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="是否有效">
              <el-select
                class="width280"
                v-model="detail.isValid"
                :disabled="type == 1?true:false"
                placeholder="请选择是否有效"
              >
                <el-option
                  v-for="item in valid"
                  :key="item.index"
                  :label="item.lable"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="无效原因" v-if="detail.isValid == 0">
              <el-input
                class="width280"
                placeholder="请输入无效原因"
                :disabled="type == 1?true:false"
                v-model="detail.invalidCause"
              ></el-input>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input
                class="width280"
                placeholder="请输入关键词"
                :disabled="type == 1?true:false"
                v-model="detail.keyword"
              ></el-input>
            </el-form-item>

            <el-form-item label="详细地址" prop="address">
              <el-input
                class="width280"
                placeholder="请输入详细地址"
                v-model="detail.address"
                :disabled="type == 1?true:false"
              ></el-input>
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
                resize="none"
                placeholder="请输入内容"
                v-model="detail.leaveWord"
              ></el-input>
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
        <el-button type="primary" v-if="type != 1" @click="suerAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  updateCustomer,
  waitDisList,
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
  customerLive
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
import { departmentList } from "@/api/department";
import { projectList } from "@/api/project";
import { accountList } from "@/api/user";
import { dictApi, idChangeStr, filterButton,encryptionTel } from "@/utils";
let customerInfo = {
  adMan: "", //广告负责人
  department: "", //所属部门
  platform: "", //逾期
  project: "", //项目
  qq: "", //有效
  personnel: "", //所属人员
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
      valid: [
        {
          key: 1,
          lable: "有效"
        },
        {
          key: 0,
          lable: "无效"
        }
      ],
      visitSelect: [
        {
          key: 1,
          lable: "是"
        },
        {
          key: 0,
          lable: "否"
        }
      ],

      isSuccess: [
        { value: "是", key: 1 },
        { value: "否", key: 0 }
      ],
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
        adMan: "", //广告负责人
        department: "", //所属部门
        platform: "", //逾期
        project: "", //项目
        qq: "", //有效
        getDateBegin: "",
        getDateEnd: "",
        disTimeBegin: "",
        disTimeEnd: "",
        personnel: "", //所属人员
        nextFollowUpDate: "", //下次跟进时间
        province: "", //省
        city: "", //市
        district: "", //区
        keyword: "",
        telephone: "",
        isSuccess: "",
        isVisit: "",
        isValid: "",
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
      departmentList: [], //部门
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
        type: [{ required: true, message: "请输入客户类型", trigger: "blur" }],
        project: [{ required: true, message: "请选择项目", trigger: "blur" }],
        platform: [{ required: true, message: "请选择平台", trigger: "blur" }],
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
      choiseItem: {},
      total: 0,
      showAdMan: true
    };
  },
  async created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (
      this.userInfo.role.roleId == 1 ||
      this.userInfo.role.roleId == 3 ||
      this.userInfo.role.roleId == 6
    ) {
      this.showAdMan = true;
    } else {
      this.showAdMan = false;
    }

    //    if(this.userInfo.role.roleId !=7){
    //          let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
    //         this.personnel = personnel.data;
    //     }
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
      this.platform = await dictApi("platform");
      this.currentType = await dictApi("currentType");
      let userList = await accountList({ roleId: 8 });
      this.userList = userList.data;
      // let saleList = await accountList({roleId:7});
      // this.saleList = saleList.data;
      // let departObj = {
      //     id:this.userInfo.did,
      //     viewSale:1
      // }
      // let saleList = await userDepartmentList(departObj);
      // this.saleList = saleList.data;
      let project = await projectList();
      this.projectList = project.data;
      let department = await departmentList();
      this.resetList(department.data);
      console.log(this.departmentList);
      // if(this.userInfo.role.roleId !=7){
      //      let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
      //     this.personnel = personnel.data;
      // }

      console.log(this.projectList, 21312);
    },
    resetList(arr) {
      // console.log(arr)
      let pList = [];
      arr.forEach(item => {
        this.departmentList.push(item);
        if (item.child.length) {
          this.sonsTree(item);
          // console.log(son,'son')
        }
      });

      // console.log(pList,123123)
    },
    sonsTree(obj) {
      // console.log(obj.name,obj.child.length)
      // let son  = []
      console.log(obj, "obj");
      if (obj.child.length) {
        obj.child.forEach(item => {
          this.departmentList.push(item);

          this.sonsTree(item);
        });
      }
    },

    async customerList() {
      //客户列表
      try {
        this.loading = true;
        let res = await customerLive(this.search);
        console.log(res, 222222222222);
        console.log(this.userInfo.role.roleId !=7&&this.userInfo.role.roleId !=1,'console.log(this.userInfo.role.roleId)')
        res.data.map(item => {
          item.isSuccessStr = idChangeStr(this.isSuccess, item.isSuccess);
          
          if(this.userInfo.role.roleId !=7&&this.userInfo.role.roleId !=1){
            item.telephone = encryptionTel(item.telephone)
          }
          
        });
        this.tableData = res.data;
        this.total = res.total || 0;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
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
    canclAbandoned() {
      //放弃
      this.ifAbandoned = false;
    },
    sueAbandoned(item) {
      console.log(item);
    },
    canclTransfer() {
      //移交
      this.ifTransfer = false;
    },
    sueTransfer(item) {
      console.log(item);
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
      this.$confirm("确认关闭？")
        .then(_ => {
          this.transferVisible = false;
        })
        .catch(_ => {});
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
      this.detailFlag = false;
      //   try {
      // this.$refs['detail'].validate((valid) => {
      //   if (valid) {
      //       let tips = this.type == 2?'是否确认修改客户':'是否确认新增客户';
      //         this.$confirm('是否确认新增客户', "提示", {
      //             confirmButtonText: "确定",
      //             cancelButtonText: "取消",
      //             type: "warning"
      //         }).then(async()=>{
      //             this.detail.department = this.userInfo.did;
      //             if(this.userInfo.role.roleId == 7){
      //                 this.detail.personnel = this.userInfo.id;
      //             }
      //             let res = await updateCustomer(this.detail);
      //             this.$message.success(res.returnMsg)
      //                 this.customerList()
      //                 this.detailFlag =  false;
      //         })
      //   } else {
      //     this.$message.warning("请填写所需信息")
      //     return false;
      //   }
      // });

      // } catch (error) {
      //     console.log(error)
      // }
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
        this.choiseItem = { ...item };
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
            personnel, //所属人员
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
            invalidCause,
            id,
            isValid,
            disTime,
            keyword,
            leaveWord
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
            disTime,
            email,
            invalidCause,
            isValid: isValid ? isValid : isValid == 0 ? 0 : "",
            keyword,
            leaveWord
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
    delFollowList(item) {
      console.log(item);
      this.$confirm("是否删除跟踪记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let obj = {
          id: item.id
        };
        let res = await deleteFollow(obj);
        this.$message.success(res.returnMsg);
        let followInfo = await followList({ id: this.choiseItem.id });

        this.detail.record = followInfo.data;
      });
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
  min-width: 200px;
}
.divider {
  width: 200px;
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
  font-weight: 600;
  font-size: 22px;
}
.record {
  width: 100%;
}
.record ::v-deep .el-card__body {
  padding: 5px 10px;
}
.manager {
  color: red;
}
</style>
