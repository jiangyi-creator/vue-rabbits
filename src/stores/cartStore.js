// 封装购物车相关代码
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1.定义数据state
  const cartList = ref([])
  // 获取罪行购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  // 2.定义方法action
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if(isLogin.value) {
      // 登录后执行接口购物车操作
      await insertCartAPI({skuId, count})
      updateNewList()
    } else {
      // 添加到购物车
      // 已添加 count + 1
      // 未添加 直接push
      // 思路：通过传递过来的商品参数看能否找到与cartList匹配的skuId
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if(item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车功能
  const delCart = async (skuId) => {
    if(isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  // 退出登录清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选框功能实现
  // 通过skuId找到要修改的那一项，把它的selected修改为传过来的selected
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 复选框功能 大框控制小框选中状态
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 总数
  const allCount = computed(() => cartList.value.reduce((a, c)=> a + c.count, 0))
  // 总价
  const allPrice = computed(() =>cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 已选中商品数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c)=> a + c.count, 0))

  // 已选中商品价格
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c)=> a + c.count * c.price, 0))

  // 是否全选  小框控制大框 小框全选中大框才选中
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    updateNewList,
    clearCart,
    addCart,
    delCart,
    singleCheck,
    allCheck,
  }
}, {
  persist: true
})
