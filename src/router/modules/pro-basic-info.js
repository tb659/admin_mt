/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const basicInfoRouter = {
  path: '/basic-info',
  component: Layout,
  redirect: '/basic-info/enterprise-management',
  name: 'BasicInfo',
  meta: {
    title: '基础信息管理',
    icon: 'table'
  },
  children: [
    {
      path: 'enterprise-management',
      component: () => import('@/views/pro-basic-info/enterprise-management'),
      name: 'OfficeRoom',
      meta: { title: '企业管理' }
    },
    {
      path: 'staff-menagement',
      component: () => import('@/views/pro-basic-info/staff-menagement'),
      name: 'StaffMenagement',
      meta: { title: '员工管理' }
    },
    {
      path: 'department-menagement',
      component: () => import('@/views/pro-basic-info/department-menagement'),
      name: 'DepartmentMenagement',
      meta: { title: '部门管理' }
    },
    {
      path: 'role-management',
      component: () => import('@/views/pro-basic-info/role-management'),
      name: 'RoleMenagement',
      meta: { title: '角色管理' }
    },
    {
      path: 'resource-management',
      component: () => import('@/views/pro-basic-info/resource-management'),
      name: 'ResourceMenagement',
      meta: { title: '资源管理' }
    },
    {
      path: 'system-configuration',
      component: () => import('@/views/pro-basic-info/system-configuration'),
      name: 'SystemConfiguration',
      meta: { title: '系统配置' }
    },
    {
      path: 'user-group',
      component: () => import('@/views/pro-basic-info/user-group'),
      name: 'UserGroup',
      meta: { title: '用户组' }
    }
  ]
}
export default basicInfoRouter
