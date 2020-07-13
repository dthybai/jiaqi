<template>
	<view class="pays-info-body">
		<view class="pays-title" :class="{'pays-title-center':paysPeople.length == 0}">
			<view class="title" v-if="paysPeople.length>0">
				持票人
			</view>
			<view class="handler">
				<view class="handler-selectpeople mr50"@tap="selectTicketHandler" @selectSeatlist="selectSeatlist" v-if="ticketsIndex == 1&&is_has_car===true"><image src="../../static/img/icon/add-gree.png"></image>选择座位</view>
				<view class="handler-selectpeople"@tap="selectpeopleHandler"><image src="../../static/img/icon/add-gree.png"></image>选择持票人</view>
			</view>
			
		</view>
		<view class="pays-info-item" v-for="(item, index) of paysPeople" :key="index">
			<view>
				<view class="username">
					{{item.name}}
					<text v-if="item.age_type===1">成人票</text>
					<text v-if="item.age_type===2">老人票</text>
					<text v-if="item.age_type===3">儿童票</text>
					<text v-if="item.age_type===4">学生票</text>
				</view>
				<view class="identity">{{item.card}}</view>
			</view>
			<view class="handler" @tap="deleteHandler(index)">
			</view>
		</view>
		<view class="pays-seat" v-if="paysPeople.length>0 && ticketsIndex == 1&&is_has_car==true">
			已选{{car_name}}
			<text v-for="(item, index) of this.zuoweihao" :key="index">
				{{item}}<text v-if="index != paysPeople.length-1">,</text>
			</text>座
		</view>
		<comdelete :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import comdelete from "@/components/com-delete/com-delete.vue"
	export default {
		data() {
			return {
				payDialogVisible: false,
				typeindex: '',
				addressInfo:[]
			};
		},
		components: {
			comdelete
		},
		props: {
			paysPeople: {
				type: Array,
				default: () => []
			},
			is_has_car:{
				
			},
			ticketsIndex: {
				type: Number,
				default: 0
			},
			zuoweihao:{
				
			},
			car_name:{
				
			}
		},
		methods:{
			selectpeopleHandler () {
				this.$emit('selectpeopleHandler')	
			},
			selectTicketHandler(){
				this.$emit('selectTicketHandler')
			},
			deleteHandler(index){
				this.typeindex = index
				this.payDialogVisible = true
				
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
				this.$emit('deleteHandler',this.typeindex)
				this.payDialogVisible = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pays-info-body{
		width:100%;
		background:rgba(255,255,255,1);
		border-radius:20px;
		.pays-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 110rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			.title{
				line-height: 110rpx;
				border-bottom:1rpx solid rgba(0,0,0,0.05);
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				
			}
			
		}
		.pays-title-center{
			justify-content: center;
		}
		.handler{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.handler-selectpeople{
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 110rpx;
				background-color: #fff;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				border-radius:20rpx;
				color:rgba(19,190,111,1);
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 15rpx;
				}
			}
			.mr50{
				margin-right: 50rpx;
			}
		}
		
	}
	.pays-info-item{
		width: 100%;
		box-sizing: border-box;
		padding: 40rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.username{
			display: flex;
			align-items: center;
			color: #333333;
			font-size: 28rpx;
			font-family:PingFang SC;
			line-height: 28rpx;
			padding-bottom: 20rpx;
			text{
				margin-left: 7rpx;
				display: inline-block;
				line-height:20rpx;
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,187,2,1);
				background:rgba(255,187,2,0.1);
				padding: 5rpx;
				margin-left: 7rpx;
			}
		}
		.identity{
			font-size:24rpx;
			line-height: 24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.handler{
			width: 30rpx;
			height: 30rpx;
			background: url(../../static/img/icon/delete1.png);
			background-size: contain;
		}
	}
	.pays-seat{
		line-height: 110rpx;
		height: 110rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
</style>
