<template>
	<view class="signinWarp"> 
		<!-- 手机登录 -->
		<view class="tapTopWarp">
			<text@tap="updataLoginState(1)" :style="{color:appIndex==1?'#ffffff':'rgba(255,255,255,0.5)'}">手机登陆</text>
			<text>|</text>
			<text@tap="updataLoginState(2)" :style="{color:appIndex==2?'#ffffff':'rgba(255,255,255,0.5)'}">密码登陆</text>
		</view>
		<view class="inputWarp">
			<view v-if="appIndex==2"> 
				<view class="input_user">
					<image src="/static/img/login/shouji.png" mode="widthFix"></image>
					<input class="uni-input" v-model="passdinput.user" type="number" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholderClass"/>
				</view>
				<view class="input_user">
					<image src="/static/img/login/mima.png" mode="widthFix"></image>
					<input class="uni-input" type="password" v-model="passdinput.password" placeholder="请输入密码" placeholder-class="placeholderClass"/> 
				</view> 
			</view>
			<view  v-if="appIndex==1">
				<view class="input_user">
					<image src="/static/img/login/shouji.png" mode="widthFix"></image>
					<input class="uni-input" v-model="codeInput.user" type="number" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholderClass"/>
				</view> 
				<view class="input_user" v-if="appIndex==1">
					<image src="/static/img/login/mima.png" mode="widthFix"></image>
					<input class="uni-input" v-model="codeInput.code" placeholder="请输入验证码"  maxlength="6" placeholder-class="placeholderClass"/> 
					<button class="getYanZhengMa"  :data-id="1"  :disabled="disabled" @tap="GetVerification">{{countdown}} <text v-show="timestatus">秒重获</text></button>
				</view>
			</view>
		</view>
		<view class="loginBtnWarp">
			<button type="primary" @tap="loginfn">登录</button>
			<view class="registerTextWarp">
				<text>还没有账号？</text>
				<text@tap="setState">去注册</text>
			</view>
		</view>
		<view class="otherLoginWarp">
			<view class="otherLoginTitle">
				其他方式
			</view>
			<view class="otherLoginMain">
				<view class="otherimgBack">
					<image src="/static/img/login/weixin.png" mode="" @tap="weixinlogin" >
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
						<!-- #endif -->
					</image>
				</view>
				<view class="otherimgBack">
					<image src="/static/img/login/qq@2x.png" @tap="zhifubaologin" mode="">
					</image>
				</view>
				<view class="otherimgBacks" v-if="system >= 13 && platform=='ios'">
					<image src="/static/img/applelog.png" @tap="applelogin" mode="">
					</image>
				</view> 
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return { 
				 countdown:'获取验证码',
				 disabled:false,
				 timestatus:false,
				 phonetype:0,
				appIndex:1,
				passdinput:{
					user:"",
					password:""
				},
				codeInput:{
					user:"",
					code:""
				},
				typeNumber:'',
				datas:{},
				system: '', // 系统版本
				platform: '',   // 平台
				
			}
		},  
		created() {  
			uni.getSystemInfo({
			    success: (res) => {
				let stem = res.system;
			    this.platform = res.platform
				this.system =  stem.slice(0,2)
				console.log(this.system)
			    },fail: (err) => {
			    },complete: () => {
			    }
			})
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
		},
		methods: { 
			weixinlogin(){
				uni.login({  
				            provider: 'weixin',  
				            success: (res) => { 
								//console.log(JSON.stringify(res.authResult))
								let token = {
									access_token:res.authResult.access_token,
									code:res.authResult.code,
									expires_in:res.authResult.expires_in,
									openid:res.authResult.openid,
									refresh_token:res.authResult.refresh_token,
									scope:res.authResult.scope,
									unionid:res.authResult.unionid
								}
								let tokens  = JSON.stringify(token)
									this.$api.weixinlogin(token).then(res => {
									   // 获得数据 
									   console.log(res)
									  if(res.code === 200){
										  this.login(res.data.token);
										 // uni.setStorageSync(uerInfo, res.data.token)	
										//跳转到首页
										   uni.switchTab({
										       url: '/pages/home/home'
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
									
				                    },  
				                    fail: (res) => {  				
				                       console.log(res)
				                        uni.showToast({  
				                            title: '获取用户失败',  
				                            icon: 'none'  
				                        })  
				                    }  
				                })
				      
			},
		zhifubaologin() {
			this.$api.zhifubaologin().then(res => {
			  if(res.code === 200){	
				let authInfo = res.data;
				const PPAliPay = uni.requireNativePlugin('PP-Alipay');
				PPAliPay.login({ authInfo: authInfo,appScheme:'alipay123456789' }, result => {
					let authCode = result.data.authCode;
					console.log(result)
					console.log(authCode)
					this.$api.aliLogin({code:authCode}).then(res => {
						console.log(res)
					  if(res.code === 200){	
						 this.login(res.data.token);
						  // uni.setStorageSync(uerInfo, res.data.token)	
						 //跳转到首页
						    uni.switchTab({
						        url: '/pages/home/home'
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
						    title: "服务器连接失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
					//self.msg = JSON.stringify(result)
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

			},
			applelogin(){
				console.log(1111111)
				uni.login({
				            provider: 'apple',  
				            success: (res) => { 
								console.log(res)
								let iosopenid=res.authResult.openid
								let token = {
									access_token:res.authResult.access_token,
									openid:res.authResult.openid,
								}
								let tokens  = JSON.stringify(token)
								console.log(tokens)
									this.$api.appleLogin(token).then(res => {
									   // 获得数据 
									   console.log(res)
									  if(res.code === 200){
										  this.login(res.data.token);
										  // uni.setStorageSync(uerInfo, res.data.token)	
										//跳转到首页
										   uni.switchTab({
										       url: '/pages/home/home'
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
									
				                    },  
				                    fail: (res) => {  				
				                       console.log(res)
				                        uni.showToast({  
				                            title: '获取用户失败',  
				                            icon: 'none'  
				                        })  
				                    }  
				                })
			},
			//用户获取验证码
			GetVerification(e){
				var that = this;
				if(that.codeInput.user === ''){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号",
					    duration: 2000
					});  
				}else{
					
					that.typeNumber = e.target.dataset.id;
					this.$api.GetVerification({phone: that.codeInput.user,type:that.typeNumber}).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						  setTimeout(()=>{
						  	that.disabled = true;
						  	 console.log(res) 
						  	 uni.showToast({
						  	      title: "验证码获取成功",
						  	      icon: 'none'
						  	  });
						  	  that.countdown = 60;
						  	  that.timestatus = true;
						  	  that.clear = setInterval(that.countDown,1000);
						  }, 200)
						 
					  }
					  else{
						  that.disabled = false;
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
			//用户登录功能
			loginfn(){
				if(this.appIndex === 2){
					var datas  = {
						phone: this.passdinput.user,
						type:this.appIndex,
						pwd:this.passdinput.password
					}
				}else if(this.appIndex === 1){
					var datas  = {
						phone: this.codeInput.user,
						type:this.appIndex,
						code:this.codeInput.code
					}
				}
				this.$api.login(datas).then(res => {
				   // 获得数据 
				   console.log(res)
				  if(res.code === 200){
					  this.login(res.data.token);
					 // uni.setStorageSync(uerInfo, res.data.token)	
					//跳转到首页
					   uni.switchTab({
					       url: '/pages/home/home'
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
				
			},
			updataLoginState(index){
				this.appIndex=index;
			},
			setState(){//设置当前登陆页面状态
				uni.$emit("setState",{state:4})
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
			},
			//
			 ...mapMutations(['login'])
		}
	}
</script>

<style lang="scss" scoped>
	uni-button:after {
		border: none;
	}
	.signinWarp{
		.tapTopWarp{ 
			font-size:28rpx; 
			font-weight:400;
			color:rgba(255,255,255,1); 
			padding: 100rpx 0 50rpx 0;
			display: flex;
			justify-content: center;
			text:nth-child(2){
				padding:0 30rpx;
			}
		}
		.inputWarp{
			width: 600rpx;
			margin: auto;
			.input_user{
				width: 100%;
				height: 92rpx;
				background:rgba(255,255,255,0.3);
				box-sizing: border-box;
				border-radius:46rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				position: relative;
				padding: 0 36rpx; 
				image{
					width: 36rpx;  
				}
				input{
					width: 100%;
					box-sizing: border-box;
					padding: 0 18rpx ;
					color: #ffffff;
				}
				.getYanZhengMa{
					background: none;
					border: none;
					position: absolute;
					right: 40rpx;
					height: 100%;
					line-height: 92rpx;
					// width: 138rpx;
					font-size:28rpx; 
					font-weight:400;
					color:rgba(19,190,111,1);
				}

			}
		}
		
		.loginBtnWarp{
			width: 600rpx;
			margin: auto;
			button{
				width: 100%;
				height:92rpx;
				line-height: 92rpx;
				background:rgba(19,190,111,0.5); 
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
				color:rgba(255,255,255,1);
				padding:38rpx 0 20rpx 0 ;
				text:nth-child(2){
					color:rgba(19,190,111,1);
				}
			}
		}
		.otherLoginWarp{
			.otherLoginTitle{
				text-align: center;
				font-size:28rpx; 
				font-weight:400;
				color:rgba(255,255,255,0.7); 
				padding: 0 0 20rpx 0;
			}
			.otherLoginMain{
				display: flex;
				width: 330rpx;
				margin-top: 10rpx;
				margin: auto;
				justify-content: space-between;
				align-items: center;
				.appleloginBtn{
					width:130pt; height:30pt; border-radius: 6px;
					margin-bottom: 20rpx;
					margin-left: 10rpx;
					image{
						width:130pt; height:30pt;
					}
				}
				
				.otherimgBack{
					width:88rpx;
					height:88rpx;
					background:rgba(255,255,255,0.4); 
					border-radius:50%;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 44rpx;
						height: 44rpx;
					}
				}
				.otherimgBacks{
					width:88rpx;
					height:88rpx;
					background:white; 
					border-radius:50%;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width:88rpx;
						height:88rpx;
					}
				}
			}
		}
	}
	.placeholderClass{
		color:rgba(255,255,255,0.5); 
	}
</style>
