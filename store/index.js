import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uerInfo: {},
		hasLogin: false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.uerInfo.token = provider.token
			uni.setStorageSync('uerInfo',provider) 
		},
		logout(state) {
			state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			});
		}
	}
})

export default store