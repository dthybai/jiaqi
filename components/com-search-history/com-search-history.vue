<template>
	<view>
		<view class="search-body" v-for="(item, index) of serachHistoryData" :key="index">
			<view class="search-title">
				{{item.title}}
			</view>
			<view class="search-item-wrapper">
				<view class="search-item" :class="isWhite ? 'white' : '' " v-for="(subItem, subIndex) of serachHistoryDatas" :key="subIndex+index" @tap="searchItemHandler(subItem)">
					{{subItem}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			serachHistoryData: {
				type: Array,
				default: () => []
			},
			serachHistoryDatas: {
				type: Array,
				default: () => []
			},
			isWhite: {
				type: Number,
				default: 0
			}
		},
		methods: {
			searchItemHandler(item){
				this.$emit('searchItemHandler', item)
			}
		}
	}
</script>
<style>
	page{
		background-color: rgba(255, 255, 255, 1);
	}
</style>
<style scoped lang="scss">
.search-body{
	padding-top: 40rpx;
	padding-bottom: 40rpx;
	.search-title{
		color: #333333;
		font-weight: bold;
		line-height: 30rpx;
		font-size:30rpx;
		padding-bottom: 15rpx;
	}
	.search-item-wrapper{
		margin-left: -10rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.search-item{
			margin-top: 30rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			color: #333333;
			font-size: 26rpx;
			padding: 21rpx 36rpx;
			background:rgba(249,249,249,1);
			border-radius:34rpx;
		}
		.search-item.white{
			background: #FFFFFF;
		}
		
	}
}
</style>
