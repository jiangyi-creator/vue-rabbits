// 封装登录后购物车相关接口
import request from '@/utils/http'

// 加入购物车接口
export const insertCartAPI = ({skuId, count}) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新购物车列表接口
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart'
  })
}

// 接口购物车删除
export const delCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
