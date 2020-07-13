<template>
	<view class="box contactsWarp">
		<uni-nav-bar left-icon="" left-text="" fixed :right-text="adminState?'完成':'管理'" :title="title"@clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="mainWarp">
			<view class="mainItem" v-if="peoplenone===0" v-for="(item, index) of datalist" :key="index" >
				<view class="checkbox" v-if="adminState"@tap="inputCheckWarpClick(item, index)">
					<inputCheck :clickstate="item.active"/>
				</view>
				<view class="mainlist_left" v-if="item.age_type===4">
					学生票
				</view>
				<view class="mainlist_left" v-if="item.age_type===3">
					儿童票
				</view>
				<view class="mainlist_left" v-if="item.age_type===2">
					老人票
				</view>
				<view class="mainlist_left" v-if="item.age_type===1">
					成人票
				</view>
				<view class="mainlist_right">
					<view class="mainlist_right_top">
						{{item.name}} {{item.phone}}
					</view>
					<view class="mainlist_right_bottom">
						{{item.type ===1 ? '中国居民身份证' :'其他证件'}} {{item.card}}
					</view>
				</view>
			</view>
			<uni-view  v-if="peoplenone===1" class="mescroll-empty" style="z-index: 99; top: 100rpx;">
				<uni-image class="empty-icon" style="height: 280rpx;">
				<div style="background-size: 100% 100%; background-repeat: no-repeat; background-image: url(&quot;http://www.mescroll.com/img/mescroll-empty.png?v=1&quot;);">
					
				</div>
				</uni-image>
				<uni-view  class="empty-tip">~ 暂无数据 ~</uni-view><!----></uni-view>
		</view>
		<view class="footerAddbtn" v-if="!adminState">
			<button type="default"@tap="tianjia"><image src="/static/img/login/addjiahao.png" mode="widthFix"></image>添加联系人</button>
		</view>
		<view class="footerAddbtn_set" v-if="adminState"> 
				<view class="footer_si"@tap="allSetCheckClick">
					<inputCheck :clickstate="allSetCheck"/>
					全选
				</view> 
				<button type="default"@tap="fndel">删除</button>
		</view>
		<comdelete :title="titlett" :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
		
	</view>
</template>

<script>
	import inputCheck from "@/components/input-check/input-check.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	export default {
		data() {
			return {
				titlett:'您确定要删除当前联系人吗？',
				payDialogVisible:false,
				adminState:false,
				allSetCheck:false,
				title: '常用联系人',
				datalist:[],
				packboxId:[],
				peoplenone:0
			};
		},
		components: {
			uniNavBar,
			inputCheck,
			comdelete
		},
		onShow() {
			this.getinfolist();
		},
		methods:{
			getinfolist() {
				//获取常用联系人列表
					this.$api.addressinfo().then(res => {
					  if(res.code === 200){
						  console.log(res.data)
						  
						  if(res.data.length==0){
							   this.peoplenone =1;
						  }else{
							  this.peoplenone =0;
							 this.datalist = res.data;   
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
			},
			//
			inputCheckWarpClick(item,index){
				this.datalist.map((item,indexs)=>{
					item.state = false;
					if(indexs===index){
						this.datalist[indexs].active=true;
						if(this.datalist[indexs].active == true){
							 this.packboxId.push(item.id);
						}
						 
					}else{
						this.datalist[indexs].active=false
					}
				})
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
			//获取要删除联系人id
			this.$api.deladdressinfo({ids:this.packboxId}).then(res => {
			  if(res.code === 200){
					console.log(res)
					this.getinfolist();
					this.payDialogVisible = false
					this.adminState = false
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
			fndel(){
				this.payDialogVisible = true
			},
			tianjia(){
				let type = 2
				uni.navigateTo({
					url: `/pages/page-contactsfrequent/page-addcontactsfrequent?type=${type}`
				})
			},
			allSetCheckClick(){
				this.allSetCheck=!this.allSetCheck;
				if(this.allSetCheck){ 
					this.setListArrFn(true)
					//this.packboxId.push();
					//console.log(this.packboxId)
				}else{
					//this.packboxId = []
					this.setListArrFn(false)
					//console.log(this.packboxId)
				}  
			},
			setListArrFn(state){
				this.datalist.map((item,indexs)=>{
					this.datalist[indexs].active=state;
					if(this.datalist[indexs].active===true){
						this.packboxId.push(this.datalist[indexs].id);
					}else{
						this.packboxId = []
					}
				})
			},  
			// 返回事件
			clickLeft () {
				this.payDialogVisible = false
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.switchTab({
				    url: '/pages/my/my'
				});
				// #endif 
			},
			clickRight(){
				this.payDialogVisible = false
				this.adminState=!this.adminState;
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.contactsWarp{overflow: hidden;}
.mainWarp{
	.mescroll-empty {
	    box-sizing: border-box;
	    width: 100%;
	    padding: 100rpx 50rpx;
	    text-align: center;
		.empty-tip {
		    margin-top: 20rpx;
		    font-size: 24rpx;
		    color: gray;
		}
		.empty-icon {
		    width: 280rpx;
		    height: 280rpx;
		}
	}
	.mainItem{
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 78rpx 40rpx 0 40rpx;
		.checkbox{
			margin-right: 30rpx;
		}
		.mainlist_left{
			width:100rpx;
			height:50rpx;
			background:rgba(255,187,2,0.1); 
			font-size:24rpx; 
			font-weight:500;
			color:rgba(255,187,2,1);
			line-height: 50rpx;
			text-align: center;
			margin-right: 30rpx;
		}
		.mainlist_right{
			.mainlist_right_top{ 
				font-size:28rpx; 
				font-weight:500;
				color:rgba(51,51,51,1);
				padding: 0 0 19rpx 0;
			}
			.mainlist_right_bottom{
				font-size:24rpx; 
				font-weight:500;
				color:rgba(153,153,153,1);
			}
		}
	}
	
}
.footerAddbtn{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 24rpx 0;
		button{
			margin: auto;
			width:670rpx;
			height:80rpx;
			background:rgba(19,190,111,1);
			border-radius:40rpx;
			font-size:28rpx; 
			font-weight:500;
			color:rgba(255,255,255,1);
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
.footerAddbtn_set{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 0rpx 40rpx;
		height:98rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 30px 0px rgba(0, 0, 0, 0.06);
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		.checkboxwarp{
			display: flex;
			font-size:28rpx; 
			font-weight:500; 
			color:rgba(51,51,51,1);
		}
		button{
			width:180rpx;
			height:68rpx;
			border:2rpx solid rgba(238,238,238,1);
			border-radius:34rpx;
			font-size:28rpx; 
			font-weight:500;
			color:rgba(102,102,102,1);
			margin: 0 80rpx;
		}
		uni-button:after{
			content: '';
			border: none;
		}
	}
	.checkboxstyle{
		display: flex;
		align-items: center;
		margin-right: 30rpx;
	// 	width:34rpx!important;
	// 	height:34rpx!important;
	// 	background:rgba(19,190,111,1)!important;
	// 	border-radius:8rpx!important;
	}
	.footer_si{
		font-size:28rpx;
		display: flex;
		width: 120rpx;
		justify-content: space-between;
		align-items: center;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	
</style>
<style>
	/* .contactsWarp uni-checkbox .uni-checkbox-input{
		width:34rpx!important;
		height:34rpx!important;
		background:rgba(19,190,111,1)!important;
		border-radius:8rpx!important;
	} */ 
</style>
