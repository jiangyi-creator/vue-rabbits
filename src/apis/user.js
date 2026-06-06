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
