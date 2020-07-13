<template>
	<view class="com-header-double">
		<view class="left">
			zxfasdas
		</view>
		<view class="center">
			asdasdas
		</view>
		<view class="right">
			asdas
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.com-header-double{
	position: fixed;
	width: 100%;
	// height: var(--status-bar-height);
	height: 88rpx;
	left: 0;
	top: 0;
	background-color: #fff;
}
.com-header-double{
	display: flex;
	justify-content: space-around;
	align-items: center;
	.right{
		width: 30rpx;
		height: 10rpx;
	}
	.center{
		width: 100rpx;
	}
}
</style>
