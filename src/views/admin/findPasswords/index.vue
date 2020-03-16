<template>
    <div class="log-record page-container center">
        <panel>
            <template slot="head">
                <div class="left">
                    <span >找回密码</span> 
                </div>
				<div class="right">
					 <div class="bcakBtn" @click="back">
						<el-button type="info">返回</el-button>
					</div>
				</div>
            </template>
			<div class="pws-warp">
				<div class="main-cont">
					<!-- <div class="tab-cont">
						<ul class="reg-nav">
							<li :class="{current:tabIndex==0 }"><i class="icon" :class="{'icon-active':tabIndex==0 }">1</i><font>输入邮箱账号</font></li>
							<li :class="{current:tabIndex==1 }"><i class="icon" :class="{'icon-active':tabIndex==1 }">2</i><font>验证身份</font></li>
						</ul>
					</div> -->
					
					<div class="reg-main">
						<div class="reg-txtbox">
							<div class="typeName">账号</div>
							<div class="value">
								<input v-model="userName" placeholder="请输入内容"/>
							</div>
						</div>
						<div class="reg-txtbox">
							<div class="typeName">邮箱账号</div>
							<div class="value">
								<input v-model="email" placeholder="请输入内容"/>
							</div>
						</div>
						<div class="reg-code">
							<div class="code-txtbox">
								<el-input
								placeholder="请输入内容"
								prefix-icon="el-icon-message"
								v-model="emailCode">
							  </el-input>
							</div>
							<div class="btn-get-code">
								<el-button type="info" v-if="!ifgetCode" @click='getEmailCode'>获取邮箱验证码</el-button>
								<div class="seconds" v-else><span>{{seconds}}</span>秒重新获取</div>
							</div>
						</div>
						<div class="nextBtn">
							<el-button size='medium' type="warning" @click='next'>下一步</el-button>
						</div>
					</div>
				</div>
			</div>
            <!-- <no-data>开发中....</no-data> -->
        </panel>
    </div>
</template>

<script>
// import Panel from '@/components/Panel'
// import NoData from '@/components/NoData'
// import {validEmail} from '@/utils'
// import {forgotPassword,sendEmailCode} from '@/api/admin'
export default {
    // components: {Panel, NoData},
	data(){
			return{
					listInfo:{},
					userName:'',
					tabIndex:0,
					email:'',
					emailCode:'',
					ifgetCode:false,
					seconds:60,
				}
			},
			created() {
				// this.getPushMainCarLogs(10,1)
			},
			methods:{
				goTo(place){
					console.log(place,1111)
					this.$router.push({
						name:place
					})
				},
				async getEmailCode(){
					if(this.email&&this.userName){
						if(validEmail(this.email)){
							let send  ={
								email:this.email,
								loginName:this.userName
							}
							try{
								this.$loading.show()
								await sendEmailCode(send);
								
								this.ifgetCode = true;
								this.$message.success('发送验证码成功，请留意查收')
								let timer = setInterval(()=>{
									this.seconds--;
									if(this.seconds<=0){
										this.seconds = 60;
										this.ifgetCode = false;
										clearInterval(timer)
									}
								},1000)
								this.$loading.hide()
							}catch(e){
								this.$loading.hide()
								//TODO handle the exception
							}
						}else{
							this.$message.error('输入正确的邮箱账号')
							}
					}else{
						this.$message.error('邮箱账号和账号不能为空')
					}
					
					
				},
				async next(){
					if(this.email&&this.userName&&this.emailCode){
						if(validEmail(this.email)){
							let send  ={
								email:this.email,
								loginName:this.userName,
								code:this.emailCode
							}
							this.$loading.show()
							try{
								await forgotPassword(send);
								this.$loading.hide()
								this.$message.success('操作成功！登录密码已发送至您邮箱，请注意查收!')
								
								this.$router.replace({
									name:'admin'
								})
							}catch(e){
								this.$loading.hide()
								//TODO handle the exception
							}
						}else{
							this.$message.error('输入正确的邮箱账号')
							}
					}else{
						this.$message.error('邮箱账号、账号、验证码都不能为空')
					}
					
				},
				back(){
					this.$router.go(-1)
				}
			}
		}
</script>
<style scoped="scoped" lang="scss">
	.center{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%)
	}
	.pws-warp{
		width: 990px;
		margin: auto;
		.main-cont{
			width: 900px;
			margin: auto;
			padding: 50px 0 45px;
			.tab-cont{
				border-bottom: 1px solid #ddd;
				.reg-nav{
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					height: 40px;
					li{
						padding: 10px 19px;
						display: flex;
						align-items: center;
						margin-left: 20px;
						font{
							font-size: 20px;
						}
					}
					.icon{
						vertical-align: middle;
						display: inline-block;
						width: 16px;
						height: 16px;
						text-align: center;
						line-height: 16px;
						margin-right: 4px;
						border-radius: 50%;
						color: #fff;
						background: #ccc;
					}
					.icon-active{
						color: #fff !important;
						background: #fa0;
					}
					.current{
						color: #fa0 !important;
						border-bottom: 2px solid #fa0;
					}
				}
			}
			.reg-main{
				width: 380px;
				margin: 30px auto ;
				.reg-txtbox{
					height: 48px;
					border: solid 1px #ddd;
					display: flex;
					margin-bottom: 30px;
					.typeName{
						width: 66px;
						line-height: 48px;
						text-align: right;
						padding: 0 5px;
					}
					.value{
						input{
							width: 300px;
							height: 100%;
							padding: 15px 5px;
							border: none;
							outline: none;
						}
					}
				}
				.nextBtn{
					width: 100%;
					margin-top: 30px;
					.el-button{
						width: 100%;
					}
					
				}	
				.mess-notice{
					height: 40px;
					color: #666;
					padding-top: 20px;
					i{
						cursor: pointer;
						color: #2272c8;
						margin-left: 15px;
					}
				}
				.reg-code{
					margin-top: 30px;
					height: 50px;
					display: flex;
					.code-txtbox{
						width: 299px;
					}
					.btn-get-code{
						width: 158px;
						height: 40px;
						background: #a6a9ad;
						.seconds{
							text-align: center;
							line-height: 40px;
							span{
								color: #fa0;
							}
						}
					}
				}
			}
		}
	}
</style>
	