<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<myVideo :tabTitle='tabTitle' @tabindex='tabindex'></myVideo>
		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit"  top="260" @down="downCallback" :up="upOption" @up="upCallback" >
		<view class="center_o" v-if="this.isShow === 1">
			<alltickets :ticketslist="ticketslist" :ticketcolor='ticketcolor_need'></alltickets>
			<view class="tuijian" v-if="this.tuijian===false">
				<view class="cent_boundary">
					<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
					<view class="boundary_r"><text>门票推荐</text></view>
					<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				</view>
				<com-tickets :ticketsData="ticketsData"></com-tickets>
			</view>
		</view>
		
		<view class="center_o" v-if="this.isShow === 2">
			<alltickets :ticketslist="ticketslist" :ticketcolor='ticketcolor'></alltickets>
			<view class="tuijian" v-if="this.tuijian===false">
				<view class="cent_boundary">
					<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
					<view class="boundary_r"><text>门票推荐</text></view>
					<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				</view>
				<com-tickets :ticketsData="ticketsData"></com-tickets>
			</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import myVideo from "@/components/com-my-videos/com-my-videos.vue"
	import alltickets from '@/components/alltickets/alltickets.vue'
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				tuijian:true,
				ticketcolor:{
					color:'#C4EFDB',
				},
				reco_status:1,
				ticketcolor_need:{
					color:'#13BE6F',
				},
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				title: '我的门票',
				tabTitle: ['待使用','已使用'],
				isShow: 1,
				ticketslist:[],
				ticketsData: [],
				tabindexs:0
			};
		},
		components: {
			myVideo,
			comTickets,
			alltickets
		},
		onLoad () {
		},
		methods:{
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page,pageNum,pageSize)
				this.searchHandler(pageNum,pageSize)
				//this.gettuijiantickets(pageNum,pageSize)
			},
			tabindex (index) {
				this.tabindexs = index;
				this.ticketslist = []
				this.ticketsData = []// 先置空列表,显示加载进度
				this.mescroll.resetUpScroll() // 再刷新列表数据
			},
			// gettuijiantickets () {
			// 	//获取推荐视频列表
			// 	this.$api.goodslist({reco_status:this.reco_status,page:page,size:size}).then(res => {
			// 	   // 获得历史下得视频数据 
			// 	   console.log(res)
			// 	  if(res.code === 200){	
			// 		  console.log(res)
			// 		if(res.data.length<size){
			// 			 this.loadingType = 2;
			// 				this.ticketsData = res.data;
			// 				//this.title= res.data[0].title;
			// 				uni.hideNavigationBarLoading();
			// 				uni.stopPullDownRefresh();//得到数据后停止下拉刷新 							
			// 		}else{
			// 				this.loadingType = 0;
			// 				this.ticketsData = res.data;
			// 				//this.title= res.data[0].title;
			// 				uni.hideNavigationBarLoading();
			// 				uni.stopPullDownRefresh();//得到数据后停止下拉刷新
			// 				 page++;
			// 		}		
			// 	  }
			// 	  else{
			// 		uni.showToast({
			// 			icon: "none",
			// 		    title: res.msg,
			// 		    duration: 2000
			// 		});  
			// 	  }
			// 	}).catch(res => {
			// 		uni.showToast({
			// 			icon: "none",
			// 		    title: "数据获取失败或暂无数据",
			// 		    duration: 2000
			// 		}); 
			// 	　　// 失败进行的操作
			// 	})
			// },
			//获取我的门票
			getusergoods (type,pageNum,pageSize){
				this.$api.usergoods({type:this.isShow,page:page,size:size}).then(res => {
				  if(res.code === 200){	
					  console.log(res)
					  console.log(res.data)
					  let curPageData = res.data;
					  let curPageLen = curPageData.length; 
					  // 与 mescroll-body 的处理方式一致 >
					  //设置列表数据
					  if(pageNum == 1) this.ticketslist = []; //如果是第一页需手动置空列表
					  this.ticketslist = this.ticketslist.concat(curPageData); //追加新数据
					  this.mescroll.endSuccess(curPageLen);
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

			searchHandler(pageNum,pageSize){
				if(this.tabindexs === 0){
					this.isShow = 1;
					this.getusergoods(this.isShow,pageNum,pageSize);
				}else{
					this.isShow = 2;
					this.getusergoods(this.isShow,pageNum,pageSize);
				}
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
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F8F8F8;
	}
	.header{
		position: fixed;
		z-index: 1;
		height:45px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		.header_tab{
			width: 100%;
			height:45px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			.tab{
				height:45px;
				line-height: 45px;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.click{
				font-weight:bold;
				border-bottom: 1rpx solid #13BE6F;
				color:rgba(51,51,51,1);
			}
		}
	}
	.center_o{
		position:fiexd;z-index:11;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.cent_boundary{
		width: 100%;
		display: flex;
		margin-top: 65rpx;
		justify-content: center;
		align-items: center;
		.boundary_l{
			width: 26rpx;
			height: 19rpx;
			display: flex;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.boundary_r{
		// font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		margin-bottom: 20rpx;
		color:rgba(51,51,51,1);
		text{
			padding: 0 20rpx;
		};
	}
</style>
