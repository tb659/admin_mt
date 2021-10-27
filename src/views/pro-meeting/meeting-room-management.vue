<template>
  <div>
    <query :submitForm="submitForm" :add="add" ref="query" />
    <list ref="dataList" :showSelsTag="true" objKey="roomName" labelKey="roomName" :selectable="false" />
  </div>
</template>

<script>
import Query from './meeting-room-management-query'
import List from './meeting-room-management-list'
export default {
  name: 'MeetingRoomManagement',
  components: {
    Query,
    List
  },
  data() {
    return {
      ruleForm: {}
    }
  },

  mounted() {
    this.loadData()
  },

  methods: {
    /**
     * @description: 调用列表组建的加载数据
     * @param {*}
     * @return {*}
     */
    loadData() {
      this.$refs.dataList.loadData(this.queryForm)
    },

    /**
     * @description: 查询条件提交
     * @param {*}
     * @return {*}
     */
    submitForm(form) {
      console.log(form)
      this.ruleForm = form
    },
    /**
     * @description: 添加
     * @param {*}
     * @return {*}
     */
    add() {
      this.$message.warning('添加')
    }
  }
}
</script>

<style lang="scss" scoped></style>
