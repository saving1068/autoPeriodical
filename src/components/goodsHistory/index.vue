<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="80%"
    center
    :before-close="handleClose">
    <div class="center">
        <div class="history content">
            <el-timeline>
                <el-timeline-item
                    v-for="(item, index) in history"
                    :key="index"
                    :timestamp="String(item.createTime)">
                    该产品({{modelName}}){{type == 0?'入库':'出库'}}量为：{{type == 0?item.pdCount:item.osCount}}
                </el-timeline-item>
            </el-timeline>
            <div class="center" v-show="history.length == 0">
                暂无{{type == 0?'入库':'出库'}}历史
            </div>
            <!-- <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" :status='status' ></el-progress> -->
        </div>
        <div class="info content">
            <div class="chargingType center">
                <div>
                    <!-- <div class="center">
                        <div style="padding:0 5px;" >型号:{{material.mtId}}</div>
                        <div style="padding:0 5px;" >费用:{{material.pcCost}}</div>
                    </div> -->
                   <div class="center">
                       <div  style="padding:0 5px;">
                           <el-input v-model.number="material.addCount"  size="mini" placeholder="请输入入库量"></el-input>
                       </div>
                       <el-popover
                            placement="top"
                            width="160"
                            v-model="material.visible">
                            <p>确定{{type == 0?'入库':'出库'}}吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="material.visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="sureCharging()">确定</el-button>
                            </div>
                            <el-button slot="reference" >确认</el-button>
                        </el-popover>
                   </div>
                    
                </div>
                
            </div>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="close()" >确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import {addPdstock,addPdstockHistory,addPdstockDetail,outPdstock,outPdstockHistory} from '@/api/pdstock'
export default {
    props:{
        type:{
            default:0
        },
        title:{
            default:'入货单'
        },
        list:{
            default:[]
        },
        chargingType:{
            default:{}
        },
        // status:{
        //     default:'success'
        // },
        // percentage:{
        //     default:10
        // },
        dialogVisible:{
            default:false
        },
        modelName:{
            default:'产品名称'
        }
    },
    created(){
        // console.log(this.list,this.status,this.dialogVisible,111)
        // let chargingType = [...this.chargingType]
        this.material = JSON.parse(JSON.stringify(this.chargingType))
        this.history = JSON.parse(JSON.stringify(this.list))
        console.log(this.history,21111)
        // this.material.map((item)=>{
        //     item.count = item.pcCount;
        //     item.mtUnitPrice = Number(item.pcCost)/Number(item.pcCount).toFixed(3)/1;
        //     item.visible = false;
        // })
        // console.log(this.material,21321)
        //  let SurplusCount = this.material.pcCount;
        //     if(this.material.feeds.length){
        //         this.material.feeds.forEach((item)=>{
        //             SurplusCount -= item.fdCount
        //             console.log(SurplusCount)
        //         })
        //     }
        // this.material.count = SurplusCount
        // this.material.mtUnitPrice =  Number(this.material.pcCost)/Number(this.material.pcCount).toFixed(3)/1;
        this.material.visible = false;
        // console.log(this.material,213)
    //    this.status= this.list.length == 0?'exception':'success';
    //    this.percentage = this.list.length == 0?0:this.percentage;
    },
    data(){
        return{
          listIndex:0,
          material:[],
          history:[]
        }
    },
    methods: {

        async sureCharging(){
            // let res = this.material.filter(itemS => itemS.pcCount < itemS.count);
            if(this.type == 0){
              try {
                    let obj = {
                        addCount:this.material.addCount,
                        odId:this.material.odId,
                        id:this.material.pdId
                    }
                    console.log(obj)
                    let res = await  addPdstock(obj);
                    console.log(res)
                    let history = await addPdstockHistory({odId:this.material.odId})
                    this.history = history.data;
                    console.log(this.history,'history')
                    this.$message.success(res.returnMsg)
                    this.$emit('updata',true)
                } catch (error) {
                    console.log(error)
                }
            }else{
                try {
                    let obj = {
                        delCount:this.material.addCount,
                        odId:this.material.odId,
                        id:this.material.id
                    }
                    console.log(obj)
                    let res = await  outPdstock(obj);
                    console.log(res)
                    let history = await outPdstockHistory({odId:this.material.odId})
                    this.history = history.data;
                    console.log(this.history,'history')
                    this.$message.success(res.returnMsg)
                    this.$emit('updata',true)
                } catch (error) {
                    
                }
                
            }
                
        },
        cost(value){
            this.material.pcCost = (value*Number(this.material.mtUnitPrice)).toFixed(3)/1;
            console.log(this.chargingType)
        },
        format(percentage) {
            return percentage === 100 ? '满' : `${percentage}%`;
        },
        
        close(){
           
            this.$emit("closeDialog",false)
        },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit("closeDialog",false)
          })
          .catch(_ => {});
      },
    }
}
</script>

<style lang="scss" scoped>
    .content{
        width: 50%;
    }
    .history{

    }
</style>