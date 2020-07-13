<template>
	<view class="box">
		<view class="header">
			<view class="header_l">
					<view class="header_size" v-if="pagetext.unpaid===-1">已取消</view>
					<view class="header_size" v-if="pagetext.unpaid===1">待付款</view>
					<view class="header_size" v-if="pagetext.unpaid===5">已完成</view>
					<view class="header_size" v-if="pagetext.unpaid===4&&buy_type==1">已完成</view>
					<view class="header_size" v-if="pagetext.unpaid===4&&buy_type==2">待使用</view>
					<view class="header_size" v-if="pagetext.unpaid===4&&buy_type==4">待使用</view>
					<view class="header_min" v-if="pagetext.unpaid===1">支付剩余时间 {{pagetext.data}}</view>
					<view class="header_min" v-if="pagetext.unpaid===-1">很遗憾，该订单已取消</view> 
					<view class="header_min" v-if="pagetext.unpaid===-5">请在视频有效期内观看</view>
					<view class="header_min" v-if="pagetext.unpaid===-4">请在视频有效期内评论</view>
			</view>
			<view class="header_r">
				<view class="header_bo">
					<image src="../../static/img/daifukuan.png" mode="" v-if="pagetext.unpaid === 1"></image>
					<image src="../../static/img/daishiyong.png" mode="" v-if="pagetext.unpaid === 4"></image>
					<image src="../../static/img/yiwancheng.png" mode="" v-if="pagetext.unpaid === 5"></image>
					<image src="../../static/img/quxiao.png" mode="" v-if="pagetext.unpaid === -1"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['pagetext','buy_type'],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.box{
	width: 100%;
	.header{
		width: 100%;
		height: 157rpx;
		display: flex;
		padding: 0 20rpx;
		box-sizing: border-box;
		justify-content: space-between; // 两边平分
		align-items: center;
		.header_l{
			font-size:38rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color: #FFFFFF;
			.header_min{
				font-size:28rpx;
				line-height: 42rpx;
			}
		}
		.header_r .header_bo{
			width: 68rpx;
			height: 68rpx;
			border-radius:10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
