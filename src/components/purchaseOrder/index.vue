<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    center
    :before-close="handleClose">
    <div class="center">
        <div class="info content">
            <div class="chargingType center" v-for="(item,index) in material" :key='index'>
                <div @click="sureIndex(item,index)" class="chargingItem">
                    <el-form inline size="mini">
                        <el-form-item label="供应商:">
                            <span>{{item.spName}}</span>
                        </el-form-item>
                        <el-form-item label="型号:">
                            <span>{{item.mtModelName}}</span>
                        </el-form-item>
                        <el-form-item label="费用:">
                            <span>{{item.mtCost}}</span>
                        </el-form-item>
                        <el-form-item label="数量:" 
                           
                        >
                            <el-input v-model.number="item.count"  @input="cost" size="mini" placeholder="请输入入货量"></el-input>
                        </el-form-item>
                    </el-form>
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
import {purchaseInsertList} from '@/api/purchase'
export default {
    props:{
        title:{
            default:'入货单'
        },
        chargingType:{
            default:[]
        },
        orgId:{
            default:''
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
        this.material.map((item)=>{
            item.count = item.mtCount;
            item.visible = false; 
        })
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
        sureIndex(item,index){
            this.listIndex = index;
        },
        cost(value){
            this.material[this.listIndex].mtCost = (value*Number(this.material[this.listIndex].mtUnitPrice)).toFixed(3)/1;
            console.log(this.chargingType)
        },
        close(){

         
          let res = this.material.filter(item => item.mtCount < item.count)
          console.log(res)
           if(res.length == 0){
                 this.$confirm('是否确认生成采购单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async () => {
                        try {
                            let list = [];
                            this.material.forEach((item)=>{
                                let obj = {
                                    mtId:item.id,
                                    pcCost:item.mtCost,
                                    pcCount:item.count,
                                }
                                list.push(obj)
                            })
                            let req = {
                                list:list,
                                odId:this.orgId
                            }
                            console.log(req)
                            let res=  await  purchaseInsertList(req)
                            this.$message({
                                type: 'success',
                                message: res.returnMsg
                            });
                             this.$emit("closeDialog",true)
                        } catch (error) {
                            
                        }
                       

                        
                    }).catch(() => {
                    
                    })
           }else{
             return  this.$message.warning('所输数量不能大于订单所需数量')
           }
                   
               
           

            
                
           
                
               
            
            
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
    .chargingItem{
        padding: 10px 0;
    }

</style>