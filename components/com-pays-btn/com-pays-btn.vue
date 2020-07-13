<template>
	<view class="pays-footer">
		<view class="pays-button" v-if="btnName === '提交'" @tap="addinfo">
			{{btnName}}
		</view>
		<view class="pays-button" v-else-if="btnName === '我要反馈'" @tap="paybtn()">
			{{btnName}}
		</view>
		<view class="pays-button" @tap="paysbtnHandler" v-else>
			{{btnName}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			videoData: {
				default: () => [],
				type: Array
			},
		  btnName: {
		    type: String,
		    default: '确认支付'
		  },
		  pay_types: {
		    type: Number
		  },
		  ticket_type:{
			  type: Number
		  },
		  video_type: {
		    
		  },
		  menpiao:{
			  
		  },
		  paysInfoData:{},
		  time:{},
		  car_id:{},
		  seat_ids:{
		  },
		  datas:{
			  type: Object,
			  default: () => {}
		  },
		  tijiaotype:{
			 
		  },
		  ids:{
			 
		  },
		  goods:{}
		},
		data() {
			return {
				good_id:[],
				paystype:1,
				order_id:''
			};
		},
		methods: {
			selectpeopleHandler () {
				// this.headerTitle = {
				// 	backgroundColor:'#FFFFFF',
				// 	color:'',
				// 	title:'选择持票人',
				// 	right:''
				// }
				//this.isShowIicketHolder = true
				//获取常用联系人列表
					this.$api.addressinfo().then(res => {
					  if(res.code === 200){
						  console.log(res.data)
						  this.addressInfo = res.data;
						  
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
			pay(order_id,type){
				this.$api.pay({order_id:order_id,pay_type:type}).then(res => {
				  if(res.code === 200){
					  var orderInfo = res.data;
					  if(type==1){
						  uni.requestPayment({
						  provider: 'wxpay',
						  orderInfo: orderInfo, //订单数据
						  success: function(res) {
						  //处理业务逻辑
						  uni.navigateTo({
						  	url: `/pages/successful-order/successful-order?id=${order_id}`
						  })
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
						  uni.navigateTo({
						  	url: `/pages/successful-order/successful-order?id=${order_id}`
						  })
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
			addinfo () {
				console.log(this.datas.name)
					this.$api.addinfo(this.datas).then(res => {
						console.log(res)
					  if(res.code === 200){
							console.log(res)
							let pages = getCurrentPages(); // 当前页面
							console.log(this.tijiaotype)
							if(this.tijiaotype==2){
								uni.navigateTo({
									url: '/pages/page-contactsfrequent/page-contactsfrequent'
								})
							}else{
								uni.navigateBack(-2)
							}
							 // let beforePage = pages[pages.length - 2]; // 前一个页面
							 // console.log(beforePage)
							 // uni.navigateBack({
							 //     success: function() {
							 //         beforePage.onLoad(); // 执行前一个页面的onLoad方法
							 //     }
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
			paysbtnHandler () {
				if(this.video_type===1){
					let list = this.videoData;
					let goodsid = [];
					let pay_types = '';
					list.forEach(item=>{
						if(item.is_check===true){
							goodsid.push(item.good_id)
						}
					})
					if(this.pay_types===0){
						pay_types = 1;
						let goodsids = String(goodsid)
						console.log(goodsids)
						this.$api.orderconfim({good_id:goodsids,pay_type:pay_types,type:this.video_type}).then(res => {
						  if(res.code === 200){
							   this.order_id = res.data.order_id;
							   let id = res.data.order_id;
							   console.log(this.order_id,pay_types)
							   this.pay(this.order_id,pay_types)
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
					else if(this.pay_types===1){
						pay_types = 3;
						let goodsids = String(goodsid)
						this.$api.orderconfim({good_id:goodsids,pay_type:pay_types,type:this.video_type}).then(res => {
						  if(res.code === 200){	
							   this.order_id = res.data.order_id;
							   let id = res.data.order_id;
							   console.log(this.order_id,pay_types)
							   this.pay(this.order_id,pay_types)
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
					else if(this.pay_types===2){
						pay_types = 2;
						let goodsids = String(goodsid)
						this.$api.orderconfim({good_id:goodsids,pay_type:pay_types,type:this.video_type}).then(res => {
						  if(res.code === 200){	
							   this.order_id = res.data.order_id;
							   let id = res.data.order_id;
							   uni.navigateTo({
							   	url: `/components/uni-password/uni-password?pay_types=${pay_types}&id=${id}`
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
						
						//console.log("文化币支付")
					}
					//console.log(goodsid,pay_types,this.video_type)

				}else if(this.video_type==4){
						if(this.pay_types===0){
							this.paystype = 1;
							this.$api.orderconfim({good_id:this.ids,pay_type:this.paystype,type:this.video_type,time:this.time,car_id:this.car_id,seat_ids:this.seat_ids,goods:this.goods}).then(res => {
							  if(res.code === 200){	
								   this.order_id = res.data.order_id;
								   let id = res.data.order_id;
								   this.pay(this.order_id,this.paystype)
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
						else if(this.pay_types===1){
							this.paystype = 3;
							this.$api.orderconfim({good_id:this.ids,pay_type:this.paystype,type:this.video_type,time:this.time,car_id:this.car_id,seat_ids:this.seat_ids,goods:this.goods}).then(res => {
							  if(res.code === 200){	
								   this.order_id = res.data.order_id;
								   let id = res.data.order_id;
								   this.pay(this.order_id,this.paystype)
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
						  

				}else if(this.video_type==2){
					if(this.pay_types===0){
						this.paystype = 1;
						this.$api.orderconfim({good_id:this.ids,pay_type:this.paystype,type:this.video_type,time:this.time,goods:this.goods}).then(res => {
						  if(res.code === 200){	
							   this.order_id = res.data.order_id;
							   let id = res.data.order_id;
							   this.pay(this.order_id,this.paystype)
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
					else if(this.pay_types===1){
						this.paystype = 3;
						this.$api.orderconfim({good_id:this.ids,pay_type:this.paystype,type:this.video_type,time:this.time,goods:this.goods}).then(res => {
						  if(res.code === 200){	
							   this.order_id = res.data.order_id;
							   let id = res.data.order_id;
							   this.pay(this.order_id,this.paystype)
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
				
				
			},
			// 我要反馈
			paybtn(){
				uni.navigateTo({
					url: '/pages/pages-saleafter/pages-myhelp'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pays-footer{
		width: 100%;
		height: 142rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		.pays-button{
			width:670rpx;
			height:80rpx;
			line-height: 80rpx;
			text-align: center;
			background:rgba(19,190,111,1);
			border-radius:40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
</style>
