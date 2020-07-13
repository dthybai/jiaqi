<template>
	<view class="box">
		<view class="center_box" v-for="(subItem, subIndex) of videolist" :key="subIndex">
			<view class="header">
				<view class="header_o">
					<image src="/static/img/order/video.png" mode=""></image>
					<text>视频</text>
				</view>
				<view class="header_t" v-if="subItem.status===-1">
					<text@tap='btndata(subItem.id,videolist[subIndex].goods[0].good_id)'>已取消</text>
				</view>
				<view class="header_t" v-if="subItem.status===1">
					<text@tap='btndata(subItem.id,videolist[subIndex].goods[0].good_id)'>待付款</text>
				</view>
				<view class="header_t" v-if="subItem.status===4">
					<text@tap='btndata(subItem.id,videolist[subIndex].goods[0].good_id)'>已完成</text>
				</view>
				<!-- <view class="header_t" v-if="subItem.status===5">
					<text@tap='btndata(subItem.id,videolist[subIndex].goods[0].good_id)'>已完成</text>
				</view> -->
			</view>
			<view class="body-item-bottom" style="padding-left: 20rpx">
				<view class="image-wrapper" @tap="videoHandler(videolist[subIndex].goods[0].good_id)">
					<image :src="videolist[subIndex].goods[0].logo" class="img-url"></image>
					<image src="/static/img/icon/play.png" class="paly"></image>
				</view>
				<view class="item-bottom-wrapper">
					<view class="title">{{subItem.title}}</view>
					<view class="introduce">下单时间{{subItem.create_at}}</view>
					<view class="introduce">总价：￥{{subItem.total_price}}</view>
				</view>
			</view>
			<view class="footer" v-if='subItem.status!=5&&subItem.status!=-1&&subItem.status!=4'>
				<view class="zhifu">
					<text @tap="pay(subItem.id,subItem.buy_type)">立即支付</text>
				</view>
				<view class="quxiao" @tap="delorder(subItem.id)">
					<text >取消订单</text>
				</view>
			</view>
		</view>
		<comdelete :title='title' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import comdelete from "@/components/com-delete/com-delete.vue"
	export default {
		data() {
			return {
				title:'您确定要取消删除吗？',
				payDialogVisible: false,
				order_id:''
			}
		},
		props: {
			videodai: {
				default:'待付款',
				type: String
			},
			videolist: {
				default: () => [],
				type: Array
			}
		},
		components: {
			comdelete
		},
		methods: {
			delorder(id){
				this.order_id = id;
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
				this.$api.orderCancel({order_id:this.order_id}).then(res =>{
					  console.log(res)
				  if(res.code === 200){
					  console.log(res)
					  this.payDialogVisible = false;
					   this.videolist.splice(this.typeindex,1)
					 
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
			},
			
			//立即支付
			//立即支付
			pay(id,type){
				console.log(this.videolist)
				console.log(id,type)
				this.$api.pay({order_id:id,pay_type:type}).then(res => {
				  if(res.code === 200){
					  var orderInfo = res.data;
					  if(type==1){
						  uni.requestPayment({
						  provider: 'wxpay',
						  orderInfo: orderInfo, //订单数据
						  success: function(res) {
						  //处理业务逻辑
						  // uni.navigateTo({
						  // 	url: `/pages/successful-order/successful-order?id=${id}`
						  // })
						  },
						  fail: function(err) {
						  console.log('fail:' + JSON.stringify(err));
						  uni.showToast({
						  icon: 'none',
						  title: '支付失败'
						  }); 
						  }  
						  });
					  }else if(type==3){
						  let orderInfos = JSON.stringify(orderInfo)
						  console.log(orderInfos)
						  uni.requestPayment({
						  provider: 'alipay',
						  orderInfo: orderInfo, //订单数据
						  success: function(res) {
						  //处理业务逻辑
						  console.log(res)
						  },
						  fail: function(err) {
						  console.log('fail:' + JSON.stringify(err));
							  uni.showToast({
							  icon: 'none',
							  title: '支付失败'
							  });
						  }
						  });
					  }else if(type==2){
						  uni.showToast({
						  	icon: "none",
						      title: '文化币支付',
						      duration: 2000
						  });
					  }						  
						
				  }
				  else{
					uni.showToast({
						icon: "none",
					    title: "",
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
			},
			videoHandler (id) {
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			},
			btndata(id,ids){
				console.log(id,ids)
				//uni.setStorageSync('storage_video', type);
				uni.navigateTo({
					url: `/pages/order-eravideo/order-eravideo?id=${id}&ids=${ids}`
				});
				//&ids=${ids}
			}
		},
	}
</script>

<style lang="scss" scoped>
.center_box{
	border-radius:20rpx;
	margin-top: 40rpx;
	// height: 460rpx;
	padding-bottom: 30rpx;
	background-color: #fff;
}
.header{
	padding: 0 20rpx;
	box-sizing: border-box;
	overflow: hidden;
	width: 100%;
	height: 116rpx;
	line-height: 116rpx;
	border-bottom: 1rpx solid #F2F2F2;
	.header_o{
		color: #333;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		float: left;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.header_t{
		color: #13BE6F;
		font-size: 26rpx;
		float: right;
	}
}
	.body-item-bottom{
		width: 100%;
		display: flex;
		padding-top: 32rpx;
		justify-content: left;
		.image-wrapper{
			width: 210rpx;
			height: 140rpx;
			border-radius: 10rpx;
			position: relative;
			image.img-url{
				width: 210rpx;
				height: 140rpx;
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
			padding-left: 25rpx;
			width: 370rpx;
			.title{
				color: #333333;
				font-size: 28rpx;
				line-height: 44rpx;
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
		margin-top: 32rpx;
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
</style>
