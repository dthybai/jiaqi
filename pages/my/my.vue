<template>
	<view id="my">
		<view class="headerWarp" >
			<view class="headerMain">
				<view class="headerMain_left">
					<text>{{nickname||'用户:'}}</text>
					<text>{{phone}}</text>
				</view>
				<view class="headerMain_right"@tap="tapRouter">
					<image :src="headimg ||'../../static/img/tou.png'" mode=""></image>
				</view>
			</view>
			<view class="headerBack">
				<view class="headerBack_itemTop"></view>
				<view class="headerBack_itemBottom"></view>
			</view>
		</view>
		<view class="mainContWarp">
			<view class="menuWarp">  
				<view v-for="(item, index) of menuItem" :key="index" class="menuItem"@tap="menuItemClick(item.path)">
					<image :src="item.url"></image> 
					<text>{{item.title}}</text>
				</view>  
			</view>
			<view class="advertisementWarp">
				<image :src="guanggaotu" mode=""></image>
			</view> 
		</view>
		<view class="myTooltWarp">
			<text class="myTool_title">我的工具</text>
			<view class="myToolt_cont">
				<view v-for="(item, index) of myTooltItem" :key="index" class="myTooltItem"@tap="menuItemClick(item.path)">
					<image :src="item.url"></image> 
					<text>{{item.title}}</text>
				</view>  
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuItem:[
					{title: '我的账户', url: '/static/img/my/qianbao.png',path:"/pages/myAccount/myAccount"},
					{title: '我的视频', url: '/static/img/my/shipin.png',path:"/pages/page-my-videos/page-my-videos"},
					{title: '我的门票', url: '/static/img/my/menpiao.png',path:"/pages/page-my-tickets/page-my-tickets"},
					{title: '我的收藏', url: '/static/img/my/shoucang.png',path:"/pages/mycollection/mycollection"},
				],
				myTooltItem:[
					{title: '常用联系人', url: '/static/img/my/lianxiren.png',path:"/pages/page-contactsfrequent/page-contactsfrequent"},
					{title: '我的评价', url: '/static/img/my/wodepingjia.png',path:"/pages/page-contactsfrequent/page-myevaluation"},
					{title: '申请售后', url: '/static/img/my/shouhou.png',path:"/pages/page-contactsfrequent/page-salesapply"},
					{title: '帮助反馈', url: '/static/img/my/bangzhu.png',path:"/pages/pages-saleafter/pages-salehelp"},
					{title: '联系我们', url: '/static/img/my/lianxiwomen.png',path:"/pages/pages-saleafter/pages-uscontact"},
				],
				nickname:'',
				phone:'',
				headimg:'',
				guanggaotu:''
			}
		},
		onLoad() {
			this.getuserinfo();
			this.getcenterAdv();
		},
		onShow() {
			this.getuserinfo();
			this.getcenterAdv();
		},
		methods: {
			//获取广告图
			getcenterAdv () {
				this.$api.centerAdv().then(res => {
				  if(res.code === 200){	
					  console.log(res)
					  this.guanggaotu = res.data.center_adv_img;
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
			//获取我的信息
			getuserinfo () {
				this.$api.userinfo().then(res => {
				  if(res.code === 200){	
					  console.log(res)
						  this.phone = res.data.phone;
						  this.nickname = res.data.nickname;
						  this.headimg = res.data.headimg;
						   console.log(this.headimg)
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
			menuItemClick(path) {
				console.log(path)
				uni.navigateTo({
					url: path
				})
			},
			tapRouter(val){
				uni.navigateTo({
					url: '/pages/myInformation/myInformation'
				}); 
			}
		}
	}
</script>

<style lang="scss" scoped>
#my{
	width: 100%;
	overflow: hidden;
}
.headerWarp{
	height: 385rpx;
	position: relative;
	.headerMain{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		width: 100%;
		padding: 134rpx 40rpx 0 40rpx;
		box-sizing: border-box;
		z-index: 2;
		.headerMain_left{
			text:nth-child(1){
				font-size:40rpx; 
				font-weight:bold;
				color:rgba(51,51,51,1);
			}
			text:nth-child(2){
				font-size:24rpx; 
				font-weight:500;
				color:rgba(51,51,51,1);
				opacity:0.8;
				display: block;
				padding: 23rpx 0 0 0;
			}
		}
		.headerMain_right{
			width:130rpx;
			height:130rpx;
			border-radius:50%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.headerBack{
		position: absolute;
		left: 0;
		top: 0;
		view{
			position: absolute;
			background:rgba(254,255,254,1);
			box-shadow:0rpx 6rpx 50rpx 0rpx rgba(19,80,49,0.05);
			border-radius:50%;
		}
		.headerBack_itemTop{
			width:400rpx;
			height:400rpx;
			left: -26rpx;
			top: -256rpx;
		}
		.headerBack_itemBottom{
			width:330rpx;
			height:330rpx;
			top: -14rpx;
			left:-169rpx ;
		}
	}
}
.mainContWarp{
	padding:0 40rpx
}
.menuWarp{
	display: flex;
	justify-content: space-between;
	align-items: center;
	.menuItem{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			height: 62rpx;
			width: 62rpx;
		}
		text{
			display: block;
			padding: 28rpx;
			font-size:24rpx; 
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
}
.advertisementWarp{
	display: flex;
	justify-content: center;
	padding: 77rpx 0 81rpx 0;
	image{
		width: 670rpx;
		height: 120rpx;
	}
}
.myTooltWarp{
	padding: 0 0 50rpx 0;
	.myTool_title{ 
		font-size:30rpx; 
		font-weight:bold;
		display: block;
		width: 100%;
		color:rgba(51,51,51,1); 
		padding: 0 40rpx;
	}
	.myToolt_cont{
		display: flex;
        flex-wrap: wrap;
		width: 98%;
		margin: auto;
		.myTooltItem{
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
		    padding: 69rpx 0 0 0;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			text{
				font-size:24rpx; 
				font-weight:500;
				color:rgba(51,51,51,1);
				display: block;
				padding: 26rpx 0 0 0;
			}
		}
	}
}
</style> 
