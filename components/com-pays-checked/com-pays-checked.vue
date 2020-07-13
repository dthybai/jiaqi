<template>
	<view>
		<view class="com-pay-checked">
			<view class="checked-type" v-for="(item, index) of paysData" :key="index">
				<view class="checked-name">
					<image :src="item.url"></image>
					{{item.title}}
				</view>
				<!-- <view :class="item.isChecked ? 'checked' : 'nochecked'"></view> -->
				<view class="inputCheckWarp"@tap="inputCheckWarpClick(item, index)" v-if="item.isChecked">
					<inputCheck :clickstate="item.state"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import inputCheck from "@/components/input-check/input-check.vue"
	export default {
		data() {
			return {
				
			};
		},
		props: {
			paysData: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			inputCheckWarpClick(item,index){ 
				this.paysData.map((item,indexs)=>{
					if(indexs===index){
						this.paysData[indexs].state=true
						
					}else{
						this.paysData[indexs].state=false
					}
					
				})
				this.$emit('pay_type',index);
			}
		},
		components:{
			inputCheck
		}
	}
</script>

<style lang="scss" scoped>
	.com-pay-checked{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 30rpx 0;
		.checked-type{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.checked-name{
				display: flex;
				align-items: center;
				padding: 32rpx 0;
				image{
					display: inline-block;
					width:34rpx;
					height:34rpx;
					border-radius: 5rpx;
					margin-right: 20rpx;
				}
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
		}
		.checked{
			width:34rpx;
			height:34rpx;
			background:rgba(19,190,111,1);
			border-radius:8rpx;
			margin-right: 20rpx;
		}
		.nochecked{
			width:34rpx;
			height:34rpx;
			background:rgba(249,249,249,1);
			border-radius:8rpx;
			margin-right: 20rpx;
			box-sizing: border-box;
			border: 1rpx solid rgba(19,190,111,1);
		}
	}
</style>
