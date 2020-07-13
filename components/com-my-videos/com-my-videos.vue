<template>
	<view class="box">
		<view class="header">
			<view class="header_tab">
				<view class="tab"
					:class="index === tabClick ? 'click' : ''"
					v-for="(item, index) in tabTitle"
					:key="index"
					@click="longClick(index)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabTitle: {
				type: Array,
				default: () => []
			},
			// rightIcon: {
			// 	type: String,
			// 	default: ""
			// },
			// fixed: {
			// 	type: [Boolean, String],
			// 	default: false
			// }
		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
			};
		},
		methods:{
			longClick(index){
				this.tabClick = index;
				this.$emit('tabindex',index)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		.header_tab{
			width:460rpx;
			height:72rpx;
			border:1rpx solid rgba(19,190,111,1);
			border-radius:36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			.tab{
				width:230rpx;
				height:74rpx;
				line-height: 73rpx;
				border-radius:36rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(19,190,111,1);
			}
			.click{
				background:rgba(19,190,111,1);
				color:rgba(255,255,255,1);
			}
		}
	}

</style>
