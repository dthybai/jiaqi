<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="logo">
			<view class="logoT" >
				<image style="width: 160rpx;height: 160rpx;" :src="aboutoursData.logo" mode=""></image>
			</view>
		</view>
		<view class="con">
			<view class="name border-b">
				<text>工作时间</text>
				<text>{{aboutoursData.work_time}}</text>
			</view>
			<view class="name">联系我们</view>
			<view class="qrCode" >
				<view class="item" v-for="(item, index) of aboutoursData.customer" :key="index">
					<image style="width: 210rpx;height: 210rpx;" :src="item.code_img" mode=""></image>
					<text class="tit">{{item.title}}</text>
					<text class="num">{{item.phone}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

	export default {
		data() {
			return {
				title: '联系我们',
				aboutoursData:[]
			};
		},
		components: {
			uniNavBar,
		},
		onLoad() {
			this.getaboutours();
		},
		methods:{
			//获取联系我们
			getaboutours() {
				this.$api.aboutours().then(res => {
				  if(res.code === 200){
					  console.log(res.data)
					  this.aboutoursData = res.data;
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.border-b{
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.logo{
		width:750rpx;
		height:320rpx;
		background:rgba(248,248,248,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-image{
		width:160rpx;
		height:160rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		font-size:40rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.con{
		padding: 0 60rpx;
		.name{
			height: 120rpx;
			line-height: 120rpx;
			display: flex;
			justify-content: space-between;
			font-size:28rpx;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
	.qrCode{
    background: rgba(255,255,255,1);
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.04);
	padding: 43rpx 0;
    border-radius: 10px;
		display: flex;
		margin-top: 50rpx;
		justify-content: space-around;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			.tit{
				color:#333333;
				font-size: 28rpx;
				padding: 20rpx 0;
			}
			.num{
				font-size: 24rpx;
				color:#999999;
			}
		}
	}
</style>
