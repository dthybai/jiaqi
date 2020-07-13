<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
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
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="250" @down="downCallback" :up="upOption" @up="upCallback" >
		<view class="footer">	
			<allticket :ticketslist="ticketslist" :ticketslists="ticketslists" :tabClick="tabClick"></allticket>
		</view>
		</mescroll-uni>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import allticket from '@/components/allticket/allticket.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				windowHeight:0,
				tabClick: 0, //导航栏被点击
				title: '申请售后',
				tabTitle:['申请售后','待审核','售后完成'],
				ticketslist:[],
				ticketslists:[],
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				},
			    tabClick: 0, //导航栏被点击
				currentTab: 0, //sweiper所在页
				type:1,
				status:''
			};
		},
		components: {
			uniNavBar,
			allticket
		},
		watch: {
			tabClick: {
				handler(newName, oldName) {
					//this.searchHandler()
				},
				immediate: true,
				deep: true
			}
		},
		methods:{
		longClick(index){
				this.tabClick = index;
				this.ticketslist = []
				this.ticketslists = []// 先置空列表,显示加载进度
				console.log(this.ticketslist)
				this.mescroll.resetUpScroll() // 再刷新列表数据
			},
			/*下拉刷新的回调*/
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(pageNum,pageSize)
				this.searchHandler(pageNum,pageSize)
			},
			orderRefundList(pageNum,pageSize){
				this.$api.orderRefundList({page:pageNum,size:pageSize}).then(res => {
				  if(res.code === 200){
					  let curPageData = res.data;
					  let curPageLen = curPageData.length; 
					  console.log(res.data)
					  // 与 mescroll-body 的处理方式一致 >
					  //设置列表数据
					  if(pageNum == 1) this.ticketslist = []; //如果是第一页需手动置空列表
					  this.ticketslist = this.ticketslist.concat(curPageData); //追加新数据
					  this.mescroll.endSuccess(curPageLen);
				  }
				  else{
					  this.mescroll.endErr()
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
					this.mescroll.endErr()
				　　// 失败进行的操作
				})
			},
			orderRefundInfo(status,pageNum,pageSize){
				this.$api.orderRefundInfo({status:status,page:pageNum,size:pageSize}).then(res => {
				  if(res.code === 200){
					  console.log(res)
					  let curPageData = res.data;
					  let curPageLen = curPageData.length; 
					  console.log(this.ticketslists)
					  // 与 mescroll-body 的处理方式一致 >
					  //设置列表数据
					  if(pageNum == 1) this.ticketslists = []; //如果是第一页需手动置空列表
					  this.ticketslists = this.ticketslists.concat(curPageData); //追加新数据
					  this.mescroll.endSuccess(curPageLen);
				  }
				  else{
					  this.mescroll.endErr()
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
					this.mescroll.endErr()
				　　// 失败进行的操作
				})
			},
			// 获取数据
			searchHandler (pageNum,pageSize) {
					
				if(this.tabClick == 1){
					this.status = 1;
					this.orderRefundInfo(this.status,pageNum,pageSize);
				}else if(this.tabClick == 2){
					this.status = 4;
					this.orderRefundInfo(this.status,pageNum,pageSize);
				}else{
					this.orderRefundList(pageNum,pageSize);
				}
			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.switchTab({
				    url: '/pages/my/my'
				});
				// #endif 
			},
		},
		onShow: function() {
			let _this=this;
			uni.getSystemInfo({
				success: function (res) {  
					_this.windowHeight=res.windowHeight
				}
			});
		},
	}
</script>

<style lang="scss" scoped>
	page{
		min-height:100%;
		background-color: #F8F8F8;
	}
.box{
		width: 100%;
		background-color: #F8F8F8;
	}
	.header{
		position: fixed;
		z-index: 1;
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-top: 20rpx;
		background-color: #fff;
		.header_tab{
			width: 100%;
			height:45px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			.tab{
				height:45px;
				line-height: 45px;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.click{
				font-weight:bold;
				border-bottom: 1rpx solid #13BE6F;
				color:rgba(51,51,51,1);
			}
		}
	}
	.footer{
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
</style>
