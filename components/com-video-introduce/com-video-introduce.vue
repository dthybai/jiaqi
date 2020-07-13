<template>
	<view class="com-video-introduce">
		<view class="title">
			文字介绍
		</view>
		<view class="content" v-html="videodetail.content">
		</view>
		<!-- <view class="content">
			2.后台可编辑后台可编辑后台可编辑，后台可编辑，后台 可编辑后台可编辑。 
		</view>
		<view class="content">
			3.后台可编辑后台可编辑后台可编辑后台可编辑后台可编， 后台可编辑后台可编辑后台可编辑后台可编辑后台可编辑 后台可编辑后台可编辑。
		</view> -->
		<view class="imgs" v-for="(item,index) of videodetail.image" :key="index">
			<image :src="item"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			videodetail: {
				default: () => []
			}
		},
	}
</script>

<style lang="scss" scoped>
.com-video-introduce{
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;
	.title{
		font-size:32rpx;
		font-family:PingFang SC;
		line-height: 32rpx;
		padding-top: 60rpx;
		padding-bottom: 40rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.content{
		color: #666666;
		font-size: 26rpx;
		line-height: 44rpx;
		padding-bottom: 20rpx;
	}
	image{
		display: block;
		width: 100%;
	}
}
</style>
