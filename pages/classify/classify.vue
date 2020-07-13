<template>
	<view class="box">
		<!-- <view class="status_bar">
		</view> -->
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="120" @down="downCallback" :up="upOption" @up="upCallback" >
		<view class="home-body-wrapper">
			
			<view class="body-item" v-for="(item, index) of data" :key="index">
				<view class="body-item-top">
					<view class="body-item-title">
						<view class="body-title">
							{{item.title}}
						</view>
						<view class="body-introduce">
							{{item.desc}}
						</view>
					</view>
					<view class="body-item-look"@tap="lookHandler(item.id)">
						查看门票
					</view>
				</view>
				<com-video :videoData="item.videos"></com-video>
				
			</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import comVideo from "@/components/com-video/com-video.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				title:'',
				data:[],
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				parms:''
			};
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.parms = option.id; 
			//this.getvideolist();
		},
		components: {
			comVideo
		},
		methods: {
			/*下拉刷新的回调*/
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page)
				this.getvideolist(pageNum,pageSize)
			},
			getvideolist(pageNum,pageSize){
				if(this.parms){
					this.$api.videoslist({id:this.parms,page:pageNum,size:pageSize}).then(res => {
					   // 获得分类下得视频数据 
					  if(res.code === 200){	
						  console.log(res)
						 this.title= res.data[0].title;
						 let curPageData = res.data;
						 let curPageLen = curPageData.length; 
						 console.log(this.data)
						 // 与 mescroll-body 的处理方式一致 >
						 //设置列表数据
						 if(pageNum == 1) this.data = []; //如果是第一页需手动置空列表
						 this.data = this.data.concat(curPageData); //追加新数据
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
			// 查看门票
			lookHandler (type) {
				uni.navigateTo({
					url: `/pages/tickets-page/tickets-page?id=${type}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
	}
.home-body-wrapper{
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 40rpx 50rpx;
		.body-item{
			padding: 56rpx 0 0;
		}
		.body-item-top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.body-title{
				color: #333333;
				font-weight: bold;
				font-size: 38rpx;
				line-height: 38rpx;
				padding-bottom: 19rpx;
			}
			.body-introduce{
				color: #999999;
				font-size: 22rpx;
			}
			.body-item-look{
				width:160rpx;
				height:64rpx;
				line-height: 64rpx;
				text-align: center;
				border:1rpx solid rgba(229,229,229,1);
				border-radius:32rpx;
				font-size:26rpx;
				font-weight:500;
				color:rgba(153,153,153,1)
			}
		}
		
	}
</style>
