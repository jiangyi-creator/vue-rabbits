import request from '@/utils/http'

export const getDetailsAPI = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}
