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
                    v-for="(item, index) in list"
                    :key="index"
                    :timestamp="item.createTime">
                    <div class="space-between">
                        <div> 该型号({{item.mtModelName}})入料量为：{{item.fdCount}}</div>
                        <!-- <el-popover
                            placement="top"
                            width="160"
                            >
                            <p>确定删除该订单吗？</p>
                            <div style="text-align: center; margin: 0">
                                <el-button  size="mini" >取消</el-button>
                                <el-button type="primary" size="mini">确定</el-button>
                            </div>
                            <el-button 
                            type="danger"
                            size="mini" slot="reference">删除</el-button>
                        </el-popover> -->
                    </div>
                   
                </el-timeline-item>
            </el-timeline>
            <div class="center" v-show="list.length == 0">
                暂无入货历史
            </div>
            <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" :status='status' ></el-progress>
        </div>
        <div class="info content">
            <div class="chargingType center">
                <div>
                    <div class="center">
                        <div style="padding:0 5px;" >型号:{{material.mtId}}</div>
                        <div style="padding:0 5px;" >费用:{{material.pcCost}}</div>
                    </div>
                   <div class="center">
                       <div  style="padding:0 5px;">
                           <el-input v-model.number="material.count"  @input="cost" size="mini" placeholder="请输入入货量"></el-input>
                       </div>
                       <el-popover
                            placement="top"
                            width="160"
                            v-model="material.visible">
                            <p>确定入料吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="material.visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="sureCharging()">确定</el-button>
                            </div>
                            <el-button slot="reference" @click="test">确认</el-button>
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
import {updataFeed} from '@/api/feeds'
import {purchaseDetail} from '@/api/purchase'
export default {
    props:{
        title:{
            default:'入货单'
        },
        list:{
            default:[]
        },
        chargingType:{
            default:[]
        },
        status:{
            default:'success'
        },
        percentage:{
            default:10
        },
        dialogVisible:{
            default:false
        }
    },
    created(){
        // console.log(this.list,this.status,this.dialogVisible,111)
        // let chargingType = [...this.chargingType]
        this.material = JSON.parse(JSON.stringify(this.chargingType))
        // this.material.map((item)=>{
        //     item.count = item.pcCount;
        //     item.mtUnitPrice = Number(item.pcCost)/Number(item.pcCount).toFixed(3)/1;
        //     item.visible = false;
        // })
        console.log(this.material,21321)
         let SurplusCount = this.material.pcCount;
            if(this.material.feeds.length){
                this.material.feeds.forEach((item)=>{
                    SurplusCount -= item.fdCount
                    console.log(SurplusCount)
                })
            }
        this.material.count = SurplusCount
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
        }
    },
    methods: {
        test(){
            
            this.material.visible = true ;
            console.log(this.material.visible )
        },
        async getPurchaseDetail(){
          
            // console.log(item)
            try {
              let res =  await purchaseDetail({id:this.material.id})
              this.list = res.data.feeds;
              this.material.feeds = res.data.feeds;
            } catch (error) {
              
            }
           
        },
        async sureCharging(){
            // let res = this.material.filter(itemS => itemS.pcCount < itemS.count);
            console.log(111)
            try {
                 let SurplusCount = this.material.pcCount;
            if(this.material.feeds.length){
                this.material.feeds.forEach((item)=>{
                    SurplusCount -=  item.fdCount
                })
            }
            console.log(SurplusCount,this.material.count)
           if(SurplusCount>=this.material.count){
               let obj = {
                    fdCount:this.material.count,
                    pcId:this.material.id,
                    odId:this.material.odId
                }
                try {
                     let res = await updataFeed(obj)
                    this.getPurchaseDetail()
                    this.$emit('updata',true)
                    this.$router.push({
                        name:'order'
                    })
                     this.$message.success(res.returnMsg)
                } catch (error) {
                    
                }
              
               
           }else{
               this.$message.warning('入料数不能大于采购单所需数量')
           }
            } catch (error) {
                console.log(error)
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