<template>
  <section>123
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      {{ formList }}
      <el-form-item :label="form.label" :prop="form.prop" v-for="form in formList" :key="form.id">
        <!-- 输入框 -->
        <el-input v-if="form.type === 'input-text'" v-model="form.prop" :placeholder="form.placeholder"></el-input>

        <!-- 下拉框 -->
        <el-select v-else-if="form.type === 'select'" v-model="form.prop" :placeholder="form.placeholder">
          <el-option :label="option.label" :value="option.value" v-for="option in form.selectData" :key="option.label"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <!-- <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item> -->
      <!-- <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'FormList',
  data() {
    return {
      ruleForm: {},
      formList: []
    }
  },

  mounted() {
    console.log('form-list mounted')

    // 初始化表单数据
    this.formList = this.loadFormItems()
  },

  methods: {
    /**
     * @description: 查询条件提交
     * @param {*}
     * @return {*}
     */
    submitForm() {
      //
    },

    /**
     * @description: 重置查询条件
     * @param {*}
     * @return {*}
     */
    resetForm() {
      //
    }
  },
  watch: {
    formList(val) {
      console.log(val)
      // this.formList = val
      // this.formList.forEach(form => {
      //   this.ruleForm[form.prop] = ''
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>
