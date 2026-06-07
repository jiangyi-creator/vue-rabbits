// 管理用户数据相关
import { loginAPI } from '@/apis/user';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  // 1.管理用户数据state
  const userInfo = ref({})
  // 2.定义获取接口数据的action函数
  const getUserInfo = async ({account, password}) => {
    const res = await loginAPI({account, password})
    userInfo.value = res.result
  }

  // 4.退出登录清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }

  // 3.以对象形式return 出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
