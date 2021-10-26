import request from '@/utils/request'

export function getMeetingList(data) {
  return request({
    url: 'api/sys/config/queryByGroup',
    method: 'post',
    data
  })
}

export function getUsageList(query) {
  return request({
    url: 'api/home/room/usage',
    method: 'get',
    query
  })
}

export function getRoomList(data) {
  return request({
    url: 'api/room/query',
    method: 'post',
    data
  })
}