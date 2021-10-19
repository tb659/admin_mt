/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  redirect: '/message/material-management',
  name: 'Message',
  meta: {
    title: '信息发布',
    icon: 'table'
  },
  children: [
    {
      path: 'material-management',
      component: () => import('@/views/pro-message/material-management'),
      name: 'OfficeRoom',
      meta: { title: '素材管理' }
    },
    {
      path: 'multimedia-publish',
      component: () => import('@/views/pro-message/multimedia-publish'),
      name: 'MultimediaPublish',
      meta: { title: '多媒体发布' }
    },
    {
      path: 'notice-publish',
      component: () => import('@/views/pro-message/notice-publish'),
      name: 'NoticePublish',
      meta: { title: '通知发布' }
    },
    {
      path: 'terminal-management',
      component: () => import('@/views/pro-message/terminal-management'),
      name: 'MeetingComment',
      meta: { title: '终端管理' }
    },
    {
      path: 'template-management',
      component: () => import('@/views/pro-message/template-management'),
      name: 'TemplateManagement',
      meta: { title: '模板管理' }
    },
    {
      path: 'instruct-message',
      component: () => import('@/views/pro-message/instruct-message'),
      name: 'InstructMessage',
      meta: { title: '指令消息' }
    }
  ]
}
export default messageRouter
