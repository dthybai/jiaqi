<template>
	<view>
		<!-- 轮播 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper" :style="bannerStyle">
				<view class="page-section-spacing" :style="bannerStyle">
					<swiper class="swiper" :autoplay="autoplay" circular :indicator-dots="true" :interval="interval" :duration="duration" :style="bannerStyle">
						<swiper-item v-for="(itemBanner, indexBanner) of banner" :key="indexBanner+10" :style="bannerStyle">
							<image class="swiper-item-image" :src="itemBanner.img_url" @tap="videogo(itemBanner.good_id)" mode="" :style="bannerStyle"></image>
						</swiper-item>
						
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'com-swiper',
		props:{
			// 自动切换
			autoplay:{
				default: true,
				type: Boolean
			},
			// 自动切换时间
			interval: {
				default: 4000,
				type: Number
			},
			// 滑动动画时长
			duration: {
				default: 500,
				type: Number
			},
			// 导航数组
			banner: {
				default: () => [1, 2],
				type: Array
			},
			// 导航样式
			bannerStyle: {
				default: () => {},
				type: Object
			}
		},
		data() {
			return {
			};
		},
		mounted () {
			console.log(this.bannerStyle)
		},
		methods: {
			videogo(id){
				this.$emit('videogo',id)
			}
		}
	}
</script>

<style>
	
</style>
