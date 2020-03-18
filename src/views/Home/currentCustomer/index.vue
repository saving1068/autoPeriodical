<template>
  <div class="warp">
    <el-form inline class="form-inline" label-width='100px'>
        <el-form-item label="客户池">
            <el-select v-model="search.customerPool" placeholder="请选择客户池">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户来源">
            <el-select v-model="search.customerSource" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否超期">
           <el-select v-model="search.overdue" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户状态">
           <el-select v-model="search.state" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否有效">
           <el-select v-model="search.effective" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户类型">
           <el-select v-model="search.type" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否成交">
           <el-select v-model="search.deal" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="所属部门">
           <el-select v-model="search.department" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所属城市">
            <el-cascader
            v-model="search.province"
            :options="options"
            @change="handleChange">
            </el-cascader>
           <!-- <el-select v-model="search.province" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select style='margin-left:10px' v-model="search.city" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
        </el-form-item>
        <el-form-item label="获取时间">
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            format='yyyy-MM-DD'
            @change='deteChange'
            value-format='yyyy-MM-DD'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="客户姓名" width='100%'>
           <el-input v-model='search.name' placeholder='请输入客户姓名'></el-input>
        </el-form-item>
        <div class='center'>
            <el-button type="primary" icon="el-icon-seach">搜索</el-button>
        </div>
    </el-form>
    <div class='table'>
        <div class='button'>
            <el-button type="primary">新增客户</el-button>
            <el-button type="danger">批量放弃</el-button>
            <el-button type="warning">批量转移</el-button>
            <el-button >导出</el-button>
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
            <el-table-column prop="name" label="客户姓名">
            </el-table-column>
            <el-table-column label="是否超期" prop='overdue'>
            
            </el-table-column>
            <el-table-column prop="address" label="处理状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="text">成交</el-button>
                   <el-button type="text">移交</el-button>
                   <el-button type="text">来访</el-button>
                   <el-button type="text">编辑</el-button>
                   <el-button type="text">放弃</el-button>
                   <el-button type="text">详情</el-button>
                   <el-button type="text">取消移交</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        title="客户详情"
        :visible.sync="detailVisible"
        width="80%"
        center
        :before-close="handleClose">
        
        <el-form inline class="form-inline" label-width='100px'>
            <el-form-item label="客户池">
                <el-select v-model="search.customerPool" placeholder="请选择客户池">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户来源">
                <el-select v-model="search.customerSource" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否超期">
            <el-select v-model="search.overdue" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户状态">
            <el-select v-model="search.state" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有效">
            <el-select v-model="search.effective" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户类型">
            <el-select v-model="search.type" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否成交">
            <el-select v-model="search.deal" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="所属部门">
            <el-select v-model="search.department" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属城市">
                <el-cascader
                v-model="search.province"
                :options="options"
                @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="获取时间">
            <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                format='yyyy-MM-DD'
                @change='deteChange'
                value-format='yyyy-MM-DD'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="客户姓名" width='100%'>
            <el-input v-model='search.name' placeholder='请输入客户姓名'></el-input>
            </el-form-item>
        </el-form>
        <div class="title space-between">
            <h1 style="font-width:600;font-size:32px">追踪记录</h1>
            <el-button  type="primary">新增跟进记录</el-button>
        </div>
        <div class="center">
            <el-form :inline="true"  class="form-inline">
            <el-form-item label="客户:">
                {{detail.customer}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
            <el-form-item label="电话号码:">
                {{detail.ipone}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
             <el-form-item label="地址:">
                {{detail.address}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
             <el-form-item label="微信:">
                {{detail.we}}
                <!-- <el-input v-model="detail.customer" placeholder="审批人"></el-input> -->
            </el-form-item>
            </el-form>
        </div>
        <div class="center">
            <ul class="record">
                <li v-for="(item,index) in detail.record" :key="index">
                    <div :class="item.type == 1?'manager':''">
                        {{item.text}}
                    </div>
                    
                </li>
            </ul>
        </div>
        

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="detailVisible = false">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
        time:"",
        detailVisible:false,
        detail:{
            customer:'入货',
            ipone:"1371111111",
            address:'地址',
            we:'微信',
            record:[
                {type:0,text:'销售员记录'},
                {type:1,text:'经理记录111111111111111111111111sasdfsd谁知道发送到发送到股份'},
            ]
        },

        search:{
            customerPool:'',//池
            customerSource:"",//来源
            overdue:"",//逾期
            state:'',//状态
            effective:'',//有效
            type:"",//类型
            beginTime:'',
            endTime:"",
            department:"",//部门
            province:'',//省
            city:"",//市
        },
        options:[{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
            }],
            tableData:[1]
        }
    
  },
  create(){

  },
  mounted() {
   
  },
  methods: {
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      deteChange(value){
          if(value){
              this.search.beginTime = value[0];
              this.search.endTime = value[1];
          }else{
              this.search.beginTime = '';
              this.search.endTime = '';
          }
      },
      handleChange(value){
          console.log(value)
      },
      rowDblclic(value){
          console.log(value)
          this.detailVisible =  true;
        //   this.detail = value
      },
      handleSelectionChange(value){
          console.log(value)
      },
  }
};
</script>

<style scoped="scoped" lang="scss">
    .table{
        
        .button{
            padding:20px 0;
        }
    }
    .title{
        padding: 20px 0;
    }
    // .record{
    //     width: 100%;
    // }
    .manager{
        color: red;
    }
</style>
