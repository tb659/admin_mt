<template>
  <section class="form-container" ref="form">
    <el-form inline :model="ruleForm" ref="ruleForm" label-width="90px" class="demo-ruleForm">
      <el-form-item :label="form.label" :prop="form.prop" v-for="form in formList" :key="form.id">
        <!-- 输入框 -->
        <el-input v-if="form.type === 'input-text'" v-model="form.prop" :placeholder="form.placeholder"></el-input>

        <!-- 下拉框 -->
        <el-select v-else-if="form.type === 'select'" v-model="ruleForm[form.prop]" :placeholder="form.placeholder" clearable>
          <el-option :label="option.label" :value="option.value" v-for="option in form.selectData" :key="option.label"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="submitForm(ruleForm)">搜索</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button icon="el-icon-plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'FormList',
  props: {
    submitForm: {
      type: Function,
      default: () => () => {}
    },
    add: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      ruleForm: {},
      formList: []
    }
  },

  mounted() {
    // console.log('form-list mounted')

    this.formList = this.loadFormItems()
    this.formList.forEach(form => {
      this.$set(this.ruleForm, form.prop, '')
    })
    // console.log(this.$refs.form.clientHeight)
    this.$store.commit('common/SET_FORM_HEIGHT', this.$refs.form.clientHeight)
  },

  methods: {
    /**
     * @description: 初始化表单数据
     * @param {*}
     * @return {*}
     */
    loadFormItems() {
      return []
    },

    /**
     * @description: 重置查询条件
     * @param {*}
     * @return {*}
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {}
}
</script>

<style lang="scss">
.form-container {
  padding: 10px;

  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
