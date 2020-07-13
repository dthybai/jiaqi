<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="content">
			<view class="name">反馈原因</view>
			<textarea class="uTextarea" placeholder-style="color:#BBBBBB" placeholder="请输入反馈原因" v-model="content"/>
			<view class="name">凭证</view>
			<upload-image :url="url" :fileList="fileList" :limit="limit" :name="name" @onsuccess="onSuccess" @on-remove="onRemove" />
			<view class="pays-footer">
				<button class="pays-button" @tap="addimgs" :disabled="disableds">
					提交
				</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImage from '@/components/upload-image/upload-image.vue'
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	import { pathToBase64, base64ToPath } from '../../js_sdk/image-tools/index.js'
	export default {
		data() {
			return {
				title: '我要反馈',
				btnName:'提交',
				name: '', // 判断跳转
				fileList: [],
				url: '',
				limit:3,
				content:'',
				pathurls:[],
				disableds:false
			};
		},
		components: {
			uniNavBar,
			uploadImage
		},
		methods:{
			//上传反馈
			addimgs(){ //opinionupload
			this.disableds = true;
			uni.showLoading({
			    title: '反馈提交中...'
			});
			setTimeout(() => {
				let res = this.pathurls.join("|");
				console.log(res)
				this.$api.opinionupload({content:this.content,image:res}).then(res => {
					console.log(res)
				  if(res.code === 200){	
					  this.disableds = false;
					   uni.hideLoading();
					  uni.showToast({
					  	icon: "none",
					      title: "提交成功",
					      duration: 2000
					  });
					  setTimeout(() => {
					  	this.clickLeft();
					  }, 1000);
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
			}, 2500);
				console.log(this.pathurls)
				
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
			// 上传
			onSuccess(res) {
				this.fileList = res;
				 let end = res.slice(-1);
				 let pathimg = String(this.fileList)
				 console.log(this.fileList)
				 this.fileList.forEach(item=>{
				 	uni.uploadFile({
				 	            url: 'https://beijing.togy.com.cn/api/common/upload', //仅为示例，非真实的接口地址
				 	            filePath: item,
				 	            name: 'file',
				 	            success: (uploadFileRes) => {
				 					let jsonimg = JSON.parse(uploadFileRes.data);
				 	                console.log(uploadFileRes);
				 					this.pathurls.push(jsonimg.data);
				 	            },
				 				fail(err) {
				 					console.log(err)
				 				}
				 	        });
				 })
				
				//console.log(JSON.sub)
				},
				//删除
				onRemove(res) {
					this.fileList.splice(res,1);
					},
			onProcess(res) {
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			  console.log(err)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 40rpx;
	}
	.name{
		// width:109rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 30rpx;
	}
	.uTextarea{
		width:640rpx;
		height:300rpx;
		margin-bottom: 70rpx;
		background:rgba(248,248,248,1);
		padding-top: 30rpx;
		padding-left: 30rpx;
		border-radius:10rpx;
	}
	.pays-footer{
		width: 100%;
		height: 112rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		.pays-button{
			width:670rpx;
			height:80rpx;
			line-height: 80rpx;
			text-align: center;
			background:rgba(19,190,111,1);
			border-radius:40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
</style>
