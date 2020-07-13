<template>
	<view>
		<uni-nav-bar left-icon="" left-text="" fixed :border="false"  title="添加联系人"@clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="box">
			<view class="header">
				证件类型
			</view>
			<view class="certificate" v-for="(item,index) of fndata">
				<view class="inputCheckWarp"@tap="inputCheckWarpClick(item, index)">
					<view class="inputCheckWarp_p"><inputCheck :clickstate="item.state"/><text>{{item.cerficate}}</text></view>
				</view>
			</view>
			<view class="header">
				姓名
			</view>
			<view class="cent">
				<input type="text" placeholder-style="color:#BBBBBB" placeholder="请输入真实姓名以便购买" value="" v-model="datas.name"/>
			</view>
			<view class="header">
				性别
			</view>
			<view class="gender">
				<view class="woman" :class="{wocolor:index==type}" v-for='(item,index) in gendata'@tap="fnbtn(index)">
					<image :src="item.image" mode="" v-if="index==type"></image>
					<image :src="item.img" mode="" v-else></image>
					<text>{{item.woman}}</text>
				</view>
			</view>
			<view class="header">
				证件号码
			</view>
			<view class="cent">
				<input type="number" placeholder-style="color:#BBBBBB" placeholder="用于身份核验，请正确填写" value="" v-model="datas.card"/>
			</view>
			<view class="header">
				旅游类型
			</view>
			<view class="gender">
				<view class="woman" :class="{wocolor:index==isshow}" v-for='(item,index) in travel' :key="index"@tap="isbtn(index,item.age_type)">
					<text v-if="item.age_type===1">成人票</text>
					<text v-if="item.age_type===2">老人票</text>
					<text v-if="item.age_type===3">儿童票</text>
					<text v-if="item.age_type===4">学生票</text>
				</view>
			</view>
			<view class="header">
				联系方式
			</view>
			<view class="cent">
				<input type="number" placeholder-style="color:#BBBBBB" placeholder="请准确填写手机号" maxlength="11" value="" v-model="datas.phone"/>
			</view>
		</view>
		<com-pays-btn :btnName="btnName" :datas="datas" :tijiaotype="tijiaotype"></com-pays-btn>
	</view>
</template>

<script>
	import inputCheck from "@/components/input-check/input-check.vue"
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	export default {
		components: {
			inputCheck,
			comPaysBtn
		},
		data() {
			return {
				//name:'',
				btnName: '提交',
				// phone: '',
				// idcard:'',
				fndata:[
					{cerficate:'中国居民身份证',state:true,type:1},
					{cerficate:'外国人永久居留身份证',state:false,type:2},
					{cerficate:'港澳台居民居住证',state:false,type:3}
				],
				
				type:0,
				gendata:[
					{woman:'女',img:'/static/img/linkman/woman.png',image:'/static/img/linkman/woman22.png',state:false},
					{woman:'男',img:'/static/img/linkman/man22.png',image:'/static/img/linkman/man.png',state:true}
				],
				isshow:0,
				travel:[
					{age_type:1},/* chengren */
					{age_type:2},/* laoren */
					{age_type:3},
					{age_type:4}
				],
				age_typecheck:'',
				cardtypecheck:'',
				datas:{
					name:'',
					phone:'',
					type:1,
					card:'',
					gender:0,
					age_type:1
				},
				tijiaotype:0
				
			};
		},
		onLoad(opction) {
			this.tijiaotype = opction.type;
		},
		methods:{
			fnbtn(index){
				this.type = index
				this.datas.gender = this.type;
			},
			isbtn(index,age_type){
				this.datas.age_type = age_type;
				this.isshow = index
			},
			inputCheckWarpClick(item,index){
				this.datas.type = item.type
				this.fndata.map((item,indexs)=>{
					if(indexs===index){
						this.fndata[indexs].state=true
					}else{
						this.fndata[indexs].state=false
					}
				})
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
		}
	}
</script>

<style lang="scss">
	.box{
		width: 100%;
		padding: 0 40rpx;
		padding-bottom: 140rpx;
		box-sizing: border-box;
	}
	.header{
		width: 100%;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.certificate{
		width: 100%;
		.inputCheckWarp_p{
			display: flex;
			justify-content: left;
			align-items: center;
			text{
				padding-left: 24rpx;
				font-size:28rpx;
				line-height: 100rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
		}
	}
	.cent{
		width: 100%;
		margin-top: 39rpx;
		margin-bottom: 101rpx;
		input{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
		}
	}
	.gender{
		width: 100%;
		display: flex;
		justify-content: left;
		margin-top: 30rpx;
		margin-bottom: 70rpx;
		.woman{
			width:140rpx;
			height:60rpx;
			border-radius:30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 30rpx;
			border:1px solid rgba(220,220,220,1);
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 4rpx;
			}
			text{
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:#999999;
			}
		}
		.wocolor{
			border:1rpx solid rgba(19,190,111,1);
			color:rgba(19,190,111,1);
		}
	}
</style>
