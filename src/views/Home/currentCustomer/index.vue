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
            <el-table-column prop="address"label="处理状态"show-overflow-tooltip>
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
  </div>
</template>

<script>

export default {
  data() {
    return {
        time:"",
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
            tableData:[]
        }
    
  },
  create(){

  },
  mounted() {
   
  },
  methods: {
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
</style>
