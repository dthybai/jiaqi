<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text="" fixed right-text=""  :border="false"  title="选择座位"@clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
			<image slot="right" src="../../static/img/duihaolv.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="select-seat-body">
			<view class="video-nav">
				<view class="nav-item " v-for="(item, index) of seatDatalist" :key="index"  :class=" index === navIndex ? 'active' : ''" @tap="navHandler(index,item.id,item.name)">
					{{item.name}}
				</view>
			</view>
			<com-select-seat :seatData="seatData" :paypeoplelength="this.paypeoplelength"></com-select-seat>
		</view>
		<view class="select-reminder-body">
			<com-reminder :seatcontent="this.seatcontent"></com-reminder>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	 import comSelectSeat from "@/components/com-select-seat/com-select-seat"
	 import comReminder from "@/components/com-Reminder/com-Reminder.vue"
	export default {
		data() {
			return {
				navIndex: 0,
				commentTextFrom:{
					isShow:false,
					text:"",
					focus:false
				},				
			};
		},
		props: {
			seatData:{
				type:Array,
				default: () => []
			},
			car_id:{
				
			},
			car_name:{
				
			},
			seatDatalist: {
				type: Array,
				default: () => []
			},
			seatcontent:{
				type:String
			},
			lianpiao_id:{
			
			},
			paypeoplelength:{
				type:Number
			},
			data:{},
		},
		components: {
			uniNavBar,
			comSelectSeat,
			comReminder
		},
		methods: {
			// 返回事件
			clickLeft () {
				this.$emit('selectSeatClick')
			},
			clickRight(){
				let list = this.seatData;
				let goodsid = [];
				let goodsname = [];
				//console.log(list)
				list.forEach(item=>{
					item.forEach(items=>{
						if(items.is_check===true){
							goodsid.push(items.id)
							goodsname.push(items.name)
						}
					})
				})
				//console.log(goodsid,goodsname)
				//console.log(this.paypeoplelength)
				if(this.paypeoplelength==goodsid.length){
					//console.log(goodsid,goodsname,this.car_id)
					  this.$emit('selectSeatClick',goodsid,goodsname,this.car_id,this.car_name)
				}else{
					this.$emit('selectSeatClick')
					uni.showModal({
					    title: '提示',
					    content: '请选择与持票人数量相同的座位',
						showCancel:false,
						confirmText:'确认'
					});
				}
				
			},
			//获取座位列表
			selectSeatlist(id){
				this.$api.carsdetail({good_id:this.lianpiao_id,car_id:this.car_id,time:this.data}).then(res => {
				  if(res.code === 200){
						var result = [];
						for (var i = 0; i <res.data.length; i++) {
						      res.data[i].is_check =  false;                 
						}
						for(var i=0;i<res.data.length;i+=4){
						    result.push(res.data.slice(i,i+4));
						}
						this.seatData = result;
						console.log(this.seatData)
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
			navHandler(index,id,name){
				this.car_name = name;
				this.car_id = id;
				if (this.navIndex === index) return false
				this.navIndex = index
				this.navIndex === 0?this.commentTextFrom.isShow = false:'',
				this.selectSeatlist(id);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-seat-body{
		box-sizing: border-box;
		padding: 40rpx 40rpx 0;
	}
	.select-reminder-body{
		box-sizing: border-box;
		padding: 30rpx 40rpx 0;
	}
	.video-nav{
		width: 100%;
		height: 106rpx;
		border-bottom: 1rpx solid rgba(249,249,249,1);
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #FFFFFF;
		border-radius: 20px;
		margin-bottom: 20px;
		.nav-item{
			line-height: 106rpx;
			text-align: center;
			position: relative;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.nav-item.active:after{
			content: '';
			width:48rpx;
			height:6rpx;
			background:rgba(19,190,111,1);
			position: absolute;
			bottom: 0;
			left: 50%;
			margin-left: -24rpx;
		}
		.com-select-seat{
			position: relative;
			width:100%;
			background:rgba(255,255,255,1);
			border-radius:30rpx;
			padding: 50rpx;
			box-sizing: border-box;
			.select-seat-position{
				position: absolute;
				left: 50%;
				width: 1rpx;
				top: 50%;
				transform: translateX(-50%);
				transform: translateY(-50%);
				word-wrap: word-wrap;
				display: flex;
				border: 2rpx dotted rgba(238,238,238,1);
				justify-content: center;
				align-items: center;
				height: 80%;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.com-select-seat-item{
				position: relative;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 54rpx 0;
				.seat-item-checked{
					box-sizing: border-box;
					text-align: center;
					line-height: 46rpx;
					font-size:20rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(255,255,255,1);
					width: 66rpx;
					height: 66rpx;
					background: url(../../static/img/icon/seat-checked.png) no-repeat center center;
					background-size: contain;
				}
				.seat-item{
					box-sizing: border-box;
					width: 66rpx;
					height: 66rpx;
					line-height: 46rpx;
					font-size:20rpx;
					text-align: center;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(153,153,153,1);
					background: url(../../static/img/icon/seat.png) no-repeat center center;
					background-size: contain;
				}
			}
		}
	}
</style>
