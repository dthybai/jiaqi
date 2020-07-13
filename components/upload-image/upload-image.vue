<template>
  <view class="upload">
    <view class="list">
      <view class="item interval" v-for="(item,index) in imglist" :key="index">
        <image :src="item" v-if="item"></image>
        <view class="icon-close"@tap.stop="handleRemove(index)">
          <uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
        </view>
      </view>
      <view class="item"@tap="chooseImage" v-if="imglist.length<limit">
        <uni-icons background-color="#F8F8F8" type="image" size="40" color="#E1E1E1"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
	import imgRequest from '../../common/imgRequest.js'
  export default {
    props: {
      limit: {
        type: Number,
        default: 5
      },
      url: {
        type: String,
        required: true
      },
      fileList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
				imglist:this.fileList,
			}
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
					count: 3,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
          success: (res) => {
			   if (this.imglist.length != 0) {
			     this.imglist = this.imglist.concat(res.tempFilePaths)
				 this.$emit('onsuccess', this.imglist)
			    } else {
			      this.imglist = res.tempFilePaths
				  this.$emit('onsuccess', this.imglist)
			    } 
          }
        })
      },
      handleRemove(index) {
        this.$emit('on-remove', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload {
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8upx;
        margin-bottom: 20upx;
        width:210rpx;
        height:210rpx;
        background-color:rgba(248,248,248,1);
        border-radius:10rpx;
        &.interval {
          margin-right: 16upx;
          border: none;
        }
        image {
          width: 100%;
          height: 100%;
          border-radius: 8upx;
          margin: 0;
        }
        .icon-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 28upx;
          height: 28upx;
          background-color: #24a39b;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 8upx 0 0;
        }
        .icon {
          width: 48upx;
          height: 48upx;
        }
      }
    }
  }
</style>
