<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="120" @down="downCallback" :up="upOption" @up="upCallback" >
		<view class="mainWarp"> 
			<view class="box_header" v-for="(item,index) of valuationelist">
				<view class="header">
					<view class="header_l header_r">
						<view class="header_img">
							<image  :src="item.headimg" mode=""></image>
						</view>
						<view class="header-size">
							<view class="header-col">
								{{item.nickname}}
							</view>
							<view class="header-col header-fam">
								{{item.create_at}}
							</view>
						</view>
					</view>
					<view class="header_l">
						<view class="garbage">
							<image src="../../static/img/garbage.png" mode="" @tap="dellist(index,item.id)"></image>
						</view>
					</view>
				</view>
				<view class="content">
					<text>{{item.content}}</text>
				</view>
				<view class="footer" @tap='videoHandler(item.video_id)'>
					<view class="footer_l">
						<text>{{item.title}}</text>
					</view>
					<view class="footer_l">
						<image :src="item.adv_img" mode=""></image>
						<image class="footer_asb" src="../../static/img/icon/play.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<comdelete :title='titlell' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
		</mescroll-uni>
	</view>
</template>

<script>
	import comdelete from "@/components/com-delete/com-delete.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				
				titlell:'您确定要删除当前评论吗？',
				payDialogVisible: false,
				title: '我的评价',
				typeindex: '',
				deleteId:'',
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
				valuationelist: []
			};
		},
		components: {
			uniNavBar,
			comdelete
		},
		onLoad () {
			 
		},

		methods:{
			/*下拉刷新的回调*/
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page)
				this.getevaluation(pageNum,pageSize)
			},
			//获取我的评论
			getevaluation (pageNum,pageSize){
				this.$api.evaluation({page:pageNum,size:pageSize}).then(res => {
				   // 获得分类下得视频数据 
				  if(res.code === 200){	
					  console.log(res.data)
					 let curPageData = res.data;
					 let curPageLen = curPageData.length; 
					 // 与 mescroll-body 的处理方式一致 >
					 //设置列表数据
					 if(pageNum == 1) this.valuationelist = []; //如果是第一页需手动置空列表
					 this.valuationelist = this.valuationelist.concat(curPageData); //追加新数据
					 this.mescroll.endSuccess(curPageLen);
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
			videoHandler(id){
				uni.navigateTo({
					url: `/pages/video-details/video-details?id=${id}`
				})
			},
			dellist(index,id){
				this.deleteId = id;
				this.typeindex = index
				console.log(this.deleteId)
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
				this.$api.delevaluation({id:this.deleteId}).then(res => {
				  if(res.code === 200){	
					  this.valuationelist.splice(this.typeindex,1) 
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
				this.payDialogVisible = false
				
			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
		}
	}
</script>

<style lang="scss" scoped>
.box{
	width: 100%; 
}
.box_header{
	width: 100%;
	margin-bottom: 100rpx;
	padding: 0 40rpx;
	box-sizing: border-box;
} 
.mainWarp{
	padding: 48rpx 0 0 0;
}
.header{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.header_l{
	align-items: center; 
	.header_img{
		width: 68rpx;
		height: 68rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.garbage{
		width: 30rpx;
		height: 29rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
.header_l{
	display: flex;
	.header-size{
		padding-left: 20rpx;
		.header-col{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:42rpx;
		}
		.header-fam{
			color:rgba(153,153,153,1);
		}
	}
}
.content{
	width: 100%;
	display: flex;
	justify-content: left;
	// height: 84rpx;
	padding: 24rpx 0 40rpx 0;
	text{	
		font-size:28rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
		line-height:42rpx;
	}
}
.footer{
	width: 100%;
	height:110rpx;
	background:rgba(248,248,248,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.footer_l{
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		image{
			width:165rpx;
			height:110rpx;
			border-radius:0rpx 10rpx 10rpx 0rpx;
		}
		.footer_asb{
			width:44rpx;
			height:44rpx;
			background:rgba(0,0,0,1);
			opacity:0.3;
			border-radius:50%;
			position: absolute;
			// z-index: 999;
			left: 40%;
			top: 30%;
		}
		text{
			padding-left: 40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			color:rgba(51,51,51,1);
		}
	}
}
</style>
