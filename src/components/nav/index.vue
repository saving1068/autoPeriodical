<template>
	<div class="warp">
		
			<div class="mine-info center">
				<div class="image center" >
					<!-- <i size="medium" class="el-icon-user-solid"></i>
					 -->
					 <!-- <icon-svg className='run'></icon-svg> -->
					 <img src="../../images/icon.jpg" alt="">
				</div>
				<div class="info">
					<div>我的专区</div>
					<!-- <div>info</div> -->
				</div>
			</div>
			
				<div class="nav" :style='{"height":maxHeight+"px"}'>
					 <el-scrollbar id="scorll" :style='{"height":maxHeight-100+"px"}'>
					<div class="nav-item " v-for="(item,index) in nav" 
					:key='index' >
						<div class='parent'  @click="goTo(item)" :class="{'active':item.isActive}">
							<div style="width:150px" class="center">{{item.description}}</div>
							<div class="icon" v-if="item.children.length">
								<i class="el-icon-arrow-up" v-if="item.ifShowSon"></i>
								<i class="el-icon-arrow-right" v-else></i>
							</div>
						</div>
						<div class="son" 
							:class="{'showSon':item.ifShowSon}"
						>
<!--space-between -->	<div class="son-item center" 
						 @click="goToSon(sonItem)"
						 v-for="(sonItem,sonIndex) in item.children" 
						:key="sonIndex"
						 :class="{'active':sonItem.isActive}">
						 <span>{{sonItem.description}}</span>
						 <!-- <div class="blur"></div> -->
						 <!-- <div class="color center">{{sonItem.description}}</div> -->
						</div>
							
						</div>
					</div>
					</el-scrollbar>
				</div>
			
		
	</div>

</template>

<script>
import {userMenu} from '@/api/menu'
	export default{
		props:{
			maxHeight:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				nav:[
				]
			}
		},
		watch:{
			$route(value){
				this.selectNav(value.name)
				// console.log(value)
			}
		},
		async created() {
			console.log(this.maxHeight)
			await this.getUserMunu()
			await this.initNav(this.nav);

			let routeName = this.$route.name;
			await this.selectNav(routeName)
		},
		async mounted(){
			
		},
		methods:{
			resetList(arr){
        // console.log(arr)
        let pList = [];
        arr.forEach((item)=>{

          if(item.pid == 0){
            let o = this.sonsTree(item, arr);
            pList.push(o)
          }
        })
        return pList
        // console.log(pList,123123)
      },
      sonsTree(obj, arr) {
          var children = [];
          for (var i = 0; i < arr.length; i++) {
              if (arr[i].pid == obj.id) {  //等于加入数组
                  this.sonsTree(arr[i], arr);//递归出子元素
                  children.push(arr[i]);
              }
          }
          // if (children.length > 0) {
              obj.children = children;
          // }
          return obj;
      },
			async getUserMunu(){
				// let res = await userMenu();
				let routerList = JSON.parse(sessionStorage.getItem('pageList'));
				routerList = routerList.filter(item => item.type != 2);
				console.log(routerList,'routerList')
				this.nav = this.resetList(routerList)
				// console.log(this.nav)
			},
			goToSon(item){
				console.log(item.url,'213213213')
				let url = item.url.indexOf('=');
				let query = url >0?item.url.split('=')[1]:''
				if(url >0){
					this.$router.push({
					path:item.url,
					query:{
						type:query
					}
					}).catch(err => {
						err
					})
				}else{
				this.$router.push({
					path:item.url
				}).catch(err => {
					err
				})
				}
				// let type = url >0?item.url.split('?')[1].split('=')[0]:''
				
			},
			goTo(item){
			
				if(item.url){
					
					this.$router.push({
					path:item.url
					}).catch(err => {err})
				}else{
					item.ifShowSon = !item.ifShowSon;
				}
				
			},
			selectNav(route){
				
				route = `/${route}`
				console.log(route)
				this.nav.forEach(item =>{
					item.isActive = false;
					if(item.url == route){
						item.isActive = true;
						return
					}else{
						
						if(item.children){
							
							item.ifShowSon = false;
							item.children.map(sonItem =>{
								sonItem.isActive = false;
								
								if(sonItem.url == route){
									sonItem.isActive = true;
									item.ifShowSon = true;
									
								}
							})
						}
					}
				})
				
			},
			initNav(arr){
				
				arr.forEach(item => {
					this.$set(item,'isActive',false)
					if(item.children){
						this.$set(item,'ifShowSon',false)
						item.children.forEach(sonItem =>{
							this.$set(sonItem,'isActive',false)
						})
					}
					
					// if(item.path == route){/
					// 	this.$set(item,'isActive',true)
					// }else{
					// 	this.$set(item,'isActive',false)
					// }
					
				});
				
			},
		},
	}
</script>

<style scoped lang="scss">
	.warp{
		width: 200px;
		display: inline-block;
		background: #fff;
		// color: #326af5;
		    border-right: 1px solid #e6e6e6;
		.mine-info{
			padding: 20px;
			background: rgb(64, 158, 255);
			.image{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background: #fff;
				overflow: hidden;
				.el-icon-user-solid{
					font-size:32px;
					color:#fff;
				}
				// overflow: hidden;
			}
			.info{
				color: #fff;
				padding: 0 5px;
				font-size: 24px;
			}
		}
		.nav{
			height: 100%;
			padding-bottom:20px;
			box-sizing: border-box;
		}
			// .showSon{
			// 	background:rgba($color: #FAEBD7, $alpha: .2) 
			// }
		.nav-item{
			
			.parent{
				height: 50px;
				display: flex;
				// justify-content: space-around;
				align-items: center;
				
			}
			.son{
				// background: rgba($color: #C0C0C0, $alpha: .4);
				height: 0px;
				overflow: hidden;
				display: none;
				transition:all 1s linear 0s;
			}
			.showSon{
				display: block;
				height: auto;
			}
			.son-item{
				height: 50px;
				cursor: pointer;
				.color{
					background: #fff;
					color: #326af5;
					flex: 1;
					height: 100%;
				}
				.blur{
					width: 10px;
					height: 100%;
					background:#326af5;
				}
			}
			.son-item:hover{
			background:#ecf5ff;
			// color: #fff;
			
		}
			.parent:hover{
			background:#ecf5ff;
			// color: #fff;
			cursor: pointer;
		}
		}
		.active{
			color: #409eff;
			// color: #fff;
		}
		
	}
</style>
