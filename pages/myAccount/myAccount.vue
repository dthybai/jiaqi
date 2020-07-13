<template>
	<view class="box accountWarp">
		<uni-nav-bar backgroundColor="#13BE6F" color="#ffffff" left-icon="" left-text="" fixed right-text="明细" :title="title"@clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="headerWarp">
			<view class="myHeaderBtNum">
				<text>{{culture_coin||0}}</text>个
			</view>
			<view class="myHeaderText">
				我的文化币
			</view>
		</view>
		<view class="mainWarp">
			<view class="titleMain">
				充值
			</view>
			<view class="mainBoxNum">
				<view v-for="(item, index) of datalist" :key="index" :class="stateindex == index ? 'mainBoxNum_item mainBoxNum_item_set':'mainBoxNum_item'"@tap="mainBoxNumItemFn(item,index)">
					<text>{{item.title}}</text>
					<text>￥{{item.price}}</text>
					<text>买{{item.num}}送{{item.give_num}}</text>
				</view>
			</view>
			<button type="default" @tap="immediatelyHandler()">立即充值</button>
			<view class="chongzhiTextInfo">
				<view class="titleMain">
					充值说明
				</view>
				<view class="textingoItem" v-html="shop_money_tip">        
				</view>
			</view>
		</view>
		<view class="pay-dialog-wrapper" v-show="payDialogVisible" @tap="dialog">
			<view class="dialog-wrapper">
				<view class="title">选择支付方式</view>
				<com-pays-checked :paysData="paysData" @pay_type='pay_type'></com-pays-checked>
				<view class="pay-submit" @tap="paySubmit">
					立即支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comPaysChecked from "@/components/com-pays-checked/com-pays-checked.vue"
	export default {
		data() {
			return {
				userDefined:0,
				payDialogVisible: false,
				stateindex:0,
				adminState:false,
				allSetCheck:false,
				title: '常用联系人',
				culture_coin:0,
				shop_money_tip:'',
				datalist:[
					
				],
				paysData: [
					{
						title:'微信',
						url: '/static/img/weixin.png',
						isChecked: true,
						state:true
					},
					{
						title:'支付宝',
						url: '/static/img/zhifubao.png',
						isChecked: true,
						state:false
					}
				],
				good_id:'',
				pay_types:1,
				order_id:''
			};
		},
		components: {
			uniNavBar,
			comPaysChecked
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getaccountinfo();	
		},
		onShow() {
			this.getaccountinfo();
		},
		onLoad() {
			this.getaccountinfo();
			// this.good_id = this.datalist[0].id;
		},
		methods:{
			//获取我的账户
			getaccountinfo () {
				this.$api.accountinfo().then(res => {
				  if(res.code === 200){	
					  console.log(res)
						  this.culture_coin = res.data.culture_coin;
						  this.datalist = res.data.culture_list;
						  this.good_id = res.data.culture_list[0].id;
						  this.shop_money_tip = res.data.shop_money_tip;
						  uni.hideNavigationBarLoading();
						  uni.stopPullDownRefresh();//得到数据后停止下拉刷新
				  }
				  else{
					  uni.hideNavigationBarLoading();
					  uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					uni.showToast({
						icon: "none",
					    title: res.msg,
					    duration: 2000
					});  
				  }
				}).catch(res => {
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					uni.showToast({
						icon: "none",
					    title: "暂无套餐信息",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
			},
			pay_type(data){
			 if(data==0){
				 this.pay_types = 1;
			 }else{
				  this.pay_types = 3;
			 }
			},
			dialog(){
				this.payDialogVisible = false
			},
			mainBoxNumItemFn(item,index){
				
				this.good_id = item.id;
				this.stateindex=index
				console.log(this.good_id,this.stateindex)
			},  
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
			clickRight(){
				uni.navigateTo({
					url: '/pages/myAccount-detail/myAccount-detail'
				})
				// this.adminState=!this.adminState;
				
			},
			// 立即充值
			immediatelyHandler() {
				this.payDialogVisible = true
			},
			//拉起微信支付
			
			//拉起支付宝支付
			
			//支付
			pay(type,order_id){
				console.log(order_id,type)
				this.$api.pay({order_id:order_id,pay_type:type}).then(res => {
				  if(res.code === 200){
					  var orderInfo = res.data;
					  if(type==1){
						  uni.requestPayment({
						  provider: 'wxpay',
						  orderInfo: orderInfo, //订单数据
						  success: function(res) {
						  //处理业务逻辑
						  console.log(res)
						  this.getaccountinfo();
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
					  }
					 // this.pay();
					 //  this.getaccountinfo();
						uni.showToast({
							icon: "none",
						    title: '充值成功',
						    duration: 2000
						});  
						
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
			paySubmit() {
				this.$api.orderinfo({good_id:this.good_id,pay_type:this.pay_types,type:3}).then(res => {
				  if(res.code === 200){
					  console.log(res.data)
					  this.order_id = res.data.order_id;
					  this.pay(this.pay_types,this.order_id);
					   this.getaccountinfo();
						// uni.showToast({
						// 	icon: "none",
						//     title: '充值成功',
						//     duration: 2000
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
				this.payDialogVisible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-dialog-wrapper{
		height: 100%;
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto auto;
		background-color: rgba(0,0,0,0.5);
		transition: 0.45s;
	}
	.dialog-wrapper{
		width: 600rpx;
		height: 600rpx;
		background:rgba(255,255,255,1);
		padding: 80rpx 50rpx 0;
		box-sizing: border-box;
		border-radius:20rpx;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto auto;
		.title{
			font-size:32rpx;
			line-height: 32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			text-align: center;
			padding-bottom: 40rpx;
		}
		.pay-submit{
			width:500rpx;
			height:80rpx;
			background:rgba(19,190,111,1);
			border-radius:40rpx;
			margin: 30rpx auto 0;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height: 80rpx;
			text-align: center;
		}
	}
.titleMain{ 
	font-size:32rpx; 
	font-weight:bold;
	color:rgba(51,51,51,1);
	padding: 0 0 40rpx 0;
}
.accountWarp{
	.headerWarp{
		height: 264rpx;
		text-align: center;
		color: #ffffff;
		font-size: 28rpx;
		background:rgba(19,190,111,1);
		.myHeaderBtNum{
			padding: 80rpx 0 0rpx 0;
			text{
				font-size: 60rpx;
				vertical:bottom;
			}
		}
		
	}
	.mainWarp{
		background:rgba(255,255,255,1);
		border-radius:40rpx 40rpx 0px 0px;
		margin-top: -30rpx; 
		padding: 80rpx 42rpx;
		box-sizing: border-box;
		.mainBoxNum{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.mainBoxNum_item{
				width:206rpx;
				height:176rpx;
				border:2rpx solid rgba(248,248,248,1);
				background:rgba(248,248,248,1);
				border-radius:10rpx;
				// box-sizing: border-box;
				transition: 0.2s;
				margin-bottom: 20rpx;
				text-align: center;
				text{
					display: block;
				}
				text:nth-child(1){
					font-size:32rpx; 
					font-weight:bold;
					color:rgba(51,51,51,1);
					padding: 16rpx 0 1rpx 0;
				}
				text:nth-child(2){ 
					font-size:32rpx; 
					font-weight:bold;
					color:rgba(51,51,51,1);
					padding: 14rpx 0 2rpx 0;
				}
				text:nth-child(3){
					font-size:24rpx; 
					font-weight:500;
					color:rgba(153,153,153,1);
				}
			}
			// .mainBoxNum_item:hover{
			// 	width:206rpx;
			// 	height:176rpx;
			// 	border:2rpx solid rgba(19,190,111,1);
			// 	background:rgba(19,190,111,0.05);
			// 	text:nth-child(1){ 
			// 		color:#13BE6F; 
			// 	}
			// 	text:nth-child(2){ 
			// 		color:rgba(19,190,111,1);
			// 	}
			// }
			.mainBoxNum_item_set{
				width:206rpx;
				height:176rpx;
				border:2rpx solid rgba(19,190,111,1);
				background:rgba(19,190,111,0.05);
				text:nth-child(2){ 
					color:#13BE6F; 
				}
				text:nth-child(3){ 
					color:rgba(19,190,111,1);
				}
			}
		}
		button{
			margin-top: 60rpx;
			margin-bottom: 100rpx;
			width:100%;
			height:88rpx;
			line-height: 88rpx;
			background:rgba(19,190,111,1);
			border-radius:44rpx;
			font-size:28rpx; 
			font-weight:500;
			color:rgba(255,255,255,1);
		}
		.chongzhiTextInfo{
			padding-top: 36rpx 0;
			.textingoItem{
				font-size:26rpx; 
				font-weight:500;
				color:rgba(102,102,102,1);

			}
		}
	}
}
	
</style>

