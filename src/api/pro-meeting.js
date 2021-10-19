import request from '@/utils/request'

export function getMeetingList(query) {
  return request({
    url: '/vue-element-admin/pro-meeting/meeting-list',
    method: 'get',
    params: query
  })
}

// export function getMeetingList(data) {
//   return request({
//     url: '/vue-element-admin/pro-meeting/meeting-list',
//     method: 'post',
//     data
//   })
// }