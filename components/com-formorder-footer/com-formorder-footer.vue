<template>
	<view class="box">
		<view class="box_cent">
			<text>总计金额</text>
			<text class="cent_sizi size_col">{{fnlist.username}}</text>
		</view>
		<view class="box_cent" v-if="fnlist.isShow=='1'||fnlist.isShow=='2'||fnlist.isType==3">
			<text>支付方式</text>
			<text class="cent_sizi">{{fnlist.typeName}}</text>
		</view>
		<view class="box_cent">
			<text>下单时间</text>
			<text class="cent_sizi">{{fnlist.identity}}</text>
		</view>
		<view class="box_cent">
			<text>订单编号</text>
			<text class="cent_sizi">{{fnlist.money}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			fnlist: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.box_cent{
		display: flex;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0;
		text{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.cent_sizi{
			padding-left: 30rpx;
			color:rgba(51,51,51,1);
		}
		.size_col{
			font-weight:bold;
			color:rgba(229,106,77,1);
		}
	}
</style>
