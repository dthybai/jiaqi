<template>
	<view class="home">
		<mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" :up="upOption" @up="upCallback">
		<com-swiper :banner="bannerData" :bannerStyle="bannerStyle" @videogo="videogo"></com-swiper>
		<view class="home-nav">
			<view class="home-nav-content">
				<view v-for="(item, index) of navItem" :key="index" class="nav-content-item" @tap="navigateToClass(item.id)">
					<image :src="item.img" class="nav-content-img"></image>
					<view class="nav-content-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="home-body-wrapper">
			<view class="body-item" v-for="(item, index) of bodyData" :key="index">
				<view class="body-item-top">
					<view class="body-item-title">
						<view class="body-title">
							{{item.title}}
						</view>
						<view class="body-introduce">
							{{item.desc}}
						</view>
					</view>
					<!-- 应该返回的是分类下的列表吧 -->
					<view class="body-item-look"@tap="lookHandler(item.id)">
						查看门票
					</view>
				</view>
				<com-video :videoData="item.videos"></com-video>
			</view>
		</view>
		</mescroll-body>
	</view>
</template>
<script>
import comSwiper from "@/components/com-swiper/com-swiper.vue"
import comVideo from "@/components/com-video/com-video.vue"
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default {
	mixins: [MescrollMixin], 
	data() {
		return {
			//轮播图
			bannerData:[],
			bannerStyle:{
				height: '600rpx',
				width: '750rpx'
			},
			downOption: {
				
			},
			upOption:{
				// noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				// empty:{
				// 	tip: '~ 暂无数据 ~' // 提示
				// }
			},
			navItem: [],
			bodyData:[]
		}
	},
	comments:{
		comSwiper,
		comVideo
	},
	created(){
	},
	mounted() {
		// #ifdef APP-PLUS
			// var currentWebview = this.$mp.page.$getAppWebview();
			// var tn = currentWebview.getStyle().titleNView;  
			// tn.buttons[0].text = "\ue8c8上海";   
			 
			// currentWebview.setStyle({ 
			// 	titleNView: tn 
			// });
		// #endif
	},
	//页面加载请求首页数据
	    onLoad: function() {	
		//页面一加载时请求一次数据
	    this.gethomelist();
	    },
	// // 下拉刷新
	// onPullDownRefresh() {
	// 	// uniapp设置了        "app-plus": { "titleNView": false  }  无法支持下拉刷新
	// },
 //    onReachBottom: function() {
	// 	//首页de请求数据是一起得没法做分页
 //    },
	methods: {
		downCallback(page){
			 this.gethomelist();
			 this.mescroll.resetUpScroll();
		},
		videogo(id){
			console.log(id)
			uni.navigateTo({
				url: `/pages/pays-place-order/pays-place-order?id=${id}`
			})
		},
		navigateToClass(type){
			uni.navigateTo({
				url: `/pages/classify/classify?id=${type}`
			})
			
		},
		gethomelist(){
			this.$api.getindex().then(res => {
			   // 获得首页数据 
			   console.log(res.data)
			  if(res.code === 200){
				this.bannerData = res.data.banner;
				this.navItem = res.data.classify;
				this.bodyData = res.data.recommed;
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
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/search-page/search-page'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			let index = e.index;
			if (index == 0) {
				// uni.showToast({
				//     title: '按钮1',
				//     duration: 2000
				// });
			} else if (index == 1) {
				// // #ifdef APP-PLUS
				// const pages = getCurrentPages();
				// const page = pages[pages.length - 1];
				// const currentWebview = page.$getAppWebview();
				// currentWebview.hideTitleNViewButtonRedDot({
				// 	index
				// });
				// // #endif
				// uni.navigateTo({
				// 	url: '/'
				// })
				uni.navigateTo({
					url: '/pages/browseHistory/browseHistory'
				})
			}
		},
		// #endif
		// 查看门票
		lookHandler (type) {
			uni.navigateTo({
				url: `/pages/tickets-page/tickets-page?id=${type}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.home-nav{
		width: 670rpx;
		margin: 0 36rpx 0 44rpx;
		position: relative;
		height: 100rpx;
		.home-nav-content{
			width: 670rpx;
			height: 200rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #fff;
			box-shadow:0px 6px 30px 0px rgba(0, 0, 0, 0.06);
			border-radius:20px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.nav-content-item{
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;
				.nav-content-img{
					width: 80rpx;
					height: 80rpx;
				}
				.nav-content-title{
					padding-top: 9rpx;
					color: #333333;
					font-size: 22rpx;
				}
			}
		}
	}
	.home-body-wrapper{
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 40rpx 50rpx;
		.body-item{
			padding: 56rpx 0 0;
		}
		.body-item-top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.body-title{
				color: #333333;
				font-weight: bold;
				font-size: 38rpx;
				line-height: 38rpx;
				padding-bottom: 19rpx;
			}
			.body-introduce{
				color: #999999;
				font-size: 22rpx;
			}
			.body-item-look{
				width:160rpx;
				height:64rpx;
				line-height: 64rpx;
				text-align: center;
				border:2rpx solid rgba(229,229,229,1);
				border-radius:32rpx;
				font-size:26rpx;
				font-weight:500;
				color:rgba(153,153,153,1)
			}
		}
		
	}
</style>
