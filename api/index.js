import request from '@/common/request.js'
const api = {}
// 登录接口
api.login = params => request.globalRequest(`api/common/plogin`, 'POST', params, 1);
//微信登录接口
api.weixinlogin = params => request.globalRequest(`api/common/wxCodeLogin`, 'POST', params, 1);
//支付宝拉起接口
api.zhifubaologin = params => request.globalRequest(`api/common/aliAuthInfo`, 'GET', params, 4);
//支付宝登录接口 api/common/aliLogin
api.aliLogin = params => request.globalRequest(`api/common/aliLogin`, 'POST', params, 1); 
//苹果登录
api.appleLogin = params => request.globalRequest(`api/common/appleLogin`, 'POST', params, 1);
//支付
api.pay = params => request.globalRequest(`api/shop/order/pay`, 'POST', params, 4);
//获取验证码
api.GetVerification = params => request.globalRequest(`api/common/sms`, 'POST', params, 1);
//忘记密码
api.ForgetPassword = params => request.globalRequest(`api/common/forgetPwd`, 'POST', params, 1);
//用户注册
api.register = params => request.globalRequest(`api/common/register`, 'POST', params, 1);
//用户注册中得用户协议
api.agreement = params => request.globalRequest(`api/common/agreement`, 'GET', params, 1);
//api.tvExMonitoring = params => request.globalRequest(`business/tv-ex-monitoring/1000?`, 'GET', params, 1);
//获取首页
api.getindex =params => request.globalRequest(`api/shop/index/index`, 'GET' , params, 4)
//获取热门搜索
api.hotkeyword =params => request.globalRequest(`api/shop/cate/hotkeyword`, 'GET' , params, 4)
//获取分类下得视频
api.videoslist =params => request.globalRequest(`api/shop/cate/videoslist`, 'GET' , params, 4)
//搜索获取视频列表
api.videolist =params => request.globalRequest(`api/shop/videos/list`, 'GET' , params, 4)
//搜索获取门票列表
api.goodslist =params => request.globalRequest(`api/shop/goods/list`, 'GET' , params, 4)
//获取视频详情
api.videodetails =params => request.globalRequest(`api/shop/videos/detail`, 'GET' , params, 4)
//获取视频评论列表
api.videoinfolist =params => request.globalRequest(`api/shop/comment/info`, 'GET' , params, 4)
//视频评论
api.videoinfos =params => request.globalRequest(`api/shop/comment/info`, 'POST' , params, 4)
//视频订单确认
api.videoorderconfim =params => request.globalRequest(`api/shop/order/confim`, 'POST' , params, 4)
// 购买视频/文化币充值-下单
api.orderconfim =params => request.globalRequest(`api/shop/order/info`, 'POST' , params, 4)
//选择门票
api.ticketdetails = params => request.globalRequest(`api/shop/goods/detail`, 'GET', params, 4)
//选择门票日期查询
api.ticketdata = params => request.globalRequest(`api/shop/goods/time`, 'GET', params, 4)
//选择持票人
api.addresscontact = params => request.globalRequest(`api/shop/address/contact`, 'GET', params, 4)
//获取门票详情中的车辆列表
api.carslist= params => request.globalRequest(`api/shop/cars/info`, 'GET', params, 4)
//联票座位信息
api.carsdetail= params => request.globalRequest(`api/shop/cars/detail`, 'GET', params, 4)
//获取常用联系人列表
api.addressinfo = params => request.globalRequest(`api/shop/address/info`, 'GET', params, 4)
//删除联系人
api.deladdressinfo = params => request.globalRequest(`api/shop/address/info`, 'DELETE', params, 4)
//新增联系人
api.addinfo = params => request.globalRequest(`api/shop/address/info`, 'POST', params, 4)
//点踩视频
api.idea = params => request.globalRequest(`api/shop/comment/idea`, 'POST', params, 4)
//获取浏览视频门票列表
api.historylist = params => request.globalRequest(`api/shop/history/list`, 'GET', params, 4)
//删除我的浏览历史
api.historydelete = params => request.globalRequest(`api/shop/history/info`, 'DELETE', params, 4)
//获取我的收藏视频门票列表
api.collectlist = params => request.globalRequest(`api/shop/collect/info`, 'GET', params, 4)
//添加取消收藏
api.collectinfo = params => request.globalRequest(`api/shop/collect/info`, 'PUT', params, 4)
//取消duoge收藏
api.collectmanyinfo = params => request.globalRequest(`api/shop/collect/manyinfo`, 'PUT', params, 4)
//获取我的信息 
api.userinfo = params => request.globalRequest(`api/user/info`, 'GET', params, 4)
//文件上传 
api.upload = params => request.globalRequest(`api/common/upload`, 'POST', params, 4)
//修改信息
api.updatinfo = params => request.globalRequest(`api/user/info`, 'PUT', params, 4)
//修改手机号
api.updatephone = params => request.globalRequest(`api/user/phone`, 'PUT', params, 4)
//修改支付密码
api.updatepaypwd = params => request.globalRequest(`api/user/pwd`, 'PUT', params, 4)
//设置支付密码
api.setpaypwd = params => request.globalRequest(`api/user/paypwd`, 'POST', params, 4)
//获取明细
api.accountlist = params => request.globalRequest(`api/shop/account/list`, 'GET', params, 4)
//获取我的账户
api.accountinfo = params => request.globalRequest(`api/shop/account/info`, 'GET', params, 4)
//获取我的门票列表
api.usergoods = params => request.globalRequest(`api/user/goods`, 'GET', params, 4)
//获取我的视频列表
api.uservideos = params => request.globalRequest(`api/user/videos`, 'GET', params, 4)
//播放量
api.videosNum = params => request.globalRequest(`api/shop/videos/play`, 'GET', params, 4)
//获取我的评论
api.evaluation = params => request.globalRequest(`api/user/evaluation`, 'GET', params, 4)
//删除我的评论 
api.delevaluation = params => request.globalRequest(`api/shop/comment/Info`, 'DELETE', params, 4)
//联系我们
api.aboutours = params => request.globalRequest(`api/shop/index/about`, 'GET', params, 4)
//获取我得视频门票订单
api.orderinfolist = params => request.globalRequest(`api/shop/order/info`, 'GET', params, 4)
//取消订单
api.orderCancel = params => request.globalRequest(`api/shop/order/Cancel`, 'PUT', params, 4)
//获取订单详情
api.orderdetail = params => request.globalRequest(`api/shop/order/detail`, 'GET', params, 4)
//获取个人中心广告图
api.centerAdv = params => request.globalRequest(`api/common/centerAdv`, 'GET', params, 4)
// 购买视频/文化币充值-下单
api.orderinfo = params => request.globalRequest(`api/shop/order/info`, 'POST', params, 4)
//获取问题分类信息
api.opinioncate = params => request.globalRequest(`api/shop/opinion/cate`, 'GET', params, 4)
//帮助反馈获取常见问题列表
api.opinionlist = params => request.globalRequest(`/api/shop/opinion/info`, 'GET', params, 4)
//上传反馈
api.opinionupload = params => request.globalRequest(`api/shop/opinion/info`, 'POST', params, 4)
//申请售后列表
api.orderRefundList = params => request.globalRequest(`api/shop/orderRefund/apply`, 'GET', params, 4)
//获取售后详情
api.orderRefundDetail = params => request.globalRequest(`api/shop/orderRefund/detail`, 'GET', params, 4)
//售后列表
api.orderRefundInfo = params => request.globalRequest(`api/shop/orderRefund/Info`, 'GET', params, 4)
//上传售后
api.orderRefund = params => request.globalRequest(`/api/shop/orderRefund/apply`, 'POST', params, 4)



