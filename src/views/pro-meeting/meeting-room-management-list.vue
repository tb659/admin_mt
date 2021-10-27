<!--
 * @Author: tb659
 * @Date: 2021-10-18 14:09:11
 * @LastEditors: tb659
 * @LastEditTime: 2021-10-27 10:12:29
 * @Description: 会议室管理
 * @FilePath: \admin_mt\src\views\pro-meeting\meeting-room-management-list.vue
-->
<script>
import DataRowList from '@/components/DataRowList'
import { getRoomList } from './api-meeting-room-management'
import defaultSettings from '@/settings'
import { mapState } from 'vuex'

const tableFields = [
  {
    label: '会议室名称',
    val: 'roomName'
  },
  {
    label: '会议室图片',
    val: 'roomImage',
    tag: 'img'
  },
  {
    label: '会议室管理员',
    val: 'adminSureName'
  },
  {
    label: '会议室分类',
    val: 'roomAddr',
    sortable: 1
  },
  {
    label: '最多可容纳人数',
    val: 'capacity',
    sortable: 1
  },
  {
    label: '设备设施',
    val: 'roomDevice',
    sortable: 1
  },
  {
    label: '会议室备注',
    val: 'roomMemo',
    sortable: 1
  },
  {
    label: '地点楼层',
    val: 'floor',
    sortable: 1
  },
  {
    label: '会议室状态',
    val: 'roomStatus'
  }
]

export default {
  name: 'MeetingRoomManagementList',
  extends: DataRowList,
  data() {
    return {
      queryForm: {}
    }
  },

  mounted() {},

  methods: {
    loadTableCols() {
      let showCols = tableFields.map(row => {
        return {
          field: row.val,
          label: row.label,
          tooltip: 1,
          visible: 1,
          sortable: row.sortable,
          tag: row.tag
        }
      })

      // console.log('' + this.$refs.self.$el.clientWidth)
      //
      // showCols[showCols.length - 1].width = this.$refs.self.$el.clientWidth
      //   - showCols.filter((a,i) => i!=showCols.length-1)
      //     .map(a=>a.width)
      //     .reduce((a,b)=>a+b, 0);

      return showCols
    },

    loadRowFuncs() {
      return [
        {
          label: '修改',
          action: this.edit
        },
        {
          label: '删除',
          action: this.delete,
          type: 'danger'
        }
      ]
    },

    formatter(row, column, val) {
      // console.log(row, column, val)
      if (column.property === 'roomStatus') {
        return val === 1 ? '启用' : '禁用'
      }
      return val
    },

    loadData(queryForm) {
      if (queryForm) {
        this.queryForm = queryForm
      }
      this.queryForm.page = this.pageNum
      this.queryForm.size = this.pageSize
      getRoomList(this.queryForm).then(ret => {
        this.rows = ret.data.data
        this.total = ret.data.total
      })
    },

    edit(data) {
      console.log(data)
    },

    delete(data) {
      console.log(data)
    },
  },

  computed: {
    ...mapState({
      meetingList: state => state['common'].meetingList
    })
  }
}
</script>

<style lang="scss" scoped></style>
