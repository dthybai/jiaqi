<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text=""  fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="确认购买"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="linear-gradient-color">
			<view class="pays-tickets-body">
				<com-tickets-order :ticketsData="ticketsData" :menpiao="menpiao"></com-tickets-order>
			</view>
			<view class="pays-body-info">
				<com-pays-info :paysInfoData="paysInfoData" :car_name="car_name" :seat_name="seat_name" :ticketsData="ticketsData" :menpiao="menpiao" :video_type="video_type"></com-pays-info>
			</view>
			<view class="pays-body-type">
				<view  class="video-checked-pays">
					<com-pays-checked :paysData="paysData"  @pay_type="pay_type"></com-pays-checked>
					<view class="video-checked-money">
						<view class="total-title">总计金额</view>
						<view class="total-count">¥{{total_price}}</view>
					</view>
				</view>
			</view>
			<com-pays-btn :ids="ids" :menpiao="menpiao" :pay_types="pay_types" :goods="goods"  :video_type="video_type" :paysInfoData="paysInfoData" :time="time" :car_id="car_id" :seat_ids="seat_ids"></com-pays-btn>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comPaysChecked from "@/components/com-pays-checked/com-pays-checked.vue"
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	import comTicketOrder from "@/components/com-tickets-order/com-tickets-order.vue"
	import comPaysInfo from "@/components/com-pays-info/com-pays-info.vue"
	export default {
		data() {
			return {
				paysInfoData:[
				
				],
				ticketsData: [
					
				],
				ids:'',
				typeid:'',
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
				lianpiao:[],
				menpiao:[],
				pay_types:0,
				video_type:2,
				time:'',
				car_id:'',
				seat_ids:'',
				goods:[],
				total_price:'',
				seat_name:'',
				car_name:''
				};
		},
		components: {
			uniNavBar,
			comPaysChecked,
			comPaysBtn,
			comTicketOrder,
			comPaysInfo
		},
		onLoad() {
			 this.getticketdetail()
		},
		methods: {
			//确认门票
		getticketdetail(){
			let data = uni.getStorageSync("data");
			this.seat_name = data.goods[0].seat_name;
			this.car_id = data.goods[0].car_id;
			this.car_name = data.car_name;
			let seat_id = '';
			this.time = data.time;
			console.log(this.time)
			data.goods.forEach(items => {
				 seat_id += items.seat_id+ ","
			})
			let persons = []
			data.goods.forEach(item => {
				 persons.push({
					 spec_id:item.spec_id,
					 person_id:item.person_id
				 })
			})
			this.goods = persons;
			console.log(this.goods)
			 if (seat_id.length > 0) {
			        seat_id = seat_id.substr(0,seat_id.length - 1);
			    }
			this.seat_ids = seat_id;
			console.log(this.goods)
			this.$api.videoorderconfim({good_id:data.good_id,type:data.type,time:data.time,goods:data.goods}).then(res => {
			   console.log(res)
			  if(res.code === 200){
				  this.paysInfoData = res.data.person;
				  this.total_price = res.data.total_price;
				  this.ticketsData = res.data.good;
				  this.ids = res.data.good.id;
				  if(res.data.good.type==1){
					  this.video_type =2;
				  }else{
					  this.video_type =4;
				  }
				  //console.log( this.ticketsData)
			  }
			  else if(res.code === 100){
				  
				  uni.showToast({
				  	icon: "none",
				      title: "该商品库存量不足",
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
			pay_type(data){
			  this.pay_types = data;
			  console.log(data)
			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-2)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pays-tickets-body{
		box-sizing: border-box;
		padding: 30rpx 40rpx 0;
	}
	.pays-body-info{
		box-sizing: border-box;
		padding: 8rpx 40rpx 30rpx;
	}

	.pays-body-type{
		width: 100%;
		// margin-top: 30rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
		padding-bottom: 160rpx;
		.video-checked-pays{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx 0;
			background:rgba(255,255,255,1);
			border-radius:20px;
			.video-checked-money{
				border-top:1px solid rgba(238,238,238,1);
				height: 166rpx;
				line-height: 166rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.total-title{
					color: #333333;
					font-size: 28rpx;
					font-family:PingFang SC;
					font-weight:500;
				}
				.total-count{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(229,106,77,1);
				}
			}
		}
	}
	
</style>
