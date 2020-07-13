<template>
	<view :class="titlIndex === 1 ? 'page-gray' : ''">
		<uni-nav-bar left-icon="" left-text="" fixed :right-text="allAdminCheckState?'完成':'管理'" title="titleData" :titleData="titleData" :titlIndex="titlIndex" @titleHandler="titleHandler" @clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="150" @down="downCallback" :up="upOption" @up="upCallback" >
		<!-- 视频组件 -->
		<div style="padding: 8rpx 40rpx 0;" class="boxs" v-if="titlIndex === 0">
			<com-video :videoData="videoData" :checkState="allAdminCheckState"></com-video>
		</div>
		<!-- 门票组件 -->
		<view style="padding: 30rpx 40rpx 0;" class="boxs" v-if="titlIndex === 1">
			<com-tickets :ticketsData="ticketsData" :checkState="allAdminCheckState"></com-tickets>
		</view>
		<view class="footer" v-if="allAdminCheckState">	
			<view class="footer_si"@tap="checkAllClick">
				<inputCheck :clickstate="allSetCheck"/>全选
			</view>
			<view class="footer_color"@tap="dellist()">
				取消收藏
			</view>
		</view>
		</mescroll-uni>
		<comdelete :title='title' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideo from "@/components/com-video/com-video.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import inputCheck from "@/components/input-check/input-check.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				title:'您确定要取消收藏吗？',
				payDialogVisible: false,
				allAdminCheckState:false,
				allSetCheck:false,
				titlIndex: 0,
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				titleData:[
					{
						title: '视频',
						isChecked: true
					},
					{
						title: '门票',
						isChecked: false
					}
				],
				type:1,
				videoData:[],
				ticketsData:[]
			};
		},
		components: {
			uniNavBar,
			comVideo,
			comTickets,
			inputCheck,
			comdelete
		},
		methods: {
			/*下拉刷新的回调*/
			downCallback(page){
				console.log(page)
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(pageNum)
				console.log(page)
				this.searchHandler(pageNum,pageSize)
			},
			getcollectlist(type,pageNum,pageSize){
				console.log(pageNum)
				this.$api.collectlist({type:type,page:pageNum,size:pageSize}).then(res => {
				   // 获得历史下得视频数据 
				  if(res.code === 200){	
					  
						if(this.type===1){
													res.data.forEach(el=>{
													              el.state = false;
													 })
													let curPageData = res.data;
													let curPageLen = curPageData.length; 
													// 与 mescroll-body 的处理方式一致 >
													//设置列表数据
													if(pageNum == 1) this.videoData = []; //如果是第一页需手动置空列表
													this.videoData = this.videoData.concat(curPageData); //追加新数据
													this.mescroll.endSuccess(curPageLen);
													console.log(res.data)
						}else{
													 let curPageDatas = res.data;
													res.data.forEach(el=>{
													              el.state = false;
													 })
													 let curPageLens = curPageDatas.length; 
													 // 与 mescroll-body 的处理方式一致 >
													 //设置列表数据
													 if(pageNum == 1) this.ticketsData = []; //如果是第一页需手动置空列表
													 this.ticketsData = this.ticketsData.concat(curPageDatas); //追加新数据
													 this.mescroll.endSuccess(curPageLens);
						}
				  }
				  else{
					uni.showToast({
						icon: "none",
					    title: res.msg,
					    duration: 2000
					});  
				  }
				}).catch(res => {
					uni.showToast({
						icon: "none",
					    title: "数据获取失败或暂无数据",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
			},
		
			dellist(){
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
				this.allAdminCheckState = false;
			},
			desucceed(){ // 确认删除
			let list = this.videoData;
			let lists = this.ticketsData;
			console.log(lists);
			let goodsid = [];
			if(this.titlIndex==0){
				list.forEach(item=>{
					if(item.state===true){
						goodsid.push(item.id)
					}
				})
			}else{
				lists.forEach(item=>{
					if(item.state===true){
						goodsid.push(item.id)
					}
				})
			}
				console.log(goodsid)
				let goodsids = String(goodsid)
				this.$api.collectmanyinfo({ids:goodsids}).then(res => {
				  if(res.code === 200){	
					  console.log(res)
					 this.payDialogVisible = false;
					 this.allAdminCheckState = false;
					 this.allSetCheck = false;
					 this.downCallback();
				  }
				  else{
					uni.showToast({
						icon: "none",
					    title: res.msg,
					    duration: 2000
					});  
				  }
				}).catch(res => {
					uni.showToast({
						icon: "none",
					    title: "数据获取失败或暂无数据",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
			},
			//	全选
			checkAllClick(){
				this.allSetCheck=!this.allSetCheck;
				if(this.allSetCheck){ 
					this.setListArrFn(this.titlIndex,true) 
				}else{
					this.setListArrFn(this.titlIndex,false)
				}  
			},
			setListArrFn(index,state){
				(index===0?this.videoData:this.ticketsData).map((item,indexs)=>{
					(index===0?this.videoData:this.ticketsData)[indexs].state=state
				})
			},
			//管理
			clickRight(){
				this.allAdminCheckState=!this.allAdminCheckState;
				
			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
			// 接受title索引
			titleHandler (index) {
				this.titlIndex = index;
				this.allAdminCheckState=false;
				this.allSetCheck = false;
				this.ticketsData = []
				this.videoData = []// 先置空列表,显示加载进度
				this.mescroll.resetUpScroll() // 再刷新列表数据
			},
			// 获取数据
			searchHandler (pageNum,pageSize) {
				if(this.titlIndex === 0) {
					this.type = 1;
					this.getcollectlist(this.type,pageNum,pageSize)
				}else {
					this.type = 2;
					//console.log(this.type)
					this.getcollectlist(this.type,pageNum,pageSize)
				}
			}
		} 
	}
</script>

<style lang="scss">
	.footer{
		width: 100%;
		height:112rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 30rpx 0rpx rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		left: 0;
		height: 112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 40rpx 0 60rpx;
		justify-content: space-between;
		align-items: center;
		.footer_color{
			width:200rpx;
			height:80rpx;
			border:1px solid rgba(238,238,238,1);
			border-radius:40rpx;
			line-height: 80rpx;
			text-align: center;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
		}
		.footer_si{
			font-size:28rpx;
			display: flex;
			width: 120rpx;
			justify-content: space-between;
			align-items: center;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
</style>
