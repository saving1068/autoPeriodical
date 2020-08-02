<template>
  <div class="warp" v-loading="loading">
    <el-form inline class="form-inline" label-width="100px">
      <el-form-item label="用户姓名" width="100%">
          <el-select clearable class="width280" v-model="search.userId" placeholder="请选择用户姓名">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.contactName"
            :value="item.id"
          ></el-option>
        </el-select>
        
      </el-form-item>
      <el-form-item label="下载时间" >
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
        style="width: 100%"
      >
        <el-table-column prop="userName" align="center" label="用户姓名"></el-table-column>
        <el-table-column prop="downloadIp" align="center" label="下载IP"></el-table-column>
        <el-table-column prop="downloadTime" align="center" label="下载时间"></el-table-column>
      </el-table>
      <el-pagination
        style=" padding:20px;"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {

  downloadRecords
} from "@/api/custormer";

import { accountList } from "@/api/user";
import { dictApi, idChangeStr, filterButton,encryptionTel,downFile,downFileGet } from "@/utils";

export default {
  data() {
    return {
      disTime: "",
      search: {
        userId:'',
        downloadTimeBegin: "",
        downloadTimeEnd: "",
        page: 1,
        limit: 10
      },
      tableData: [],
      loading: false,
      total: 0,
     

    };
  },
  async created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
   
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

    async dist() {
      console.log(this.userInfo, "------------------");
      this.loading = true;
    //   let province = await provinceList();
    //   this.province = province.data;
    //   this.detailProvince = province.data;

    //   //
    //   this.resourceType = await dictApi('resourceType')
    //   this.platform = await dictApi("platform");
    //   this.currentType = await dictApi("currentType");
      let userList = await accountList({ roleId: 1 });
      this.userList = userList.data;
      // let saleList = await accountList({roleId:7});
      // this.saleList = saleList.data;
      // let departObj = {
      //     id:this.userInfo.did,
      //     viewSale:1
      // }
      // let saleList = await userDepartmentList(departObj);
      // this.saleList = saleList.data;
    //   let project = await projectList();
    //   this.projectList = project.data;
    //   let department = await departmentList();
    //   this.resetList(department.data);
    //   console.log(this.departmentList);
      // if(this.userInfo.role.roleId !=7){
      //      let personnel = await accountList({roleId:this.userInfo.role.roleId,did:this.userInfo.did});
      //     this.personnel = personnel.data;
      // }

    //   console.log(this.projectList, 21312);
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
        let res = await downloadRecords(this.search);
        this.tableData = res.data;
        this.total = res.total || 0;
        this.loading = false;
      } catch (error) {
        console.log(error)
        this.loading = false;
      }
    },

    disTimeChange(value) {
      if (value) {
        this.search.downloadTimeBegin = value[0];
        this.search.downloadTimeEnd = value[1];
      } else {
        this.search.downloadTimeBegin = "";
        this.search.downloadTimeEnd = "";
      }
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
