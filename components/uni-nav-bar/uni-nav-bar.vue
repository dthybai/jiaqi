<template>
	<view class="uni-navbar">
		<view :style="{ height: statusBarHeight,'background': '#ffffff'}" class="hx-status-bar" v-if="statusBar" ></view>
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
			<!-- <uni-status-bar v-if="statusBar" /> -->
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header uni-navbar__content_view">
				<view @tap="onClickLeft" class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view">
					<view class="uni-navbar__content_view" v-if="leftIcon.length">
						<uni-icons :color="color" :type="leftIcon" size="24" />
					</view>
					<view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" class="uni-navbar-btn-text uni-navbar__content_view"
					 v-if="leftText.length">
						<text :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length || titleData.length">
						<view v-if="titleData">
							<text v-for="(item, index) of titleData" :key="index" style="padding: 0 33rpx; font-size: 32rpx;" :style="{ color : titlIndex == index ? '#333333' : '#BBBBBB'}" @click="titleHandler(index)">
								{{item.title}}
							</text>
						</view>
						<text class="uni-nav-bar-text" :style="{color: color }" v-if="titleData.length === 0 && title">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__content_view">
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" size="24" />
					</view>
					<!-- 优先显示图标 -->
					<view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="uni-nav-bar-right-text">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
			</view>
		</view>
		<view class="uni-navbar__placeholder" v-if="fixed">
			<!-- <uni-status-bar v-if="statusBar" /> -->
			<view class="uni-navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight  + 'px';
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
	import uniIcons from "../uni-icons/uni-icons.vue";

	export default {
		name: "UniNavBar",
		components: {
			uniStatusBar,
			uniIcons
		},
		data () {
			return {
				statusBarHeight: statusBarHeight,
			}
		},
		props: {
			titlIndex: {
				type: Number,
				default: 0
			},
			titleData: {
				type: Array,
				default: () => []
			},
			title: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				// type: String,
				// default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: true
			},
			shadow: {
				type: [String, Boolean],
				default: false
			},
			border: {
				type: [String, Boolean],
				default: true
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			},
			titleHandler(index) {
				this.$emit("titleHandler",index);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.hx-status-bar {
		display: block;
		width: 100%;
		// height: 40px;
		height: var(--status-bar-height);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
	}
	$nav-height: 44px;
	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: $uni-font-size-lg;
		/* #endif */
	}
	.uni-nav-bar-right-text {
		font-size: $uni-font-size-base;
	}

	.uni-navbar {
		width: 750rpx;
		padding-top:var(--status-bar-height);
	}

	.uni-navbar__content {
		position: relative;
		width: 750rpx;
		background-color: $uni-bg-color;
		overflow: hidden;
	}

	.uni-navbar__content_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		// background-color: #FFFFFF;
	}

	.uni-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 750rpx;
		height: $nav-height;
		line-height: $nav-height;
		font-size: 16px;
		// background-color: #ffffff;
	}

	.uni-navbar__header-btns {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: nowrap;
		width: 120rpx;
		padding: 0 6px;
		justify-content: center;
		align-items: center;
	}

	.uni-navbar__header-btns-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		justify-content: flex-start;
		uni-image{
			margin-left: 10rpx;
		}
	}

	.uni-navbar__header-btns-right {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		padding-right: 30rpx;
		justify-content: flex-end;
	}

	.uni-navbar__header-container {
		flex: 1;
	}

	.uni-navbar__header-container-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}


	.uni-navbar__placeholder-view {
		height: $nav-height;
	}

	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
	}

	.uni-navbar--shadow {
		/* #ifndef APP-NVUE */
		box-shadow: 0 1px 6px #ccc;
		/* #endif */
	}

	.uni-navbar--border {
		// border-bottom-width: 1rpx;
		// border-bottom-style: solid;
		// border-bottom-color: $uni-border-color;
	}
</style>
