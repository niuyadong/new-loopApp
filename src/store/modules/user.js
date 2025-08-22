import { defineStore } from 'pinia';
import request from '../../utils/request';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    // 登录
    async login(loginData) {
      try {
        const res = await request.post('/user/login', loginData);
        const { token, userInfo } = res;
        
        // 保存token和用户信息
        this.token = token;
        this.userInfo = userInfo;
        
        // 持久化存储
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        return res;
      } catch (error) {
        throw error;
      }
    },
    // 退出登录
    logout() {
      this.token = '';
      this.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  }
})