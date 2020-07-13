<template>
	<view>
			<uni-nav-bar left-icon="back" left-text=""  fixed :right-text="headerTitle.right" :backgroundColor="headerTitle.backgroundColor" :border="false" :color="headerTitle.color" title="门票详情" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="pays-body-video">
			<headerv :pagetext='pagetext' :buy_type="buy_type"></headerv>
			<view class="video-checked">
				<view class="video-checked-form">
					<!-- menpiao xiangqing -->
					<com-tickets-order :ticketsData="ticketsData"></com-tickets-order>
				</view>
			</view>
			<view class="video-checked video-color">
				<view class="video-checked-form" style="padding-bottom: 20rpx;margin-bottom: 50rpx;">
					<com-pays-info :paysInfoData="paysInfoData" :cars="cars" :title='title'></com-pays-info>
				</view>
			</view>
			<view class="video-checked video-color">
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
		<view class="footer" v-if="age_video!=5 && age_video!=4">
			<view class="footer_color" v-if="age_video==1" @tap="delorders">
				取消订单
			</view>
			<view class="footer_color footer_si" v-if="age_video==1" @tap="pays">
				立即支付
			</view>
			<view class="footer_color footer_si" v-if="age_video==-1" @tap="buyHandler(ticket_id)">
				再次购买
			</view>
			<!-- <view class="footer_color footer_si" v-if="age_video==4" >
				待使用111
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
	import comTicketsOrder from "@/components/com-tickets-order/com-tickets-order.vue"
	import comPaysInfo from "@/components/com-pays-info/com-pays-info.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	export default {
		components: {
			headerv,
			itemline,
			uniNavBar,
			footerv,
			comTicketsOrder,
			comPaysInfo,
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
				titles:'您确定要取消删除吗？',
				payDialogVisible: false,
				pay_type:'',
				title:'购票信息',
				fnlist:{
					username:'',
					typeName: '',
					identity:'',
					money:'',
					isShow:'',
					isType:''
				},
				paysInfoData:[],
				ticketsData: [],
				headerTitle:{
					backgroundColor:'#13BE6F',
					color:'#FFFFFF'
				},
				rage_key:'',
				age_video:5,
				good_id:'',
				goods:[],
				ids:'',
				ticket_id:'',
				buy_type:'',
				cars:''
			};
		},
		onLoad(opction) {
			this.orderdetail(opction.id)
			this.ids = opction.id;
			console.log(this.ids)
		},
		methods: {
			//获取订单详情
			orderdetail (id) {
				console.log(id)
				this.$api.orderdetail({order_id:id}).then(res => {
					 console.log(res)
				  if(res.code === 200){	
					   this.ticketsData = res.data;
					   this.goods = res.data.goods;
					   this.pagetext.unpaid = res.data.status;
					   this.pagetext.data = res.data.residue_time;
					   this.age_video = res.data.status;
					   this.good_id = res.data.id;
					   this.buy_type = res.data.buy_type;
					   this.paysInfoData = res.data.person;
					   this.pay_type = res.data.pay_type;
					   this.fnlist.username = res.data.total_price;
					   this.fnlist.typeName = res.data.pay_type;
					   this.fnlist.money = res.data.order_no;
					   this.fnlist.identity = res.data.create_at;
					   this.ticket_id = res.data.goods.cate_id;
					   this.cars = res.data.cars;
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
			delorders(){
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
					  // uni.navigateTo({
					  // 	url: 'pages/order/order'
					  // });
					  // this.videolist.splice(this.typeindex,1)
					 
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
			//拉起支付
			pays(){
				console.log(this.good_id,this.pay_type)
				this.$api.pay({order_id:this.good_id,pay_type:this.pay_type}).then(res => {
				  if(res.code === 200){
					  var orderInfo = res.data;
					  if(this.pay_type==1){
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
					  }else if(this.pay_type==3){
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
					  }else if(this.type==2){
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
			clickLeft () {
				// uni.switchTab({
				// 	url: '/pages/order/order'
				// });
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.switchTab({
				    url: '/pages/order/order'
				});
				// #endif 
			},
			// gomessage(ticket_id){
			// 	let id = ticket_id
			// 	uni.navigateTo({
			// 		url: `/pages/pays-place-order/pays-place-order?id=${id}`
			// 	})
			// 	console.log(ticket_id)
			// },
			buyHandler (ticket_id) {
				let id = this.ticket_id;
				uni.navigateTo({
					url: `/pages/pays-place-order/pays-place-order?id=${id}`
				})
			},
			// lookHandler (ticket_id) {
			// 	let id = this.ticket_id;
			// 	uni.navigateTo({
			// 		url: `/pages/pays-place-order/pays-place-order?id=${id}`
			// 	})
			// }
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
	.video-color{
		background-color: #fff;
	}
</style>