// // 首页-获取 tabs
// api.gettype = params => request.globalRequest(`admin/type/gettype`, 'GET', params, 1);
// // 首页-获取商户信息
// api.getAduse =params => request.globalRequest(`admin/type/getAduse`, 'GET' , params, 1);
// // 首页-获取商品列表
// api.getGoods =params => request.globalRequest(`admin/type/getGoods`, 'GET' , params, 1);
// // 首页-获取轮播图
// api.getBanner =params => request.globalRequest(`admin/type/getBanner`, 'GET' , params, 1);

// // 个人中心-获取用户个人信息
// api.getUserInfo =params => request.globalRequest(`admin/type/getUserInfo`, 'GET' , params, 1);

// // 投诉建议-获取商户信息和投诉类型
// api.complain =params => request.globalRequest(`admin/type/complain`, 'GET' , params, 1);
// // 投诉建议-提交投诉
// api.addcompl =params => request.globalRequest(`admin/type/addcompl`, 'POST' , params, 1);

// // 获取商品详情
// api.getGoodsinfo =params => request.globalRequest(`admin/type/getGoodsinfo`, 'GET' , params, 1);
// // 幸运免单
// api.fortune =params => request.globalRequest(`admin/type/fortune`, 'POST' , params, 1);

// // 用户条款
// api.seruser =params => request.globalRequest(`admin/type/seruser`, 'GET' , params, 1);

// // 一元抢购 获取数据
// api.sunp =params => request.globalRequest(`admin/type/sunp`, 'GET' , params, 1);
// // 一元抢购 上传数组
// api.enyj =params => request.globalRequest(`admin/type/enyj`, 'POST' , params, 1);

// // 一元抢购 抽奖
// api.drawfaff =params => request.globalRequest(`admin/type/drawfaff`, 'POST' , params, 1);

// // 幸运免单-抽奖
// api.gogive =params => request.globalRequest(`admin/type/gogive`, 'POST' , params, 1);

// // 我的订单  admin/type/getOrder （1 普通红包 2 中奖红包 3未中奖红包
// api.getOrder =params => request.globalRequest(`admin/type/getOrder`, 'GET' , params, 1);

export default api