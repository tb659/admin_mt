/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const meetingRouter = {
  path: '/meeting',
  component: Layout,
  redirect: '/meeting/meeting-room-management',
  name: 'Meeting',
  meta: {
    title: '会议管理',
    icon: 'table'
  },
  children: [
    {
      path: 'meeting-room-management',
      component: () => import('@/views/pro-meeting/meeting-room-management'),
      name: 'OfficeRoom',
      meta: { title: '会议室管理' }
    },
    {
      path: 'meeting-book',
      component: () => import('@/views/pro-meeting/meeting-book'),
      name: 'MeetingBook',
      meta: { title: '会议预订' }
    },
    {
      path: 'meeting-summary',
      component: () => import('@/views/pro-meeting/meeting-summary'),
      name: 'MeetingSummary',
      meta: { title: '会议纪要' }
    },
    {
      path: 'meeting-comment',
      component: () => import('@/views/pro-meeting/meeting-comment'),
      name: 'MeetingComment',
      meta: { title: '会议评论' }
    },
    {
      path: 'meeting-sign-in',
      component: () => import('@/views/pro-meeting/meeting-sign-in'),
      name: 'MeetingSignIn',
      meta: { title: '会议签到' }
    },
    {
      path: 'push-message',
      component: () => import('@/views/pro-meeting/push-message'),
      name: 'pushMessage',
      meta: { title: '推送消息' }
    }
  ]
}
export default meetingRouter
