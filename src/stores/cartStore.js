// 封装购物车相关代码
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  // 1.定义数据state
  const cartList = ref([])
  // 2.定义方法action
  const addCart = (goods) => {
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

  // 删除购物车功能
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx, 1)
  }
  return {
    cartList,
    addCart,
    delCart
  }
}, {
  persist: true
})
