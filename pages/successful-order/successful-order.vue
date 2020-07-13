<template>
	<view class="successful-order">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" title="订单成功" :border="false"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="successful-body">
			<image src="../../static/img/icon/success.png" mode=""></image>
			<view class="success-info">
				恭喜您，下单成功
			</view>
			<view class="order-btn"@tap="orderBtnHandler()">
				查看订单
			</view>
			<view class="order-btns" style="margin-top: 40rpx;" @tap="goback">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				order_id:'',
				buy_type:''
			};
		},
		components: {
			uniNavBar
		},
		onLoad(opction) {
			this.order_id = opction.id;
			console.log(this.order_id)
		},
		methods: {
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
			// 跳转订单
			orderBtnHandler() {
				let id = this.order_id;
				console.log(this.order_id)
				//获取订单详情
					this.$api.orderdetail({order_id:id}).then(res => {
						  //console.log(res)
					  if(res.code === 200){	
						   console.log(res)
						    this.buy_type = res.data.buy_type;
						   // console.log(res.data.buy_type)
						   if(this.buy_type==1){
							   uni.navigateTo({
							    url: `/pages/order-eravideo/order-eravideo?id=${id}`
							   })
							  
						   }else if(this.buy_type==2 || this.buy_type==4){
							   uni.navigateTo({
							   	url: `/pages/order-eratickets/order-eratickets?id=${id}`
							   })
						   }
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
				// //uni.setStorageSync('storage_key', '已完成');
				// uni.navigateTo({
				// 	url: `/pages/order-eratickets/order-eratickets?id=${id}`
				// })
			},
			goback(){
				uni.switchTab({
				   url: '/pages/home/home'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.successful-order{
		
	}
	.successful-body{
		width: 520rpx;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 50%;
		margin-left: -260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			display: block;
			width: 150rpx;
			height: 150rpx;
		}
		.success-info{
			font-size:28rpx;
			line-height: 28rpx;
			padding-top: 40rpx;
			padding-bottom: 110rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.order-btn{
			width: 100%;
			height:88rpx;
			text-align: center;
			line-height: 88rpx;
			background:rgba(19,190,111,1);
			border-radius:44px;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
		.order-btns{
			width: 100%;
			height:88rpx;
			text-align: center;
			line-height: 88rpx;
			background:#FFFFFF;
			border-radius:44px;
			border: 2rpx solid #00C456;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:#00C456;
		}
	}
</style>
