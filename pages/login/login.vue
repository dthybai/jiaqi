<template>
	<view id="loginBg" @touchmove.stop.prevent="moveHandle" :style="{minHeight:appInfo.phoneHeight+'px',background:state==1 ||state ==2 ?'url(../../static/img/login/bg2x.png) '+' no-repeat':'url(../../static/img/login/bg2xv2.png)' +' no-repeat',    backgroundSize: state==1 ||state ==2 ?'cover':'100%'}">
		<view class="navCont">
			<view class="navGoRouter">
				<image src="/static/img/login/jiantou.png" mode=""@tap="previousstep"  v-if="state==3||state==4||state==2"></image>
			</view>
			<view class="navItemRight">
				<text v-if="state==1"@tap="setState(3)">忘记密码</text>
				<text v-if="state==4"@tap="setState(1)">已有账号？去登陆</text>
			</view>
		</view>
		<view class="logoWarp">
			<image src="/static/img/login/logo.png" mode=""></image>
		</view>
		<!-- {{$route.query.state}} -->
		<signIn v-if="state==1 || state==2"/>
		<register v-if="state==4"/>
		<forgetPassword v-if="state==3" @loginfn="setState"/>
	</view>
</template>
<script> 
//state   1=密码登录   2=手机号登录  3=忘记密码  4=注册
//1=密码登录   2=手机号登录    在同一组件signin.vue
import signIn from "./components/signIn.vue" //密码登录   +   手机号登录
import register from "./components/register.vue" //注册
import forgetPassword from "./components/forgetPassword.vue" //忘记密码

export default {
	data() {
		return { 
			state:1,
			appInfo:{
				phoneHeight:0
			}
		}
	},  
	methods: {  
		setState(res){
			this.state=res; 
		},
    previousstep(){
      this.state = 1
    },
	  moveHandle(){
	            return;
	            }
	},
	onLoad(option) {
		// this.automaticallyAdjustsScrollViewInsets = NO;
		console.log(option)
		let _this=this;
		uni.getSystemInfo({
            success(res) {
                _this.appInfo.phoneHeight = res.windowHeight;
			}
		})
		//设置当前登陆页面状态
		uni.$on("setState", (data) => {
			this.setState(data.state)
		});

	},
	components:{
		signIn,
		register,
		forgetPassword
	}
}
</script>

<style lang="scss" scoped>
#loginBg{
	width: 100%;
	height: 100%; 
	overflow: none;
	background-size: cover!important; 
	background-color: #f0f6f3!important;
}
uni-page-body, uni-page-refresh { 
    height: 100%;
}
.navCont{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 74rpx 31rpx 80rpx 20rpx;
	.navGoRouter{
		image{
			width: 39rpx;
			height: 39rpx;
		}
	}
	.navItemRight{
		text{
			font-size:28rpx; 
			font-weight:400;
			color:rgba(255,255,255,1);
		}
	}
}
.logoWarp{
	display: flex;
	justify-content: center;
	image{
		width: 177rpx;
		height: 226rpx;
	}
}
</style>
