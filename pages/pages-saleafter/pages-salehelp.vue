<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<view class="header_tab">
				<view class="tab"
					:class="index === tabClick ? 'click' : ''"
					v-for="(item, index) in cates"
					:key="index"
					@click="longClick(index,item.id)">
					{{item.text}}
				</view>
			</view>
		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" top="280" bottom="200" @down="downCallback" :up="upOption" @up="upCallback">
		<view class="info" v-for='(item,index) of fnlist' :key='index'>
			<view class="item" @tap="btnshow(index,item)">
				<text>{{item.title}}</text>
				<uni-icons type="arrowright" size="20" color="#C3C3C3" v-if="item.isShow === false"></uni-icons>
				<uni-icons type="arrowdown" size="20" color="#C3C3C3"  v-if="item.isShow === true"></uni-icons>
			</view>
			<view class="item-con" v-if="item.isShow" v-html="item.content">
			</view>
		</view>
		</mescroll-uni>
		<com-pays-btn :btnName="btnName" ></com-pays-btn>
	</view>
</template>

<script>
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	var _self,
	page = 1,
	size = 10;
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				cates:[],
				cate_id:0,
				tabClick: 0, //导航栏被点击
				currentTab: 0, //sweiper所在页
				title: '帮助反馈',
				btnName: '我要反馈',
				isShow:false,
				fnlist:[],
				isShows:[],
				downOption: {
					
				},
				upOption:{
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 暂无数据 ~' // 提示
					}
				}
				
			};
		},
		components: {
			uniNavBar,
			comPaysBtn
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
		onLoad() {
			this.opinioncate()
		},

		methods:{
			//获取分类
			opinioncate () {
				this.$api.opinioncate().then(res => {
					 console.log(res)
				  if(res.code === 200){
					  console.log(res)
					this.cates = res.data;
					this.cate_id = res.data[0].id;
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
					    title: "暂无分类数据",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
			},
			longClick (index,id){
				this.tabClick = index;
				this.cate_id= id;
				this.fnlist = []// 先置空列表,显示加载进度
				 console.log(this.cate_id)
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
				setTimeout(() => {
					this.searchHandler(pageNum,pageSize)
				}, 1000);
			},

			//获取问题列表
			getopinionlist (cate_id,pageNum,pageSize){
				this.$api.opinionlist({cate_id:cate_id,page:pageNum,size:pageSize}).then(res => { 
			  if(res.code === 200){
				  let curPageData = res.data;
				  let curPageLen = curPageData.length; 
				  console.log(res)
					curPageData.forEach(item=>{
							item.isShow=false;
					})
				  // 与 mescroll-body 的处理方式一致 >
				  //设置列表数据
				  if(pageNum == 1) this.fnlist = []; //如果是第一页需手动置空列表
				  this.fnlist = this.fnlist.concat(curPageData); //追加新数据
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
			btnshow(type,item){
				console.log(type,item)
				// if(this.isShow===true){
				// 	this.isShow=false
				// 	//this.fnlist[type].isShow = false
				// }else{
				// 	this.isShow=true	
				// }
				if(item.isShow===true){
					this.fnlist[type].isShow = false
				}else{
					for(let index in this.fnlist){
						this.fnlist[index].isShow = false
					}
					this.fnlist[type].isShow = true
				}
			},
			// 获取数据
			searchHandler (pageNum,pageSize) {
				if(this.tabClick == 0){
					this.getopinionlist(this.cate_id,pageNum,pageSize);
				}else{
					this.getopinionlist(this.cate_id,pageNum,pageSize);
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-top: 10rpx;
		background-color: #fff;
		.header_tab{
			width: 100%;
			height:72rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			.tab{
				height:72rpx;
				line-height: 72rpx;
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
.navTab{
	height: 100rpx;
	display: flex;
	color: #BBBBBB;
	font-size: 28rpx;
	padding: 0 40rpx;
	align-items: center;
	.active{
		margin-right: 60rpx;
		color:#333333;
	}
}
.info{
	margin-bottom: 30rpx;
	.item{
		height: 100rpx;
		padding: 0 40rpx;
		background-color: #F8F8F8;
		display: flex;
		align-items: center;
		margin: 0 40rpx;
		justify-content: space-between;
		font-size: 28rpx;
		color:#333333;
		border-radius:10rpx;
	}
	.item-con{
		padding: 30rpx 40rpx;
		background-color: #F8F8F8;
		align-items: center;
		margin: 0 40rpx;
		font-size: 28rpx;
		color:#333333;
	}
}
</style>
