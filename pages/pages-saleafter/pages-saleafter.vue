<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="content">
			<view class="name">售后原因</view>
			<textarea class="uTextarea" placeholder-style="color:#BBBBBB" placeholder="请输入售后原因" v-model="content"/>
			<view class="name">凭证</view>
			<upload-image  :url="url" :fileList="fileList" :limit="limit" :name="name" @onsuccess="onSuccess" @on-remove="onRemove" />
			<view class="pays-footer">
				<view class="pays-button" @tap="addimgs" :disabled="disableds">
					提交
				</view>
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
				title: '售后原因',
				btnName: '提交',
				name: '', // 判断跳转
				fileList: [],
				url: '',
				limit:3,
				content:'',
				//售后订单id
				order_id:'',
				pathurls:[],
				disableds:false
			};
		},
		components: {
			uniNavBar,
			uploadImage,
			comPaysBtn
		},
		onLoad(opction) {
			this.order_id = opction.id;
		},
		methods:{
			//上传反馈
			addimgs(){
				this.disableds = true;
				uni.showLoading({
				    title: '反馈提交中...'
				});
				this.fileList.forEach(item=>{
				uni.uploadFile({
				            url: 'https://beijing.togy.com.cn/api/common/upload', //仅为示例，非真实的接口地址
				            filePath: item,
				            name: 'file',
				            success: (uploadFileRes) => {
								let jsonimg = JSON.parse(uploadFileRes.data);
				                console.log(jsonimg.data);
								this.pathurls.push(jsonimg.data);
				            },
							fail(err) {
								console.log(err)
							}
				        });
						})

				setTimeout(() => {
				this.$api.orderRefund({order_id:this.order_id,desc:this.content,img:this.pathurls}).then(res => {
					console.log(res)
				  if(res.code === 200){	
					  this.disableds = false;
					   uni.hideLoading();
					  uni.showToast({
					  	icon: "none",
					      title: "提交售后成功",
					      duration: 2000
					  });
					  setTimeout(() => {
					  	this.clickLeft();
					  }, 500);
				  }
				  
				  else{
					  this.pathurls=[]
					  setTimeout(() => {
					  	this.clickLeft();
					  }, 500);
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
				}, 2000);

			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/page-contactsfrequent/page-salesapply'
				});
				// #endif 
			},
			// 上传
			onSuccess(res) {
				 this.fileList = res;
				 let end = res.slice(-1);
				 console.log(this.fileList)
				 let pathimg = String(end)
				
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
