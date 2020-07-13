<template>
	<view>
		<view class="com-tickets-body" v-for="(item, index) of ticketsData" :key="index">
			<view class="inputCheckWarp" @tap="inputCheckWarpClick(item, index)" v-if="checkState">
				<inputCheck :clickstate="item.state"/>
			</view>
			<view class="minConWarp">
				<view class="tickets-body-top" :style="{'border-color':border}">
					<view class="tickets-body-title">
						<view class="logo">
							<!-- 记得换logo   -->
							<image :src="item.logo"   mode=""></image>
						</view>
						<view class="introduce">
							<view class="introduce-title">
								{{item.title}}
							</view>
							<view class="introduce-title-en">
								{{item.mini_title}}
							</view>
						</view>
							<image src="../../static/img/kai.png" style="width: 26rpx; height: 26rpx;padding-top: 8rpx;padding-right: 8rpx;"></image>
							<view style="font-size: 30rpx;padding-left: 8rpx;padding-top: 8rpx;padding-right: 8rpx;">{{item.open_time.split('-')[0]}}</view>-
							<image src="../../static/img/bi.png" style="width: 26rpx; height: 26rpx;margin-left: 15rpx;padding-top: 8rpx;padding-right: 8rpx;"></image>
							<view style="font-size: 30rpx;padding-left: 8rpx;padding-top: 8rpx;">{{item.open_time.split('-')[1]}}</view>
					</view>
					<view class="tickets-body-form">
						<view  v-for="(subItem, subIndex) of item.specs" :key="subIndex" :class="subItem.stock-subItem.sale>0 ? 'have-tickets' : 'no-tickets'">
							<view class="money">
								¥{{subItem.price}}
							</view>
							<view class="type">
								{{subItem.spec}}
								<text>{{subItem.stock-subItem.sale>0 ? '有' : '无'}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="tickets-body-bottom">
					<view class="timer">
						<image src="../../static/img/tongzhi.png" style="width: 26rpx; height: 26rpx;"></image>
						<view style="margin-left: 15rpx;">{{item.tip}}</view>
					</view>
					<view class="buy"@tap="buyHandler(item.cate_id)"  v-if="handler.length == 0">
						<text>购买</text>
						<image src="../../static/img/goumai.png" mode="" style="width: 22rpx;height: 22rpx;margin-left: 10rpx;"></image>
					</view>
					<!-- <view class="buy"@tap="buyHandler" v-if="handler.length == 0&&item.btn!='门票'">
						<text>{{item.btn}}</text>
						<image src="../../static/img/goumai.png" mode="" style="width: 22rpx;height: 22rpx;margin-left: 10rpx;"></image>
					</view> -->
					<!-- <view class="buy buycolor" v-if="item.type === '1'">
						<text>门票</text>
					</view> -->
					<view class="handler" v-if="handler.length > 0">
						<view v-for="(item, index) of handler" :key="index" :class="handlerIndex == index ? 'active' : '' "@tap="ticketsHandler(index)">{{item.title}}</view>
					</view>
				</view>
<!-- 				<view class="tickets-body-bottom">
					<view class="timer">
						<image  v-if="item.type === '门票'" src="../../static/img/icon/timer3.png" style="width: 26rpx; height: 26rpx;"></image>
						<image  v-else src="../../static/img/tongzhi.png" style="width: 26rpx; height: 26rpx;"></image>
						<view v-if="item.btn === '门票'">{{item.open_time}}</view>
						<view v-else style="margin-left: 15rpx;">通知：故宫每周一闭馆</view>
					</view>
					<view class="buy"@tap="buyHandler" v-if="handler.length == 0&&item.btn!='门票'">
						<text>{{item.btn}}</text>
						<image src="../../static/img/goumai.png" mode="" style="width: 22rpx;height: 22rpx;margin-left: 10rpx;"></image>
					</view>
					<view class="buy buycolor" v-if="item.btn === '门票'">
						<text>{{item.btn}}</text>
					</view>
					<view class="handler" v-if="handler.length > 0">
						<view v-for="(item, index) of handler" :key="index" :class="handlerIndex == index ? 'active' : '' "@tap="ticketsHandler(index)">{{item.title}}</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import inputCheck from "../input-check/input-check.vue"
	export default {
		data() {
			return {
				handlerIndex: 0
			};
		},
		props: {
			ticketsData: {
				
			},
			border: {
				default: 'rgba(249,249,249,1)',
				type: String
			},
			handler: {
				type: Array,
				default: () => []
			},
			checkState:{
				default: () => false,
				type:Boolean
			},
			ticketsIndex:{
				default: 0,
				type: Number
			}
		},
		mounted() {			
			this.handlerIndex = this.ticketsIndex;
			
		},
		methods: {
			buyHandler (id) {	
				uni.navigateTo({
					url: `/pages/pays-place-order/pays-place-order?id=${id}`
				})
			},
			inputCheckWarpClick(item,index){
				this.ticketsData[index].state = !this.ticketsData[index].state;
			},
			ticketsHandler(index){
				this.handlerIndex = index
				this.$emit('comticketsClick',index)
			}
		},
		components:{
			inputCheck
		}
	}
</script>
<style lang="scss" scoped>
.page-wrapper{
	background-color: rgba(249,249,249,1);
}
.com-tickets-body{
	width: 100%;
	margin-bottom: 30rpx; 
	display: flex;
	align-items: center;
	.inputCheckWarp{
		margin-right: 30rpx;
	}
	.minConWarp{
		width: 100%; 
		min-width: 670rpx;
		transition: 0.3s;
	}
	.tickets-body-top{
		border-radius: 20rpx;
		background-color: #fff;
		border-bottom: 2rpx dotted rgba(249,249,249,1);
		.tickets-body-title{
			padding: 40rpx 0 0 40rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.logo{
				width: 68rpx;
				height: 68rpx;
				border-radius:10rpx;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.introduce{
				width: 40%;
			}
			.introduce-title{
				font-size:34rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				line-height: 34rpx;
				
			}
			.introduce-title-en{
				padding-top: 13rpx;
				font-size:22rpx;
				line-height: 22rpx;
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
				text-indent: 10rpx;
			}
			.type{
				line-height: 28rpx;
				color: #999999;
				font-size:24rpx;
				padding-bottom: 30rpx;
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
						background-color: #E7F8F0;
						color: #13BE6F;
						padding: 3rpx;
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
    border-top: 3px #BFE9D6 dashed;
		box-sizing: border-box;
		background-color: #fff;
		height: 108rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.buy{
			color: #999999;
			font-size: 28rpx;
		}
    .timer{
      color: #333333;
      font-size: 28rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      image{
        margin-right: 10rpx;
      }
      // flex-direction: column;
    }
		.handler{
			width:200rpx;
			height:50rpx;
			line-height: 50rpx;
			background:rgba(19,190,111,0.1);
			border-radius:25rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			view{
				width:100rpx;
				height:50rpx;
				// background:rgba(19,190,111,1);
				border-radius:25rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:500;
				text-align: center;
				color:rgba(19,190,111,0.6);
				
			}
			view.active{
				background:rgba(19,190,111,1);
				color:rgba(255,255,255,1);
			}
		}
	}
}
.timer{
  color: #333333;
  font-size: 28rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  image{
    margin-right: 10rpx;
  }
  // flex-direction: column;
}
.timer-mar{
  margin-left: 5%;
  margin-top: 47rpx;
}
.buycolor{
	width:100rpx;
	height:50rpx;
	text-align: center;
	background-color: #E7F8F0;
	line-height: 50rpx;
	border-radius:25rpx;
	text{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:#13BE6F;
	}
}
</style>
