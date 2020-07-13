<template>
	<view class="signinWarp">
		<!-- 忘记密码 --> 
		<view class="inputMain">
			<view class="inputRow">
				<input type="number" placeholder="请输入手机号" v-model="forgetindex.phone" maxlength="11" placeholder-class="placeholderClass" />
			</view>
			<view class="inputRow">
				<input type="number" placeholder="请输入验证码" v-model="forgetindex.code" maxlength="6" placeholder-class="placeholderClass" />
				<button class="getYanZhengMa" :data-id="3"  :disabled="disabled"@tap="GetVerification">{{countdown}} <text v-show="timestatus">秒重获</text></button>
			</view>
			<view class="inputRow">
				<input type="text" placeholder="设置密码" v-model="forgetindex.password" placeholder-class="placeholderClass" />
			</view>
			<view class="inputRow">
				<input type="text" placeholder="确认密码" v-model="forgetindex.passwords" placeholder-class="placeholderClass" />
			</view>
		</view>
		<view class="loginBtnWarp">
			<button type="primary"@tap="loginfn">提交</button> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				countdown:'获取验证码',
				disabled:false,
				timestatus:false,
				forgetindex:{
					phone:"",
					password:"",
					passwords:"",
					code: ""
				},
				typeNumber:''
			}
		},  
		props:{
			state:{
				type:Number
			}
		},
		methods: {  
			//用户获取验证码
			GetVerification(e){
				var that = this;
				if(that.forgetindex.phone === ''){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号",
					    duration: 2000
					});  
				}else{
					that.disabled = true;
					that.typeNumber = e.target.dataset.id;
					this.$api.GetVerification({phone: that.forgetindex.phone, type:that.typeNumber }).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						   console.log(res) 
						 uni.showToast({
						        title: res.data.info,
						        icon: 'none'
						    });
						    that.countdown = 60;
						    that.timestatus = true;
						    that.clear = setInterval(that.countDown,1000);
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
			loginfn(){
				var that = this;
				if(that.forgetindex.phone === ''){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号",
					    duration: 2000
					});
				}else if(that.forgetindex.code === ''){
					uni.showToast({
						icon: "none",
					    title: "验证码不能为空",
					    duration: 2000
					});
				}else if(that.forgetindex.password === '' || that.forgetindex.passwords === '' || that.forgetindex.password != that.forgetindex.passwords){
					uni.showToast({
						icon: "none",
					    title: "密码不能为空或俩次输入的密码不一致",
					    duration: 2000
					});
				}else{
					this.$api.ForgetPassword({phone: that.forgetindex.phone, code: that.forgetindex.code, password: that.forgetindex.password}).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						  // console.log(res) 
						  uni.showToast({
						  	icon: "none",
						      title: "密码修改成功",
						      duration: 2000
						  });
						  let state  = 1;
						   //修改密码成功后，跳转到登录页面 
						
						  uni.navigateBack({ 
						  	delta: 1
						  });
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
				
				// uni.switchTab({
				//     url: '/pages/home/home'
				// });
			},
			// 倒计时
			countDown(){
			    var that = this;
			    if(!that.countdown){                    
			        that.disabled = false;
			        that.timestatus = false;
			        that.countdown = '获取验证码';
			        clearInterval(that.clear);
			        }else{
			        --that.countdown;
			        }
			}
		},
		onLoad(option) {
			console.log(option)
		}
	}
</script>

<style lang="scss" scoped>
	uni-button:after {
		border: none;
	}
	.placeholderClass{
		font-size:28rpx;
		font-weight:400;
		color:rgba(187,187,187,1);
	}
	.inputMain{
		width: 600rpx;
		margin: auto;
		padding-top: 200rpx;
		.inputRow{
			padding: 0 0 30rpx 0; 
			position: relative;
			input{
				height:92rpx;
				background:rgba(255,255,255,1);
				border-radius:46rpx;
				text-indent: 40rpx;
			}
			.getYanZhengMa{
				background: none;
				border: none;
				position: absolute;
				right: 40rpx;
				line-height: 92rpx;
				top:0;
				// width: 138rpx;
				font-size:28rpx; 
				font-weight:400;
				color:rgba(19,190,111,1);
			}
		}
	}
	.loginBtnWarp{
		width: 600rpx;
		padding-top: 32rpx;
		margin: auto;
		button{
			width: 100%;
			height:92rpx;
			line-height: 92rpx;
			background:linear-gradient(90deg,rgba(19,190,111,1) 0%,rgba(9,166,94,1) 100%);
			border-radius:44rpx;
			font-size:28rpx; 
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		.registerTextWarp{
			display: flex;
			justify-content: center;
			font-size:28rpx; 
			font-weight:400;
			color:#999999;
			padding:38rpx 0 102rpx 0 ;
			text:nth-child(2){
				color:rgba(19,190,111,1);
			}
		}
	}
</style>
