<template>
	<view class="container999">
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
		
			<!-- 数据列表 -->
			<mescroll-uni  ref="mescrollRef" @init="mescrollInit" top="240" @down="downCallback" :up="upOption" @up="upCallback" >
			<view class='content center_box' >				
				<allothers :videolist="videolist" ></allothers>
			</view>
			</mescroll-uni>
	</view>
</template>

<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import navTab from '../navTab/navTab.vue';
import allothers from '../allothers/allothers.vue';
var _self,
	page = 1,
	size = 10;
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {navTab,allothers},
	props: {
		videoData: {
			default: () => [],
			type: Array
		},
		tabTitle: {
			default: () => [],
			type: Array
		},
		titlIndex:{
			type:Number
		}
	},
	data() {
		return {
			videolist:[
			
			],
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
	watch: {
		tabClick: {
			handler(newName, oldName) {
				//this.searchHandler()
			},
			immediate: true,
			deep: true
		}
	},
	onShow() {
	},
	onHide() {	
	},
	
	methods: {
		longClick(index){
			this.tabClick = index;
			this.videolist = []// 先置空列表,显示加载进度
			console.log(this.videolist)
			this.mescroll.resetUpScroll() // 再刷新列表数据
			//this.upCallback(page)
		},
		/*下拉刷新的回调*/
		downCallback(page){
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			console.log(page)
			this.searchHandler(pageNum,pageSize)
		},
		getorderlist(status,pageNum,pageSize){	
			this.$api.orderinfolist({type:this.type,status:status,page:pageNum,size:pageSize}).then(res => {
			  if(res.code === 200){
				  let curPageData = res.data;
				  let curPageLen = curPageData.length; 
				  console.log(this.videolist)
				  // 与 mescroll-body 的处理方式一致 >
				  //设置列表数据
				  if(pageNum == 1) this.videolist = []; //如果是第一页需手动置空列表
				  this.videolist = this.videolist.concat(curPageData); //追加新数据
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
				this.getorderlist(this.status,pageNum,pageSize);
			}else if(this.tabClick == 2){
				this.status = 4;
				this.getorderlist(this.status,pageNum,pageSize);
			}else if(this.tabClick == 3){
				this.status = -1;
				this.getorderlist(this.status,pageNum,pageSize);
			}else{
				this.status = '';
				this.getorderlist(this.status,pageNum,pageSize);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.center_box{
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 40rpx 44rpx;
		box-sizing: border-box;
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
</style>
