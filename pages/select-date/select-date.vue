<template>
	<view>
		<uni-nav-bar left-icon="" left-text="" fixed right-text=""  :border="false"  title="选择日期"@clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view>
		    <uni-calendar 
		    :insert="true"
		    :lunar="true" 
			:date="date"
		    :start-date="startDate"
		    :end-date="''"
		    @change="change"
		     ></uni-calendar>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		data() {
			return {
				// 当前日期
				date:this.getFormatDate(this.$route.query.data || new Date,'yyyy-mm-dd'),
				// 开始日期
				startDate: this.getFormatDate(new Date,'yyyy-mm-dd')
			};
		},
		components: {
			uniNavBar,
			uniCalendar
		},
		onLoad() {
		},
		methods: {
			getFormatDate(date, dateType) {
			    let dateObj = new Date(date);
			    let month = dateObj.getMonth() + 1;
			    let strDate = dateObj.getDate();
			    let hours = dateObj.getHours();
			    let minutes = dateObj.getMinutes();
			    let seconds = dateObj.getSeconds();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			
			    }
			    if (hours >= 0 && hours <= 9) {
			        hours = "0" + hours
			    }
			    if (minutes >= 0 && minutes <= 9) {
			        minutes = "0" + minutes
			    }
			    if (seconds >= 0 && seconds <= 9) {
			        seconds = "0" + seconds
			    }
			
			    let dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日';
			    if (dateType == "yyyy-mm-dd") {
			        dateText = dateObj.getFullYear() + '-' + month + '-' + strDate;
			    }
			    if (dateType == "yyyy.mm.dd") {
			        dateText = dateObj.getFullYear() + '.' + month + '.' + strDate;
			    }
			    if (dateType == "yyyy-mm-dd MM:mm:ss") {
			        dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    if (dateType == "mm-dd MM:mm:ss") {
			        dateText = month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
			        dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    return dateText;
			 },
			// 返回事件
			clickLeft () {
				this.$emit('selectDateHandler')
			},
			change(e) {
				this.$emit('selectDateHandler',e.fulldate)
				console.log(e.fulldate);
			}
		}
	}
</script>

<style lang="scss">

</style>
