<template>
	<view class="box">
		<view class="center_box">
			<view class="body-item-bottom" style="padding-left: 20rpx" v-for="(subItem, subIndex) of videolist" :key="subIndex">
				<view class="image-wrapper">
					<image :src="subItem.logo||subItem.adv_img" class="img-url" @tap="videoHandler(subItem.good_id||subItem.id)"></image>
					<image src="../../static/img/icon/play.png" class="paly"></image>
				</view>
				<view class="item-bottom-wrapper">
					<view class="title">{{subItem.title}}</view>
					<view class="introduce">视频期限{{subItem.day}}天</view>
					<view class="introduce incol" v-if="subItem.time"><text>到期时间{{subItem.time}}</text></view>
					<view class="hezi" v-else></view>
					<view class="introduce intsize">
						<text>￥{{subItem.price}}</text>
						<text class="ntcolor">播放量{{subItem.read_num}}</text>
					</view>
				</view>
			</view>
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
			videolist: {
				// default: () => [
				// 	{
				// 		valid: '',
				// 		play: ''
				// 	}
				// ],
				// type: Array
			}
		},
		methods: {
			videoHandler(id){
				console.log(id)
				this.$emit('videoHandler',id)
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
.center_box{
	border-radius:20rpx;
	padding: 40rpx;
	background-color: #fff;
}

	.body-item-bottom{
		width: 100%;
		display: flex;
		padding: 32rpx 0;
		justify-content: left;
		.image-wrapper{
			width: 270rpx;
			height: 180rpx;
			border-radius: 10rpx;
			position: relative;
			image.img-url{
				width: 270rpx;
				height: 180rpx;
				border-radius: 10rpx;
			}
			image.paly{
				position: absolute;
				left: 16rpx;
				bottom: 16rpx;
				width: 44rpx;
				height: 44rpx;
			}
		}
		
		.item-bottom-wrapper{
			padding-left: 15px;
			width: 370rpx;
			.title{
				color: #333333;
				font-size: 26rpx;
				font-family:PingFang SC;
				font-weight:500;
				line-height: 27rpx;
			}
			.introduce{
				color: #999999;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
				line-height: 44rpx;
				padding-top: 19rpx;
			}
			.intsize{
				color: #E56A4D;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				display: flex;
				justify-content: space-between;
				padding-right: 40rpx;
				color:rgba(229,106,77,1);
				line-height: 24rpx;
				padding-top: 25rpx;
			}
			.details{
				vertical-align: bottom;
				padding-top: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				
				.money{
					vertical-align: bottom;
					color: #EC5E38;
					font-size: 30rpx;
					line-height: 30rpx;
					font-weight: bold;
				}
				.count{
					vertical-align: bottom;
					color: #999999;
					line-height: 30rpx;
					.text1{
						vertical-align: bottom;
						font-size: 20rpx;
						padding-right: 4rpx;
						line-height: 20rpx;
					}
					.text2{
						vertical-align: bottom;
						font-size: 28rpx;
						line-height: 21rpx;
					}
				}
			}
		}
	}
	.footer{
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
	}
	.quxiao{
		color: #666666;
		border: 1rpx solid #666666;
		margin-right: 30rpx;
	}
	.quxiao,.zhifu{
			font-size: 26rpx;
			width: 160rpx;
			height: 64rpx;
			line-height: 64rpx;
			border-radius:32rpx;
			text-align: center;
			float: right;
	}
	.zhifu{
		color: #13BE6F;
		border: 1rpx solid #13BE6F;
	}
	.incol{
		height:38rpx;
		border-radius:5px;
		padding: 0!important;
		text{
			line-height: 38rpx;
			font-size:20rpx;
			background:#ECFAF4;
			padding: 0 10rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(19,190,111,1);
		}
	}
	.hezi{
		height:38rpx;
	}
	.ntcolor{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
</style>
