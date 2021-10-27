<!--
 * @Author: tb659
 * @Date: 2021-10-18 14:09:11
 * @LastEditors: tb659
 * @LastEditTime: 2021-10-27 18:10:20
 * @Description: 会议室管理
 * @FilePath: \admin_mt\src\views\pro-meeting\meeting-room-management-query.vue
-->
<script>
const formItems = [
  {
    label: '会议室',
    placeholder: '请选择会议室',
    prop: 'roomAddrCode',
    type: 'select',
    selectData: []
  },
  {
    label: '房间',
    placeholder: '请选择房间',
    prop: 'roomName',
    type: 'select',
    selectData: []
  },
  {
    label: '会议室状态',
    placeholder: '请选择会议室状态',
    prop: 'roomStatus',
    type: 'select',
    selectData: []
  }
]

import { getMeetingList, getUsageList } from './api-meeting-room-management'
import FormList from '@/components/FormList'
export default {
  name: 'MeetingRoomManagementQuery',
  extends: FormList,
  data() {
    return {}
  },

  mounted() {
    // 获取会议室列表
    this.getMeeting()
    // 获取房间列表
    this.getUsage()
    this.getStatus()
  },

  methods: {
    /**
     * @description: 获取会议室列表
     * @param {*}
     * @return {*}
     */
    async getMeeting() {
      const { data } = await getMeetingList({ groupCode: 'meeting.addr' })
      // console.log(data)
      this.$store.commit('common/SET_MEETING_LIST', data)
      data.forEach(form => {
        form.label = form.name
        form.value = form.code
      })
      formItems.forEach(form => {
        if (form.prop === 'roomAddrCode') {
          form.selectData = data
        }
      })
    },

    /**
     * @description: 获取房间列表
     * @param {*}
     * @return {*}
     */
    async getUsage() {
      const usageList = await getUsageList()
      // console.log(roomList.data.data)
      usageList.data.forEach(form => {
        form.label = form.roomName
        form.value = form.id
      })
      formItems.forEach(form => {
        if (form.prop === 'roomName') {
          form.selectData = usageList.data
        }
      })
    },

    /**
     * @description: 获取会议室状态
     * @param {*}
     * @return {*}
     */
    async getStatus() {
      formItems.forEach(form => {
        if (form.prop === 'roomStatus') {
          form.selectData = [
            {
              label: '启用',
              value: '1'
            },
            {
              label: '禁用',
              value: '0'
            }
          ]
        }
      })
    },

    /**
     * @description: 初始化表单
     * @param {*}
     * @return {*}
     */
    loadFormItems() {
      return formItems
    }
  }
}
</script>

<style lang="scss" scoped></style>
