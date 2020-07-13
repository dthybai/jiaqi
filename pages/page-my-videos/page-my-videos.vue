<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<myVideo :tabTitle='tabTitle' @tabindex='tabindex'></myVideo>
		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="260" @down="downCallback" :up="upOption" @up="upCallback" >
		<view class="center_o" v-if="isShow === 1">
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
			<view class="tuijian" v-if="this.tuijian==false">
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>视频推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
			</view>
		</view>
		
		<view class="center_o" v-if="isShow === 2">
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
			<view class="tuijian" v-if="this.tuijian==false">
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>视频推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
			</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import myVideo from "@/components/com-my-videos/com-my-videos.vue"
	import itemline from "@/components/com-video-itemline/com-video-itemline.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				reco_status:1,
				tuijian:true,
				title: '我的视频',
				tabTitle: ['生效中','已过期'],
				isShow: 1,
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				videolist:[],
				videosDatas:[],
				tabindexs :0,
				video_id:''
				
			};
		},
		components: {
			myVideo,
			itemline
		},
		onLoad (opciton) {
		},
		methods:{
			/*下拉刷新的回调*/
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page,pageNum,pageSize)
				this.searchHandler(pageNum,pageSize)
				this.gettuijiantickets(pageNum,pageSize)
			},
			tabindex (index) {
				this.tabindexs = index;
				this.videolist = []
				this.videosDatas = []// 先置空列表,显示加载进度
				this.mescroll.resetUpScroll() // 再刷新列表数据
			},
			gettuijiantickets (pageNum,pageSize) {
				//获取推荐视频列表
				this.tuijian = true;
				// this.$api.videoslist({reco_status:this.reco_status,page:pageNum,size:pageSize}).then(res => {
				//    // 获得历史下得视频数据 
				//    //console.log(res)
				   
				//   if(res.code === 200){	
				// 	 // console.log(res)
				// 	 console.log(res.data)
				// 	 let curPageData = res.data;
				// 	 let curPageLen = curPageData.length; 
				// 	 // 与 mescroll-body 的处理方式一致 >
				// 	 //设置列表数据
				// 	 if(pageNum == 1) this.videosDatas = []; //如果是第一页需手动置空列表
				// 	 if(this.videosDatas==''){
				// 		 //this.tuijian = true;
				// 		 this.videosDatas = this.videosDatas.concat(curPageData); //追加新数据
				// 		 this.mescroll.endSuccess(curPageLen);		
				// 	 }else{
				// 		 //this.tuijian = false;
				// 		 this.videosDatas = this.videosDatas.concat(curPageData); //追加新数据
				// 		 this.mescroll.endSuccess(curPageLen);	
				// 	 }
					 
				//   }
				//   else{
				// 	uni.showToast({
				// 		icon: "none",
				// 	    title: res.msg,
				// 	    duration: 2000
				// 	});  
				//   }
				// }).catch(res => {
				// 	uni.showToast({
				// 		icon: "none",
				// 	    title: "数据获取失败或暂无数据",
				// 	    duration: 2000
				// 	}); 
				// 　　// 失败进行的操作
				// })
			},
			//获取我的视频
			getuservideos (type,pageNum,pageSize){
				console.log(type,pageNum,pageSize)
				this.$api.uservideos({type:this.isShow,page:pageNum,size:pageSize}).then(res => {
					console.log(res)
				  if(res.code === 200){	
					  console.log(res.data)
					  let curPageData = res.data;
					  let curPageLen = curPageData.length; 
					  // 与 mescroll-body 的处理方式一致 >
					  //设置列表数据
					  if(pageNum == 1) this.videolist = []; //如果是第一页需手动置空列表
					  this.videolist = this.videolist.concat(curPageData); //追加新数据
					  this.mescroll.endSuccess(curPageLen);
							// this.tuijian = false;
							// this.gettuijiantickets();
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
			videoHandler (id) {
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			},
			searchHandler(pageNum,pageSize){
				console.log(pageNum,pageSize)
				if(this.tabindexs === 0){
					this.isShow = 1;
					this.getuservideos(this.isShow,pageNum,pageSize);
				}else{
					this.isShow = 2;
					this.getuservideos(this.isShow,pageNum,pageSize);
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
	.center_o{
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.header{
		position: fixed;
		z-index: 1;
		width: 100%;
		display: flex;
		height:45px;
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
	.cent_boundary{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 65rpx;
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
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		text{
			padding: 0 20rpx;
		};
	}
</style>
