<template>
	<view>
			<uni-nav-bar left-icon="" left-text=""  fixed :right-text="headerTitle.right" :backgroundColor="headerTitle.backgroundColor" :border="false" :color="headerTitle.color" title="视频订单详情" @clickLeft="clickLeft">
				<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
			</uni-nav-bar>
		<view class="pays-body-video">
			<headerv :pagetext='pagetext' :buy_type="buy_type"></headerv>
			<view class="video-checked">
				<view class="video-checked-form">
					<view class="header">
						<view class="header_o">
							<text>视频信息</text>
						</view>
					</view>
					<itemline :videolist='videolist' @videoHandler="videoHandler"></itemline>
				</view>
			</view>
			<view class="video-checked">
				<view class="video-checked-form" style="padding-bottom: 20rpx;margin-bottom: 50rpx;">
					<view class="header">
						<view class="header_o">
							<text>支付信息</text>
						</view>
					</view>
					<footerv :fnlist='fnlist'></footerv>
				</view>
			</view>
		</view>
		<view class="footer" v-if="age_video!=4">
			<view class="footer_color" v-if="age_video==1" @tap="delorder">
				取消订单
			</view>
			<view class="footer_color footer_si" v-if="age_video==1" @tap="pay">
				立即支付
			</view>
			<view class="footer_color footer_si" v-if="age_video==-1" @tap="lookHandler">
				再次购买
			</view>
			<!-- <view class="footer_color footer_si" v-if="age_video==4"  >
				已完成
			</view> -->
		</view>
		<comdelete  :titles='titles' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import headerv from "@/components/com-formorder-header/com-formorder-header.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import itemline from "@/components/com-video-itemline/com-video-itemline.vue"
	import footerv from "@/components/com-formorder-footer/com-formorder-footer.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	export default {
		components: {
			headerv,
			itemline,
			uniNavBar,
			footerv,
			comdelete
		},
		props: {
		},
		data() {
			return {
				pagetext:{
					unpaid:'',
					data:'',
					image:''
				},
				fnlist:{
					username:'',
					typeName: '',
					identity:'',
					money:'',
					isShow:'',
					isType:''
				},
				videolist:[
					
				],
				headerTitle:{
					backgroundColor:'#13BE6F',
					color:'#FFFFFF'
				},
				age_video:'',
				good_id:'',
				ids:'',
				buy_type:'',
				video_id:'',
				titles:'您确定要取消删除吗？',
				payDialogVisible: false
			};
		},
		onLoad(opction) {
			this.orderdetail(opction.id)
			this.ids = opction.ids;
			console.log(this.ids)
		},
		methods: {
			//获取订单详情
			orderdetail (id) {
				this.$api.orderdetail({order_id:id}).then(res => {
					  console.log(res)
				  if(res.code === 200){	
					   this.pagetext.unpaid = res.data.status;
					   this.pagetext.data = res.data.residue_time;
					   this.age_video = res.data.status;
					   this.good_id = res.data.id;
					   this.buy_type = res.data.buy_type
					   this.videolist = res.data.goods;
					   this.fnlist.username = res.data.total_price;
					   this.fnlist.typeName = res.data.pay_type;
					   this.fnlist.money = res.data.order_no;
					   this.fnlist.identity = res.data.create_at;	
					   this.video_id = res.data.goods[0].good_id;
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
			delorder(){
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ 
				this.$api.orderCancel({order_id:this.good_id}).then(res =>{
					  console.log(res)
				  if(res.code === 200){
					  console.log(res)
					  uni.showToast({
					  	icon: "none",
					      title: "订单已取消",
					      duration: 2000
					  }); 
					  this.payDialogVisible = false
					  this.orderdetail(this.good_id)
					 // uni.switchTab({
					 // 	url: '/pages/order/order'
					 // });
					 
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
			gomessage(video_id){
				let id = video_id
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
				console.log(video_id)
			},
			//立即支付
			pay(){
				this.$api.pay({order_id:this.good_id,pay_type:this.buy_type}).then(res => {
				  if(res.code === 200){
					  var orderInfo = res.data;
					  if(this.buy_type==1){
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
					  }else if(this.buy_type==3){
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
					  }else if(this.buy_type==2){
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
			lookHandler () {
				let id = this.ids;
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			},
			videoHandler (id) {
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			},
			clickLeft () {
				uni.switchTab({
					url: '/pages/order/order'
				});
			}
		},
		created() {
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.pays-body-video{
		width: 100%;
		min-height: 600rpx;
		box-sizing: border-box;
		padding: 40rpx 40rpx 207rpx;
		background:linear-gradient(180deg,rgba(19,190,111,1) 0%,rgba(19,190,111,0) 600rpx);
		.video-checked{
			width: 100%;
			margin-bottom: 20rpx;
			background:rgba(255,255,255,1);
			border-radius:20px;
			.title{
				text-align: center;
				line-height:32rpx;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				padding-top: 40rpx;
				padding-bottom: 90rpx;
			}
		}
		
	}
	.header{
		padding: 0 20rpx;
		box-sizing: border-box;
		overflow: hidden;
		width: 100%;
		height: 116rpx;
		line-height: 116rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}
	.header_o{
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		font-size: 32rpx;
		display: flex;
		align-items: center;
		float: left;
	}
	.footer{
		width: 100%;
		height:112rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 30rpx 0rpx rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		left: 0;
		height: 112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 40rpx 0 60rpx;
		justify-content: flex-end;
		align-items: center;
		.footer_color{
			width:200rpx;
			height:80rpx;
			border:1px solid rgba(238,238,238,1);
			border-radius:40rpx;
			line-height: 80rpx;
			text-align: center;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
		}
		.footer_si{
			border:1px solid rgba(19,190,111,1);
			color:rgba(19,190,111,1);
			margin-left: 20rpx;
		}
	}
</style>
