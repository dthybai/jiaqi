<template>
	<view class="com-footer">
		<view class="image">
			<image :src="this.is_collect ? '../../static/img/icon/shoucang.png':'../../static/img/home-xing.png'"@tap="choucangHandler()"></image>
		</view>
		<view class="look"@tap="lookHandler">
			查看门票
		</view>
		<view class="buy"@tap="paysHandler(ids)" v-if="is_buy==false">
			购买本视频
		</view>
		<view class="buy"@tap="paysHandler(ids)" v-if="is_buy==true">
			去续费
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				type:1,
				good_id:''
			};
		},
		props: {
			ids: {
				type: String,
				default: ''
			},
			is_collect: {
				type: Boolean
			},
			is_buy: {
				type: Boolean
			},
			
		},
		methods: {
			paysHandler(id) {
				uni.navigateTo({
					url: `/pages/pays-video-page/pays-video-page?id=${id}`
				})
			},
			lookHandler(){
				uni.navigateTo({
					url: '/pages/tickets-page/tickets-page'
				})
			},
			//收藏按钮
			choucangHandler() {
				this.is_collect = !this.is_collect;
				//this.isShow = this.is_collect;
				if(this.is_collect === true){
					this.$api.collectinfo({good_id:this.ids,type:this.type}).then(res => {
					  if(res.code === 200){	
						  console.log(res)
						  
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "数据获取失败或暂无数据",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
				}else{
					this.$api.collectinfo({good_id:this.ids,type:this.type}).then(res => {
					  if(res.code === 200){	
						  console.log(res)
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "数据获取失败或暂无数据",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.com-footer{
	width: 100%;
	background-color: #fff;
	height: 112rpx;
	line-height: 112rpx;
	box-sizing: border-box;
	padding: 0 40rpx 0 60rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	left: 0;
	bottom: 0;
	.image{
		width:40rpx;
		height:40rpx;
		display: block;
		margin-right: 50rpx;
	}
	image{
		width:40rpx;
		height:40rpx;
		display: block;
	}
	.look{
		width:270rpx;
		height:80rpx;
		background:rgba(19,190,111,0.1);
		border-radius:40rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(19,190,111,1);
		text-align: center;
		line-height: 80rpx;
	}
	.buy{
		width:270rpx;
		height:80rpx;
		background:rgba(19,190,111,1);
		border-radius:40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
}
</style>
