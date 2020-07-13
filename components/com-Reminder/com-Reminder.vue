<template>
	<view class="com-Reminder">
		<view class="title">
			<text>温馨提示</text>
			<image src="../../static/img/icon/tishiicon.png"></image>
		</view>
		<view class="content">
			<!-- <view>1.温馨提示在后台可编辑，在后台可编辑。</view>
			<view>2.温馨提示在后台可编辑，在后台可编辑。温馨提示在后台可编辑，在后台可编辑。</view> -->
			<view v-html="seatcontent">
				
			</view>
			
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
			seatcontent: {
				type: String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-Reminder{
		width: 100%;
		background:rgba(255,255,255,1);
		border-radius:20px;
		.title{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			line-height: 110rpx;
			color:rgba(51,51,51,1);
			border-bottom: 1rpx solid rgba(0,0,0,0.1);
			text-indent: 32rpx;
			image{
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin-left: 12rpx;
			}
		}
		.content{
			box-sizing: border-box;
			padding: 54rpx 32rpx;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
			line-height: 44rpx;
		}
	}
</style>
