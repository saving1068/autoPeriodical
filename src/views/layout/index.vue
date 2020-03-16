<template>
	  <el-container style="padding:20px 20px;background:#eef1f6;">
		 <el-header style="background:#fff;"> 
				<myhead></myhead>	
		</el-header>
		<el-container style="margin-top:20px;">
			<el-aside width='200px' :style="{'max-height':maxHeight+'px','background':'#fff'}">
				<!-- <div :style="{'height':maxHeight+'px','width':'190px'}"> -->
					<!-- <el-scrollbar id="scorll" :style='{"height":maxHeight+"px"}'> -->
					<nav-bar :maxHeight='maxHeight'></nav-bar>
					<!-- </el-scrollbar> -->
				<!-- </div> -->
				
			</el-aside>
		<el-container>
			<el-main style="padding:0 0px 0 20px;min-width:1125px;" :style="{'height':maxHeight+'px'}">
				<el-scrollbar id="scorll" :style='{"height":maxHeight+"px"}' style="background:#fff;">
				<!-- <el-header style="background:#fff;"> 
					<myhead></myhead>	
				</el-header> -->
				<transition name="el-fade-in-linear">
					<router-view   style="background:#fff;padding:20px"/>
					
				</transition>
				</el-scrollbar>
			</el-main>
			</el-container>
		</el-container>
			
	  </el-container>
<!-- <div class="warpBox">
	<div class="nav">
		<nav-bar></nav-bar>
	</div>
	<div class="content col">
		<router-view/>
	</div>
  </div> -->
</template>

<script>
// @ is an alias to /src
import navBar from '@/components/nav'
import myhead from '@/components/head'
import '@/icons/svg/tupianBG.svg'
export default {
  name: 'home',
  components: {
    navBar,myhead
  },
	mounted(){
		let size = document.documentElement.clientHeight;
		console.log(size);
		this.maxHeight = Number(size)-120;
	},
	data(){
		return{
			maxHeight:0,
		}
	}
}
</script>
<style scoped="scoped" lang="scss">
	.warpBox{
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		background: sandybrown;
		padding: 0 20px;
		.content{
			padding-left: 20px;
		}
	}
</style>
