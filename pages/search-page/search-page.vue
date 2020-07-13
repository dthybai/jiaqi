<template>
	<view :class="titlIndex === 1 ? 'page-gray' : ''">
		<!-- <view class="status_bar">
		</view> -->
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" title="titleData" :titleData="titleData" :titlIndex="titlIndex" @titleHandler="titleHandler"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<com-search-input @searchBtnHandler="searchBtnHandler" :inputSearch="inputSearch"></com-search-input>
		<view class="search-wrapper">
			<view class="search-delete" v-if="( videoData.length === 0 && titlIndex === 0) || (ticketsData.length === 0 && titlIndex === 1)" @tap="deleteHistoryHandler()">
				<image src="../../static/img/garbage.png"></image>
				清空
			</view>
			<comdelete :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
			<!-- 搜索历史组件 -->
			<com-search-history   v-show="( videoData.length === 0 && titlIndex === 0&& historylists===true) || (ticketsData.length === 0 && titlIndex === 1 && historylists===true)" :isWhite="titlIndex" :serachHistoryData="serachHistoryData" :serachHistoryDatas="serachHistoryDatas" @searchItemHandler="searchItemHandler"></com-search-history>
			<!-- 热门搜索组件 -->
			<com-search-hot v-show="( videoData.length === 0 && titlIndex === 0) || (ticketsData.length === 0 && titlIndex === 1)" :isWhite="titlIndex" :serachHotData="serachHotData"  @searchItemHandler="searchItemHandler"></com-search-hot>
			<!-- 视频组件 -->
			<com-video :videoData="videoData" v-show="videoData.length && titlIndex === 0"></com-video>
			<!-- 门票组件 -->
			<com-tickets :ticketsData="ticketsData" v-show="ticketsData.length && titlIndex ===1"></com-tickets>
		</view>
	</view>
</template>

<script>
	import comHeaderDouble from "@/components/com-header-double/com-header-double.vue"
	import comSearchInput from "@/components/com-search-input/com-search-input.vue"
	import comSearchHistory from "@/components/com-search-history/com-search-history.vue"
	import comSearchHot from "@/components/com-search-hot/com-search-hot.vue"
	import comVideo from "@/components/com-video/com-video.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	
	export default {
		data() {
			return {
				searchHistoryShow:true,
				payDialogVisible: false,
				inputSearch:[],
				titlIndex: 0,
				titleData:[
					{
						title: '视频',
						isChecked: true
					},
					{
						title: '门票',
						isChecked: false
					}
				],
				serachHotData:[
					{
						title: '热门搜索',
						content: [
						]
					}
				],
				serachHistoryData:[
					{
						title: '搜索历史',
						content: [
							
						]
					}
				],
				serachHistoryDatas:[],
				videoData:[],
				ticketsData:[],
				searchHistory:[],
				historylists:false
			};
		},
		onLoad: () => {
			//console.log(document.querySelector('page'))
			//this.searchBtnHandler(item)
		},
		onNavigationBarSearchInputConfirmed(e) {
			console.log(e)
			// let sercherStorage = uni.getStorageSync('searchHistory')||'';
			// let searchHistory = [];
			//       searchHistory.push({
			//         id: searchHistory.length,
			//         name: e.text
			//       })
			// 	  searchHistory = sercherStorage;
			// 	   uni.setStorageSync('searchHistory', sercherStorage);
			// 	  console.log(searchHistory)
			//this.searchBtnHandler(e.text)
		},
		components: {
			comHeaderDouble,
			comSearchInput,
			comSearchHistory,
			comSearchHot,
			comVideo,
			comTickets,
			uniNavBar,
			comdelete
		},
		mounted() {
			let sercherStorage = uni.getStorageSync('searchHistory');
			if(sercherStorage.length==0){
				this.historylists = false
			}else{
				this.historylists = true
			}
			//获取历史搜索
			this.serachHistoryData[0].content = sercherStorage;
			console.log(this.serachHistoryData[0].content)
			  var temp = []; //一个新的临时数组
			    for(var i = 0; i < this.serachHistoryData[0].content.length; i++){
			        if(temp.indexOf(this.serachHistoryData[0].content[i].name) == -1){
			            temp.push(this.serachHistoryData[0].content[i].name);
			        }
			    }
				this.serachHistoryDatas = temp;
				console.log(temp)
			//获取热门搜索
			this.$api.hotkeyword().then(res => {
			  if(res.code === 200){
				this.serachHotData[0].content = res.data;
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
		methods: {
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
			// 接口内容点击事件
			searchItemHandler (item) {
				console.log(item)
				this.searchHandler(item)
			},
			// 接受搜索点击事件
			searchBtnHandler (item) {
				console.log(item)
				this.searchHandler(item)
			},
			searchHandler (item) {
				//收集历史搜索
				const searchHistory = uni.getStorageSync('searchHistory');
				if(searchHistory){
					searchHistory.push({
					  id: searchHistory.length,
					  name: item
					})
					 uni.setStorageSync('searchHistory', searchHistory);
				}else{
					const searchHistory = []
					searchHistory.push({
					        id: searchHistory.length,
					        name: item
					      })
					uni.setStorageSync('searchHistory', searchHistory);
				}
				if(this.titlIndex === 0) {
					// this.videoData
					//关键词热门搜索视频列表
					this.$api.videolist({title:item}).then(res => {
					  if(res.code === 200){
						  console.log(res)
						this.videoData = res.data;
						if(res.data.length===0){
							uni.showToast({
								icon: "none",
							    title: "暂无搜索内容",
							    duration: 2000
							});  
						}
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
				
				}else {
					//关键词热门搜索门票列表
					//this.ticketsData = []
					this.$api.goodslist({title:item}).then(res => {
					  if(res.code === 200){
						  console.log(res)
						this.ticketsData = res.data;
						if(res.data.length===0){
							uni.showToast({
								icon: "none",
							    title: "暂无搜索内容",
							    duration: 2000
							});  
						}
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
			},
			// 接受title索引
			titleHandler (index) {
				if(index == this.titlIndex) return false
				else this.titlIndex = index
			},
			// 删除历史
			deleteHistoryHandler() {
				this.payDialogVisible = true;
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
			uni.removeStorageSync('searchHistory');
			//uni.clearStorageSync('searchHistory');

				this.payDialogVisible = false;
				this.historylists = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
.search-wrapper{
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 40rpx 0;
	position: relative;
	.search-delete{
		position: absolute;
		right: 30rpx;
		top: 60rpx;
		display: flex;
		width: 94rpx;
		justify-content: center;
		align-items: center;
		image{
			display: block;
			margin-right: 11rpx;
			width: 30rpx;
			height: 30rpx;
		}
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,154,170,1);
	}
}
</style>
<style>
	
</style>
