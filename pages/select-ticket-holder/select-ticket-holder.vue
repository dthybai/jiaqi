<template>
	<view>
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :border="false"  title="选择持票人"@clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
			<image slot="right" src="../../static/img/duihaolv.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view style="width: 100%;height: 40rpx;">
			
		</view>
		<uni-view  v-if="peoplenones===1" class="mescroll-empty" style="z-index: 99; top: 100rpx;">
			<uni-image  class="empty-icon" style="height: 280rpx;">
				<div style="background-size: 100% 100%; background-repeat: no-repeat; background-image: url(&quot;http://www.mescroll.com/img/mescroll-empty.png?v=1&quot;);"></div>
			</uni-image>
		<uni-view  class="empty-tip">~ 暂无数据 ~</uni-view><!----></uni-view>
		
		<view class="select-ticket-item" v-if="peoplenones===0"  v-for="(item, index) of addressInfo" :key="index">
			<view class="ticket-item-left">
				<view class="type" v-if="item.age_type ===1">
					成人票
				</view>
				<view class="type" v-if="item.age_type ===2">
					老人票
				</view>
				<view class="type" v-if="item.age_type ===3">
					儿童票
				</view>
				<view class="type" v-if="item.age_type ===4">
					学生票
				</view>
				<view>
					<view class="user-phone">
						<text class="pr16">{{item.name}}</text>
						<text>{{item.phone}}</text>
					</view>
					<view class="user-certificate">
						<text v-if="item.type === 1">身份证：{{item.card}}</text>
					</view>
				</view>
			</view>
			
			
			<view class="inputCheckWarp">
				<inputCheck :clickstate="item.state" @tap="inputCheckWarpClick(item, index)"/>
			</view>
		</view>
		<view class="footerAddbtn">
			<button type="default" @tap="tianjia"><image src="/static/img/login/addjiahao.png" mode="widthFix"></image>添加联系人</button>
		</view>
	</view>
</template>

<script>
	import inputCheck from "@/components/input-check/input-check.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	
	export default {
		data() {
			return {
				serverData:[]				
			};
		},
		props: {
			addressInfo: {
				type: Array,
				default: () => []
			},
			peoplenones:{
				
			}
		},
		components: {
			uniNavBar,
			inputCheck
		},
		methods:{
			inputCheckWarpClick(item,index){ 
				this.addressInfo.map((item,indexs)=>{
					  item.state = false;
					if(indexs===index){
						this.addressInfo[indexs].state=true;
						if(this.addressInfo[indexs].state == true){
							this.addressInfo[indexs].state=true;
							 this.serverData.push(item.id);
						}else{
							this.addressInfo[indexs].state=false;
							//this.serverData.splice(indexs)
						}
						 
					}else{
						
						this.addressInfo[indexs].state=false
						//this.serverData.splice(indexs)
						
					}
				})
			},
			
			tianjia(){
				let type = 1;
				uni.navigateTo({
					url: `/pages/page-contactsfrequent/page-addcontactsfrequent?type=${type}`
				})
			},
			// 返回事件
			clickLeft () {
				this.$emit('selectpeopleClick')
			},
			clickRight(){
				console.log(this.addressInfo)
				console.log(this.serverData)
				this.$emit('selectpeopleClick',this.serverData)
				//选择购票人
			}
		},
		
	}
</script>

<style lang="scss" scoped>
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
	.select-ticket-item{
		padding: 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ticket-item-left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.type{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,187,2,1);
				padding: 15rpx;
				display: inline-block;
				background:rgba(255,187,2,.1);
				margin-right: 30rpx;
			}
			.user-phone{
				font-size:28rpx;
				line-height: 28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				padding-bottom: 20rpx;
			}
			.user-certificate{
				font-size:24rpx;
				line-height: 24rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
			}
			.pr16{
				padding-right: 16rpx;
			}
		}
		.have{
			width:34rpx;
			height:34rpx;
			background:rgba(19,190,111,1);
			border-radius:8rpx;
		}
		.nohave{
			width:34rpx;
			height:34rpx;
			background:#D2D2D2;
			border-radius:8rpx;
		}
		
	}
</style>
