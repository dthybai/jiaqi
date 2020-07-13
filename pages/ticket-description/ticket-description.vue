<template>
	<view class="ticket-description">
		<view>
			<uni-nav-bar left-icon="" left-text="" fixed right-text="" backgroundColor="rgba(19, 190, 111, 0.8)"@clickLeft="clickLeft">
			</uni-nav-bar>
			<!-- <liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" @tabClick="tabClick" /> -->
			<view class="description-wrapper">
				<view class="description-item" :class="{'active' : defaultIndex === index}" v-for="(item, index) of tabs"  :key="index"@tap="tabClick(index)">
					{{item}}
				</view>
			</view>
			<!-- 轮播 -->
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" @change="swiperTab" :current="currentTab">
							<swiper-item v-for="(itemBanner, indexBanner) of nav" :key="indexBanner">
								<view class="page-section-item">
									<view class="title">
										{{itemBanner.title}}
									</view>
									<view class="content" v-if="indexBanner === 0" v-html="ticketsData[0].buy_ticket_tip">
									</view>
									<view class="content" v-if="indexBanner === 1" v-html="ticketsData[0].refund_ticket_tip">
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="description-close"@tap="descriptionClose"></view>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				isTrue:true,
				currentTab:0,
				tabs:[
					'购票须知',
					'退票说明'
				],
				nav:[
					{
						title:'持票人购票须知',
						content:'持票人购票须知持票人购票须知持票人购票须知持票人购票须知持票人购票须知持票人购票须知'
					},
					{
						title:'门票退票说明',
						content:'门票退票说明门票退票说明门票退票说明门票退票说明门票退票说明门票退票说明'
					}
				],
				defaultIndex:0
			};
		},
		props: {
			ticketsData: {
				type: Array,
				default: () => []
			}
		},
		components: {
			liuyunoTabs,
			uniNavBar
		},
		methods: {
			tabClick(index){
				this.currentTab = index
				this.defaultIndex = index
				this.$emit('changeTitle',index)
			},
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.defaultIndex = index
				this.currentTab = index
				this.changeTitle(index)
			},
			descriptionClose (){
				this.$emit('descriptionClose')
			},
			changeTitle(index){
				this.$emit('changeTitle',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.description-wrapper{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		.description-item{
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,0.7);
		}
		.description-item.active{
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
	}
	.ticket-description{
		width: 100vw;
		height: 100vh;
		background-color: rgb(19, 190, 111);
		opacity: 0.8;
	}
	.description-close{
		width: 68rpx;
		height: 68rpx;
		text-align: center;
		line-height: 68rpx;
		margin: 50rpx auto 0;
		background-color: #fff;
		border-radius: 50%;
		background: url(../../static/img/close.png) no-repeat center center;
		background-size: contain;
		text{
			color: #33AD74;
		}
	}
	
	
</style>
<style lang="scss">
	.uni-padding-wrap{
		width: 650rpx;
		// height: 40rpx;
		padding-bottom: 85rpx;
		background-color: #fff;
		margin: 0 auto;
		border-radius:30rpx;
		.page-section{
			width: 650rpx;
			margin: 0 auto;
		}
		.uni-swiper-slides{
			
		}
		.uni-swiper-slides,.swiper{
			height: 700rpx;
		}
		uni-swiper {
			.uni-swiper-wrapper{
				overflow: auto;
			}
			
		}
		.page-section-item{
			.title{
				text-align: center;
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(19,190,111,1);
				line-height:140rpx;
			}
			.content{
				height: 500rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 0 50rpx;
				overflow-y: auto;
				font-size:26rpx;
				font-family:PingFang SC;
				// font-weight:bold;
				color:rgba(51,51,51,1);
				line-height:36rpx;
			}
		}
	}
</style>
