<template>
  <div class="drawer-container">
    <div>
      <!-- <h3 class="drawer-title">Page style setting</h3> -->
      <h3 class="drawer-title">页面样式设置</h3>

      <div class="drawer-item">
        <!-- <span>Theme Color</span> -->
        <span>页面布局</span>
        <div class="page-layout">
          <el-radio v-model="pageLayout" label="topLeftRight">上左右</el-radio>
          <el-radio v-model="pageLayout" label="leftRight">左右</el-radio>
        </div>
      </div>

      <div class="drawer-item">
        <!-- <span>Theme Color</span> -->
        <span>主题色</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <!-- <span>Open Tags-View</span> -->
        <span>开启tag标签</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item" v-if="pageLayout === 'leftRight'">
        <!-- <span>Fixed Header</span> -->
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <!-- <span>Sidebar Logo</span> -->
        <span>侧边Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ThemePicker },
  data() {
    return {}
  },
  computed: {
    pageLayout: {
      get() {
        return this.$store.state.settings.pageLayout
      },
      set(val) {
        if (val === 'topLeftRight') {
          this.$store.dispatch('settings/changeSetting', {
            key: 'fixedHeader',
            value: false
          })
        }
        this.$store.dispatch('settings/changeSetting', {
          key: 'pageLayout',
          value: val
        })
      }
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
.page-layout {
  float: right;
  .el-radio {
    margin-left: 10px;
    margin-right: 0px;
  }
}
</style>
