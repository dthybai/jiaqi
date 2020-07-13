<template>
	<view class="page-wrapper">
		<view class="body-item-bottom" v-for="(subItem, subIndex) of videoData" :key="subIndex">
			<view class="inputCheckWarp"@tap="inputCheckWarpClick(subItem, subIndex)" v-if="checkState">
				<inputCheck :clickstate="subItem.state"/>
			</view>
			<view class="minConWarp" @tap="videoHandler(subItem.good_id)"> 
				<view class="image-wrapper" >
					<image :src="subItem.adv_img" class="img-url"></image>
					<image src="../../static/img/icon/play.png" class="paly"></image>
				</view>
				<view class="item-bottom-wrapper" :class="{'min-item-bottom-wrapper':checkState}">
					<view class="title">{{subItem.title }}</view>
					<view class="introduce"> {{subItem.mini_title}}</view>
					<view class="details">
						<text class="money">￥{{subItem.price}}</text>
						<text class="count"><text class="text1">播放量</text><text class="text2">{{subItem.play_num||subItem.read_num}}</text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import inputCheck from "../input-check/input-check.vue"
	export default {
		data() {
			return {
				
			}
		},
		props: {
			videoData: {
				default: () => [],
				type: Array
			},
			checkState:{
				default: () => false,
				type:Boolean
			}
		},
		methods: {
			inputCheckWarpClick(item,index){
				this.videoData[index].state = !this.videoData[index].state;
				console.log(item)
				//console.log(item,index)
			},
			videoHandler (id) {
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			}
		},
		components:{
			inputCheck
		}
	}
</script>
<style scoped lang="scss">
	.body-item-bottom{
		width: 100%;
		padding: 32rpx 0;
		display: flex; 
		align-items: center;
		.inputCheckWarp{
			margin-right: 30rpx;
		}
		.minConWarp{
			display: flex;
			justify-content: space-between;
			width: 100%;
			transition: 0.3s;
		}
		.image-wrapper{
			width: 270rpx;
			height: 180rpx;
			border-radius: 10rpx;
			position: relative;
			padding-right: 30rpx;
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
		.min-item-bottom-wrapper.item-bottom-wrapper{
			width: 300rpx;
		}
		.item-bottom-wrapper{
			width: 370rpx;
			.title{
				color: #333333;
				font-size: 28rpx;
				line-height: 27rpx;
			}
			.introduce{
				color: #999999;
				font-size: 24rpx;
				line-height: 24rpx;
				padding-top: 19rpx;
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
					padding-right: 26rpx;
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
</style>
