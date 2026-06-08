// 封装所有和用户登录相关的接口函数

import request from '@/utils/http'

export function loginAPI({account, password}) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

// 会员中心中猜你喜欢接口
export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url:'/goods/relevant',
    params: {
      limit
    }
  })
}
