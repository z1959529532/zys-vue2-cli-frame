import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
  },
  getters: {
  },
  mutations: {
    setUsername(state, username){
      state.username = username;
    }
  },
  actions: {
    // async validate({commit}) {
    //   // 调用userValidate时，会将
    //   const res = await userValidate();
    //   if (res.code === 1) { // 此时用户校验失败
    //     return Promise.reject(res);
    //   }
    //   // 如果校验成功，重新保存token和username
    //   localStorage.setItem('token', res.token);
    //   commit('setUsername', res.username);
    // }
  },
  modules: {
  }
})
