<template>
	<view>
		<view class="com-tickets-body" v-for="(item, index) of ticketslist" :key="index">

			<view class="tickets-body-top"  @tap="btndata(item.id)">
				<view class="tickets-body-title">
					<view class="logo">
						<image src="../../static/img/dingdan.png" mode=""></image>
					</view>
					<view class="introduce">
						<view class="introduce-title">
							{{item.title}}
						</view>
						<view class="introduce-title-en">
							{{item.mini_title}}
						</view>
					</view>
					<view class="quantity">
						<text>
							{{item.good_count}}张
						</text>
					</view>
				</view>
				<view class="footer">
					<view class="footer_l">
						<image src="../../static/img/order/shijian.png" mode=""></image>
						<text>{{item.effective_time}}</text>
					</view>
					<view class="footer_r">
						<image src="../../static/img/order/jinqian.png" mode=""></image>
						<text>{{item.total_price}}</text>
					</view>
				</view>
			</view>
			<view class="center_r">
				<view class="center_r_o" :style="ticketcolor" v-if="item.status===-1" >
					<text @tap="btndata(item.id)">已取消</text>
				</view>
				<view class="center_r_o" :style="ticketcolor" v-if="item.status===1" >
					<text @tap="btndata(item.id)">待付款</text>
				</view>
				<view class="center_r_o" :style="ticketcolor" v-if="item.status===4" >
					<text @tap="btndata(item.id)">待使用</text>
				</view>
				<view class="center_r_o" :style="ticketcolor" v-if="item.status===5" >
					<text @tap="btndata(item.id)">已完成</text>
				</view>
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
			ticketslist: {
				type: Array,
				default: () => []
			},
			ticketcolor: {
				default: () => {
					color:'#13BE6F'
				},
				type: Object
			}
		},
		methods:{
			saleafter(){
				uni.navigateTo({
					url: '/pages/pages-saleafter/pages-saleafter'
				});
			},
			btndata(id){
				uni.navigateTo({
					url: `/pages/order-eratickets/order-eratickets?id=${id}`
				});
				//uni.setStorageSync('storage_key', type);
			}
		}
	}
</script>
<style lang="scss" scoped>
.page-wrapper{
	background-color: rgba(249,249,249,1);
}
.quantity{
	font-size: 28rpx;
	color: #999999;
	float: right;
	margin-right: 15%;
}
.com-tickets-body{
	width: 100%;
	overflow: hidden;
	.center_r{
		width: 20%;
		float: left;
		height: 270rpx;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 20rpx;
		border-bottom: 2rpx dotted rgba(249,249,249,1);
		.center_r_o{
			width: 30rpx;  
			margin: 0 auto;
			height: 270rpx;
			display: flex;
			color: #13BE6F;
			align-items: center;
			line-height: 35rpx;  
			font-size: 28rpx;

		}
	}
	.tickets-body-top{
		width: 80%;
		float: left;
		border-radius: 20rpx;
		height: 270rpx;
		background-color: #fff;
		border-bottom: 2rpx dotted rgba(249,249,249,1);
		.tickets-body-title{
			width: 100%;
			height: 50%;
			padding: 40rpx 0 0 40rpx;
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;
			.logo{
				width: 68rpx;
				float: left;
				height: 68rpx;
				background-color: #13BE6F;
				border-radius:10rpx;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.introduce{float: left;}
			.introduce-title{
				font-size:34rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				line-height: 34rpx;
				padding-bottom: 13rpx;
			}
			.introduce-title-en{
				font-size:22rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
		}
		.tickets-body-form{
			display: flex;
			justify-content: space-around;
			align-items: center;
			.money{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:bold;
				padding-bottom: 19rpx;
				padding-top: 48rpx;
			}
			.type{
				line-height: 28rpx;
				color: #999999;
				font-size:24rpx;
				text{
					font-size: 20rpx;
					font-family:PingFang SC;
					font-weight:500;
					display: inline-block;
					margin-left: 5rpx;
					width: 28rpx;
					height: 28rpx;
					line-height: 28rpx;
					text-align: center;
				}
			}
			.have-tickets{
				.money{
					color: #E56A4D;
				}
				.type{
					text{
						background-color: #c1dace;
						color: #13BE6F;
						border-radius:5rpx;
					}
				}
			}
			.no-tickets{
				.money{
					color: #BBBBBB;
				}
				.type{
					text{
						color: #BBBBBB;
						background-color: rgba(249, 249, 249, 1);
						border-radius:5rpx;
					}
				}
			}
		}
	}
	.tickets-body-bottom{
		border-radius: 20rpx;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		background-color: #fff;
		height: 108rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.timer{
			color: #333333;
			font-size: 28rpx;
		}
		.buy{
			color: #999999;
			font-size: 28rpx;
		}
	}
}
.footer{
	width: 100%;
	overflow: hidden;
	image{
		width:30rpx;
		height: 30rpx;
	}
	.footer_l,.footer_r{
		float: left;
		width: 50%;
		padding-left: 35rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		text{
			padding-left: 10rpx;
			box-sizing: border-box;
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
		}
	}
}
</style>
