<template>
	<view class="video-details">
		<!-- <uni-nav-bar left-icon="" left-text="" fixed right-text="" title="视频详情"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
			<view slot="right">
				<image src="/static/img/home/fenxiang.png" style="width: 44rpx;margin-top: 22rpx;" mode="widthFix"></image>
			</view>
		</uni-nav-bar> -->
		<!-- 记得参数 -->
		<video  :src="videodetail.video||'https://beijing.togy.com.cn/upload/9b6c5372aee9f6002b00eb6915c3e5c1.mp4'" preload="none" id="myVideo" controls :poster="adv_img"  @play="playVideoNum" style="object-fit:cover;" x5-video-player-type="h5" @timeupdate="videoTimeUpdateEvent">
		</video>
		<view>
			<view class="video-strategy">
				<view class="title">
					{{videodetail.title}}
				</view>
				<view class="explain" v-for="(item,index) of videodetail.tag"  :key="index">{{item}}</view>
				<view class="strategy">
					<view>
						视频期限{{videodetail.validity_time}}天
					</view>
					<view>
						播放量{{videodetail.read_num}}
					</view>
				</view>
			</view>
			<view class="video-content">
				<view class="video-nav">
					<view class="nav-item " v-for="(item, index) of navData" :key="index" :class=" index === navIndex ? 'active' : ''"@tap="navHandler(index)">
						{{item.title}}
					</view>
				</view>
				<com-video-introduce v-show="navIndex === 0" :videodetail="videodetail"></com-video-introduce>
				<com-video-comment v-show="navIndex === 1" :commentData="commentData"  @iconClick="iconClick" @commentclick="commentclick"></com-video-comment>
			</view>
		</view>
		<com-footer :ids="ids" :is_collect="is_collect" :is_buy="is_buy"/>
		<view class="commentFooterText" v-if="commentTextFrom.isShow"  :style="{bottom: bottom_val > 0 ? bottom_val + 'rpx' : '0'}">
			<input type="text" 
        v-model="commentTextFrom.text"
        :focus="commentTextFrom.focus"
		:adjust-position="true"
		:cursor-spacing="20"
        confirm-type="send" @confirm="search"  placeholder="我来说两句" placeholder-style="color:rgba(187,187,187,1);font-size:28rpx;"/>
			<text @tap="commentSendText">发送</text>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideoIntroduce from "@/components/com-video-introduce/com-video-introduce.vue"
	import comVideoComment from "@/components/com-video-comment/com-video-comment.vue"
	import comFooter from '@/components/com-footer/com-footer.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	var _self,
	page = 1,
	size = 10;
	export default {
		data() {
			return {
				is_collect:false,
				controls:true,
				ids:'',
				video_id:'',
				adv_img:'',
				bottom_val:0,
				phonetype:1,
				commentTextFrom:{
					isShow:false,
					text:"",
					focus:false
				},
				videodetail:[],
				introduce: '',
				loadingText: '加载中...',
				       loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				       contentText: {
				           contentdown:'上拉显示更多',
				           contentrefresh: '正在加载...',
				           contentnomore: '没有更多数据了',
						   contentnone:''
				       },
				navIndex: 0,
				navData: [
					{
						title: '介绍'
					},
					{
						title: '评论'
					}
				],
				commentData: [],
				freetime:'',
				comment_id:'',
				is_buy:false,
				sizes:10
			};
		},
		components: {
			uniNavBar,
			comVideoIntroduce,
			comVideoComment,
			comFooter
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			page = 1;
			this.ids = option.id;
			
		},
		created() {
			switch(uni.getSystemInfoSync().platform){
			    case 'android':	
					   this.phonetype = 0;
			       break;		
			    case 'ios':	
					this.phonetype = 1;		
			       break;		
			    default:			
				   this.phonetype = 2;
			       break;
			
			}
			// 创建视频实例指向视频控件
			this.getvideodetails();
			if(this.navIndex === 1){
				this.videoinfolist()
			}else{
				this.loadingType = 3;
			}
			this.videoContext = uni.createVideoContext('myVideo');
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			page = 1;
			this.getvideodetails();
			if(this.navIndex === 1){
				this.videoinfolist()
			}
		},
		onReachBottom: function() {
			//上拉加载
			if(this.navIndex === 1&&this.sizes===10){
				this.videoinfolist()
			}
		},
		
		methods: {
			//获取视频详情页
			getvideodetails(){
				this.$api.videodetails({id:this.ids}).then(res => {
				   // 获取视频详情页 
				   console.log(res.data)
				  if(res.code === 200){
						this.videodetail = res.data;
						this.video_id = res.data.id;
						this.is_collect = res.data.is_collect;
						this.freetime = res.data.free_time;
						this.is_buy = res.data.is_open;
						this.adv_img = res.data.adv_img;
						console.log(this.adv_img)
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						
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
			//免费时长
			videoTimeUpdateEvent(e){
				let currentTime = Number(e.detail.currentTime);
					console.log('播放进度条改变', currentTime)
					// 试看结束 this.class_info.freed_time为试看时间
					if (currentTime >= this.freetime&&this.is_buy==false) {
						// 试看结束,在这做一些想做的操作,例如停止视频播放
						this.videoContext.exitFullScreen();
						this.videoContext.pause();
						this.videoContext.seek(0);
						uni.showToast({
							icon: "none",
						    title: "试看结束，请购买后观看全部内容",
						    duration: 2000
						});
						
					}
			},
			//播放量
			playVideoNum(){
				this.$api.videosNum({id:this.ids}).then(res => {
				  if(res.code === 200){	
					  console.log(res)
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
			//获取视频评论列表
			videoinfolist(){
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				if(this.ids){
				this.$api.videoinfolist({id:this.ids,page:page,size:size}).then(res => {
				   console.log(res)
				  if(res.code === 200){
					  console.log(res.data)
						if(res.data.length<size){
							 this.loadingType = 2;
												 this.commentData = res.data;
												 this.sizes = res.data.length;												 
												 console.log(this.commentData)
												 uni.hideNavigationBarLoading();
												 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}else{
												  this.loadingType = 0;
												   this.data = this.data.concat(res.data);
												  //this.data = res.data;
												  uni.hideNavigationBarLoading();
												  uni.stopPullDownRefresh();//得到数据后停止下拉刷新
												  page++;
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
			search(){
				this.commentSendText()
			},
			commentSendText(){
				//评论视频
				this.$api.videoinfos({video_id:this.ids,content:this.commentTextFrom.text}).then(res => {
					console.log(res)
					if(res.code ===100){
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});
						this.videoinfolist();
						this.commentTextFrom.isShow=false;
					}
				 else if(res.code === 200){	
					  this.videoinfolist();
					  this.commentTextFrom.isShow=false;
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
				this.commentTextFrom.text="";
				this.commentTextFrom.focus=false;
			},
			commentclick(res){
				this.commentTextFrom.isShow=true; 
				this.commentTextFrom.focus=true;
				if(this.phonetype===1){
					this.bottom_val = 0;
					uni.onKeyboardHeightChange(res => {
					      console.log(res);
						  this.bottom_val = 0;
						  if (res.height === 0) {
						  	this.commentTextFrom.isShow=false; 
						    this.commentTextFrom.focus = false
						  }
					    })
				}else{
					uni.onKeyboardHeightChange(res => {
					    this.bottom_val = res.height*2.2
					    if (res.height === 0) {
							this.commentTextFrom.isShow=false; 
					      this.commentTextFrom.focus = false
					    }
					  })
				}
				
    //     uni.onKeyboardHeightChange(res => {
    //       console.log(res);
		  // this.bottom_val = res.height*2+'px';
		  // //document.getElementByclassName('commentFooterText').style.bottom = `${res.height}px`;
    //     })
			},
			iconClick(res){ 
				console.log(res)
				if(res.type===1){
					this.commentData[res.index].is_up=!this.commentData[res.index].is_up;
					this.commentData[res.index].is_down=false;
					this.$api.idea({type:1,comment_id:res.item.id}).then(res => {
					  if(res.code === 200){	
						  this.videoinfolist()
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
					
				}else{
					 this.commentData[res.index].is_down=!this.commentData[res.index].is_down
					 this.commentData[res.index].is_up=false
					this.$api.idea({type:0,comment_id:res.item.id}).then(res => {
					  if(res.code === 200){	
						this.videoinfolist()
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
			navHandler(index){
				if (this.navIndex === index) return false
				this.navIndex = index
				this.navIndex === 0?this.commentTextFrom.isShow = false:''
				if(index===1){
					this.videoinfolist();
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.commentFooterText{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	align-items: center;
	height:112rpx;
	background:rgba(255,255,255,1);
	box-sizing: border-box;
	justify-content: space-between;
	padding: 0 30rpx;
	box-shadow:0px 0px 30rpx 0px rgba(0, 0, 0, 0.04);
	input{
		width:600rpx;
		height:68rpx;
		background:rgba(248,248,248,1);
		border-radius:34rpx;
		text-indent: 1.3em;
		color: #333333;
		font-size: 28rpx;
	}
	text{
		// width:54px; ;
		font-size:28rpx; 
		font-weight:500;
		color:rgba(19,190,111,1);
		display: block;
		padding-right: 5rpx;
	}
}
.video-details{
	padding-bottom: 120rpx; 
}
video{
	width: 100%;
	height: 420rpx;
	display: block;
}
.video-strategy{
	width: 100%;
	box-sizing: border-box;
	padding: 50rpx 40rpx;
	background-color: #fff;
	.title{
		font-size:34rpx;
		line-height: 34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding-bottom: 20rpx;
	}
	.explain{
		display: inline-block;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,187,2,1);
		padding: 8rpx 12rpx;
		margin-left: 3px;
		background:rgba(255,187,2,0.1);
	}
	.strategy{
		padding-top: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
}
.video-content{
	background-color: #fff;
	width: 100%;
	margin-top: 16rpx;
	border-top: 16rpx solid rgba(249,249,249,1);
}
.video-nav{
	width: 100%;
	height: 106rpx;
	border-bottom: 1rpx solid rgba(249,249,249,1);
	display: flex;
	justify-content: space-around;
	align-items: center;
	.nav-item{
		line-height: 106rpx;
		text-align: center;
		position: relative;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.nav-item.active:after{
		content: '';
		width:48rpx;
		height:6rpx;
		background:rgba(19,190,111,1);
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -24rpx;
	}
}
</style>
