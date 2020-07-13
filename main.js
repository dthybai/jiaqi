import Vue from 'vue'
import App from './App'
import store from './store'  // 与vue项目中配置相同，可自行配置

Vue.config.productionTip = false
import request from './common/request.js'
import api from './api/index.js'
import url from './common/config.js'
import icons from './components/uni-icons/icons.js'
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$store = store 
//站位图片地址
Vue.prototype.$img = "https://myreact-1300410218.cos.ap-beijing.myqcloud.com/menulist/React.png"; 
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
