<template>
	<view class="checkStateWarp"> 
		<view :style="{width:width,height:height}" :class="clickstatedata?'page-wrapper-back page-wrapper':'page-wrapper-border page-wrapper'"@tap="clickstateFn">
			<icon type="success_no_circle" size="12" color="#ffffff"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clickstatedata:false
			}
		},
		props: {  
			clickstate:{
				default: () => false,
				type:Boolean
			},
			width:{
				default: () => "34rpx",
				type:String
			},
			height:{
				default: () => "34rpx",
				type:String
			}
		},  
		watch:{
			clickstate(){
				this.clickstatedata=this.clickstate  
				console.log(this.clickstate)
			}
		},
		methods: {
			 clickstateFn(){
				 this.clickstatedata=!this.clickstatedata
				 this.$emit("click",this.clickstatedata)
			 }
		},
		mounted(){ 
			this.clickstatedata=this.clickstate
		}
	}
</script>
<style scoped lang="scss">
	.checkStateWarp{
		// padding-right: 30rpx;
	}
	.page-wrapper{
		width: 34rpx;
		height: 34rpx;
		line-height: 34rpx;
		border-radius:8rpx;
		position: relative;
		text-align: center;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.page-wrapper-border{
		border:1rpx solid rgba(210,210,210,1);
	}
	.page-wrapper-back{
		background:rgba(19,190,111,1);
		border:1rpx solid rgba(19,190,111,1);
	}
</style>
