<script>
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// 	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		// 	    WeixinJSBridge.call('hideOptionMenu');
		// 	});
		// },
		 onLaunch: function () {  
            let accessToken = uni.getStorageSync('uerInfo');
            
            if(accessToken){
            
            uni.switchTab({
            
            url: '/pages/home/home',
            
            success: res => {},
            
            fail: () => {},
            
            complete: () => {}
            
            });
            
            }
        },
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.uni-page-head-search-placeholder:before{
		width: 30rpx !important;
		height: 30rpx !important;
		top: 14rpx !important;
		left: 22rpx !important;
		content: '' !important;
		background: url(static/img/icon/sousuo.png) no-repeat center center !important;
		background-size: contain !important;
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	/* @font-face {
		font-family: "customFont";   
		src: url("static/iconfont.ttf");  
	} */
	/* .uni-page-head-search-placeholder:before{ 
		content: " "!important;
		font-size: 30rpx!important;
		background: url("/static/img/zhifubao.png") no-repeat !important;
		background-size: 20px 20px !important;
		background-position: center center;  
		top: 4px;
	} */
	/*每个页面公共css */
	uni-page-wrapper{
	}
	/* .uni-padding-wrap{
		 margin-top: 60rpx;
	} */
	.uni-padding-wrap uni-swiper .uni-swiper-dots-horizontal{
		bottom: 136rpx;
		left: 89%;
	}
	.uni-padding-wrap uni-swiper .uni-swiper-dot{
		width: 10rpx;
		height: 10rpx;
		background-color: #fff;
	}
	.uni-padding-wrap uni-swiper .uni-swiper-dot.uni-swiper-dot-active{
		width: 30rpx;
		border-radius: 10rpx;
		height: 10rpx;
		background-color: #fff;
	}
	.page-gray{
		background-color: rgba(249,249,249,1);
		min-height: 100vh;
		box-sizing: border-box;
		/* padding-top: 88rpx; */
	}
	.status_bar {
		/* height: var(--status-bar-height);
		width: 100%;
		background-color: #fff; */
	}
	.boxs{
		box-sizing: border-box;
	}
	.linear-gradient-color{
		width: 100%;
		min-height: 600rpx;
		background:linear-gradient(180deg,rgba(19,190,111,1) 0%,rgba(19,190,111,0) 600rpx);
	}
	.uni-page-head-transparent .uni-page-head-btn{
		width: 59px!important;
	}
	 
</style>
