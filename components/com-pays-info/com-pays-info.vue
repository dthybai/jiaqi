<template>
	<view class="pays-info-body">
		<view class="title">
			{{title||''}}
		</view>
		<view class="pays-info-item" v-for="(item, index) of paysInfoData"  :key="index">
			<view>
				<view class="username">
					{{item.name||''}}
					<text v-if="item.age_type===1">成人票</text>
					<text v-if="item.age_type===2">老人票</text>
					<text v-if="item.age_type===3">儿童票</text>
					<text v-if="item.age_type===4">学生票</text>
				</view>
				<view class="identity">
					{{item.card||''}}
				</view>
			</view>
			<view class="money">
				¥{{item.price||''}}
			</view>
			
		</view>
		<view class="pays-seat" v-if="paysInfoData.length>0 && video_type == 4&&car_name!=undefined">
			已选{{car_name}}
			<text v-for="(item, index) of seat_name" :key="index">
				{{item}}<text v-if="index != paysInfoData.length-1">,</text>
			</text>座
			
		</view>
		<view class="pays-seat" v-if="cars.length!=0">
			已选{{cars[0].car_name}}
			<text v-for="(item, index) of cars" :key="index">
				{{item.seat}}<text v-if="index != paysInfoData.length-1">,</text>
			</text>座
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
			title:	{
				type: String,
				default: '购买信息'
			},
			paysInfoData: {
				
			},
			seat_name:{},
			video_type:{},
			cars:{},
			car_name:{}
		}
	}
</script>

<style lang="scss" scoped>
	.pays-info-body{
		width:100%;
		background:rgba(255,255,255,1);
		border-radius:20px;
		.title{
			line-height: 90rpx;
			text-indent: 30rpx;
			border-bottom:1rpx solid rgba(0,0,0,0.05);
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.pays-seat{
			line-height: 110rpx;
			height: 110rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
	.pays-info-item{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.username{
			color: #333333;
			font-size: 28rpx;
			font-family:PingFang SC;
			line-height: 28rpx;
			padding-bottom: 20rpx;
			text{
				display: inline-block;
				line-height:20rpx;
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,187,2,1);
				background:rgba(255,187,2,0.1);
				padding: 5rpx;
				margin-left: 7rpx;
			}
		}
		.identity{
			font-size:24rpx;
			line-height: 24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.money{
			color: #E56A4D;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
		}
	}
</style>
