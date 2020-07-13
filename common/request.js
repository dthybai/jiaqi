import urlConfig from './config.js'
import store from '../store'
const request = {}
const headers = {}
const PORT1 = '/baseinfo'
    
request.globalRequest = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
== 不通过access_token校验的接口
== 文件下载接口列表
== 验证码登录 */
    switch (power){
        case 1:
            headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
           // headers['Authorization'] = `Bearer ${
           //          this.$store.getters.userInfo
           	
           //      }`
		   //headers['Content-Type'] = 'application/json'
           // headers['Authentication'] = store.state.uerInfo.token
           let _token = uni.getStorageSync('uerInfo')||''; 
           headers['Authorization'] = _token;
           break;
    }
    if(method === 'POST') {
		
		headers['Content-Type'] = 'application/json'
		
		
	}
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers,
    }).then(res => {
		if (res[1].data.message) {
			uni.showToast({
	　　　　　　　title: res[1].data.message,
	　　　　　　　icon: 'none'
	　　　　　})
		}
		if (res[1].statusCode === 200) {
			if(res[1].data.code === 4001||res[1].data.code === 4000){
					console.log(res[1].statusCode)
					uni.clearStorageSync()
					uni.reLaunch({
					    url: '../login/login'
					});
					return

			}else{
				return res[1].data
			}
			
		}
		
    }).catch(parmas => {
	  console.log('parmas.codeparmas.codeparmas.code:',parmas)
　　　　　　switch (parmas.code) {
　　　　　　　　case 4000:
　　　　　　　　　　uni.clearStorageSync()
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: parmas.message,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}

　　})
 } 

export default request