<template>
	<view>
		<view class="pay-dialog-wrapper" v-show="payDialogVisible">
			<view class="dialog-wrapper">
				<view class="title">删除提示</view>
				<view class="del">{{title||titles}}</view>
				<view class="pay-submit">
					<view class="pay-submit-l"@tap="calloff">
						取消
					</view>
					<view class="pay-submit-l pay-submit-d"@tap="affirm">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			payDialogVisible:{
				default: () => false,
				type:Boolean
			},
			title:{
				default: '您确定要删除所有记录吗？',
				type:String
			},
			titles:{
				default: '您确定要删除所有记录吗？',
				type:String
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			calloff(){
				this.$emit('payDialog')
			},
			affirm(){
				this.$emit('desucceed')
			},
		}
	}
</script>

<style lang="scss" lang="scss" scoped>
	.pay-dialog-wrapper{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		margin: auto auto;
		background-color: rgba(0,0,0,0.5);
		transition: 0.45s;
	}
	.dialog-wrapper{
		width: 600rpx;
		height: 350rpx;
		background:rgba(255,255,255,1);
		box-sizing: border-box;
		border-radius:20rpx;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: auto auto;
		.title{
			font-size:32rpx;
			line-height: 32rpx;    
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
			padding-top: 60rpx;

		}
		.del{
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			/* line-height: 52px; */
			color: #7a7d84;
		}
		.pay-submit{
			width:100%;
			height:114rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			line-height: 114rpx;
			display: flex;
			justify-content: space-around;
			text-align: center;
			border-top: 1px solid #F4F4F4;
			.pay-submit-l{
				font-size:28rpx;
				width: 50%;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(122,125,132,1);
			}
			.pay-submit-d{
				border-left: 1px solid #F4F4F4;
				color:rgba(18,191,111,1);
			}
		}
	}
</style>
