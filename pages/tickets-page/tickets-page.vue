<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="北京门票"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="upCallback">
		<view class="tickets-page linear-gradient-color">	
			<com-tickets :ticketsData="ticketsData"></com-tickets>
		</view>
		</mescroll-body>
		
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// 定义全局参数,控制数据加载
			var _self,
			page = 1,
			size = 10;	
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				ticketsData: [],
				downOption: {
					
				},
				upOption:{
					// noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					// empty:{
					// 	tip: '~ 暂无数据 ~' // 提示
					// }
				},
				parms:''
			};
		},
		components: {
			uniNavBar,
			comTickets
		},
		//页面加载请求门票列表
		    onLoad: function(option) {
				this.parms = option.id; 
		    },
		methods: {
			downCallback(page){
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				console.log(page)
				this.getticketlist(pageNum,pageSize)
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
			getticketlist(pageNum,pageSize){ 
				this.$api.goodslist({page:pageNum,size:pageSize}).then(res => {
				   // 获得门票列表数据 
				  if(res.code === 200){
					  let curPageData = res.data;
					  let curPageLen = curPageData.length; 
					  // 与 mescroll-body 的处理方式一致 >
					  //设置列表数据
					  if(pageNum == 1) this.ticketsData = []; //如果是第一页需手动置空列表
					  this.ticketsData = this.ticketsData.concat(curPageData); //追加新数据
					  this.mescroll.endSuccess(curPageLen);		
						  console.log(res.data)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tickets-page{
		box-sizing: border-box;
		padding: 30rpx 40rpx 30rpx;
	}
	
</style>
