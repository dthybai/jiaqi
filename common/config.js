let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://songsongs.wgkeep.vip/'
	url_config = 'https://beijing.togy.com.cn/'
}else{
    // 生产环境
    // url_config = 'http://songsongs.wgkeep.vip/'
	url_config = 'https://beijing.togy.com.cn/'
}

export default url_config