<template>
	<view class="page-gray" style="padding-bottom: 132rpx;">
		<uni-nav-bar left-icon="" left-text=""  fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="确认购买"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="pays-body-video">
			<view class="video-checked">
				<view class="title">
					选择视频
				</view>
				<view class="video-checked-form" >
					<com-video-checked :videoData="videoData"  @totalprice="totalprice" @totalprices="totalprices"></com-video-checked>
				</view>
				
			</view>
		</view>
		<view class="pays-body-type">
			<view  class="video-checked-pays">
				<com-pays-checked :paysData="paysData" @pay_type="pay_type"></com-pays-checked>
				<view class="video-checked-money" v-if="pay_types==0 ||pay_types==1">
					<view class="total-title">总计金额</view>
					<view class="total-count">￥{{total}}</view>
				</view>
				<view class="video-checked-money" v-if="pay_types==2">
					<view class="total-title">总计云币</view>
					<view class="total-count">{{other}}个</view>
				</view>
			</view>
		</view>
		<com-pays-btn :videoData="videoData" :paysData="paysData" :pay_types="pay_types" :video_type="video_type"></com-pays-btn>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideoChecked from "@/components/com-video-checked/com-video-checked.vue"
	import comPaysChecked from "@/components/com-pays-checked/com-pays-checked.vue"
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	export default {
		data() {
			return {
				video_ids:'',
				type:1,
				total:'',
				other:'',
				videoData: [],
				videomsg:[],
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
					},
					{
						title:'文化币',
						url: '/static/img/wenhuab.png',
						isChecked: true,
						state:false
					}
				],
				pay_types:0,
				video_type:1
			};
		},
		
		components: {
			uniNavBar,
			comVideoChecked,
			comPaysChecked,
			comPaysBtn
		},
		onLoad (opction)  {
			this.video_ids = opction.id;
			this.videoorderconfim();
		},
		methods: {
			totalprice(total){
				console.log(total)
				this.total = total;				
			},
			totalprices(other){
				console.log(other)
				this.other = other;				
			},
			      pay_type(data){
					  this.pay_types = data;
			        console.log(data)
			      },
			//确认订单
			videoorderconfim() {
				//console.log(this.type,this.video_ids)
				this.$api.videoorderconfim({type:this.type,good_id:this.video_ids}).then(res => {
				  if(res.code === 200){	
					  console.log(res)
					 this.videoData = res.data.data;
					 this.videomsg = res.data;
					 this.total = res.data.total_price;
					 this.other = res.data.other;
					 
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
		}
	}
</script>

<style lang="scss" scoped>
	.pays-body-video{
		width: 100%;
		min-height: 600rpx;
		box-sizing: border-box;
		padding: 40rpx 40rpx 0;
		background:linear-gradient(180deg,rgba(19,190,111,1) 0%,rgba(19,190,111,0) 600rpx);
		.video-checked{
			width: 100%;
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
	.pays-body-type{
		width: 100%;
		margin-top: 30rpx;
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
