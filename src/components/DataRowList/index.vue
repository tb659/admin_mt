<template>
  <section style="overflow: auto;">
    <div style="width: 100%" v-if="showTitle">
      <span style="font-size: small; font-weight: bold; margin-right: 10px;">查询结果</span>
      <span style="font-size: small; color: gray;"
        >共查出<span style="color: black">{{ total }}</span
        >名会员</span
      >
    </div>

    <el-table
      ref="self"
      :data="rows"
      class="grid"
      :border="showBorder"
      :resizable="true"
      highlight-current-row
      @row-click="onClickRow"
      @row-dblclick="onDblClickRow"
      @selection-change="selsChange"
      :row-key="rowKey"
      :tree-props="treeProps"
    >
      <el-table-column v-if="showSelection()" type="selection" width="50" />

      <el-table-column
        v-for="col in uiConfigs"
        v-if="col.visible == '1'"
        :prop="col.field"
        :label="col.label"
        :min-width="col.width"
        :show-overflow-tooltip="!!col.tooltip"
        :formatter="formatter"
        :sortable="!!col.sortable"
      >
        <template v-if="!!col.children && col.children.length > 0">
          <el-table-column v-for="c1 in col.children" :prop="c1.field" :label="c1.label" :width="c1.width" :show-overflow-tooltip="!!c1.tooltip" :formatter="formatter" :sortable="!!c1.sortable">
          </el-table-column>
        </template>
        <template v-if="col.tag === 'img'" scope="scope">
          <img width="80" height="80" :src="scope.row[col.field] | getImgUrl" alt="" />
        </template>
      </el-table-column>

      <el-table-column v-if="rowFuncs.length > 0" prop="x" label="操作" :width="calcOperateColWidth">
        <template scope="scope">
          <div v-for="(func, idx) in rowFuncs" style="display: inline;">
            <el-button v-if="showRowFunc(scope.row, func)" type="text" @click="func.action(scope.row)">{{ func.label }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-col v-if="$props.pagination" :span="24" class="toolbar" style="padding-top: 10px;">
      <el-pagination
        background
        :current-page="pageNum"
        :page-sizes="pageSizeOptions"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-col>

    <div class="selection" v-if="showSelectionTags">
      已选择：
      <el-tag style="margin-left: 5px; margin-right: 5px; margin-top:2px; margin-bottom:2px;" closable @close="handleClose(idx)" v-for="(obj, idx) in allSels">
        {{ obj[labelKey] }}
      </el-tag>
    </div>
  </section>
</template>

<script>

  import defaultSettings from '@/settings'

export default {
  name: 'DataRowList',
  props: {
    header: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: true
    },
    operate: {
      type: Boolean,
      default: true
    },
    fixHeight: {
      type: Number,
      default: -1
    },
    wrapperHeight: {
      type: Number,    // 设置外部高度，内部计算高度
      default: 0
    },

    showSelsTag: {
      type: Boolean,
      default: false
    },
    objKey: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: ''
    }
  },
  data() {
    let data = {
      loading: false,
      showBorder: true,
      queryForm: {},
      total: 0,
      rows: [],
      pageNum: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50, 100],
      sels: [],
      allSels: [], //选择列表-跨页
      uiConfigs: [],
      rowFuncs: [],

      rowKey: 'id',
      treeProps: {
        children: 'children',
        hasChildren: 'hasChildren'
      },
      showTitle: false
    }
    if (!!this.$props.objKey) {
      data.rowKey = this.$props.objKey
    }
    return data
  },
  computed: {
    calcHeight() {
      if (this.$props.fixHeight > 0) {
        return this.$props.fixHeight
      } else if (this.$props.wrapperHeight >= 0) {
        let height = window.innerHeight - this.$props.wrapperHeight

        if (this.$props.pagination) {
          height -= defaultSettings.UI.pageToolBarH
        }

        console.log(' 计算表格高度：' + height)

        return height
      }
      return '100'
    },

    calcOperateColWidth() {
      if (this.rowFuncs.length > 0) {
        return 40 + this.rowFuncs.map(a => a.label).join('').length * 12 + (this.rowFuncs.length + 1) * 10
      }
      return 0
    },

    showSelectionTags() {
      return this.$props.showSelsTag && !!this.$props.objKey && !!this.$props.labelKey
    }
  },
  mounted() {
    console.log('data-row-list mounted')

    // if (this.$props.fixHeight > 0) {
    //   this.$el.querySelector(".el-table__empty-block").style.height = this.$props.fixHeight+'px';
    //   this.$el.querySelector(".el-table__body-wrapper").style.height = this.$props.fixHeight+'px';
    // }

    this.uiConfigs = this.loadTableCols()
    this.rowFuncs = this.loadRowFuncs()
  },
  methods: {
    showHeader() {
      return this.$props.header
    },
    showSelection() {
      return this.$props.selectable
    },
    showOperate() {
      return this.$props.operate && this.rowFuncs.length > 0
    },
    setPageSizeOptions(ops) {
      this.pageSizeOptions = ops
    },
    loadTableCols() {
      return []
    },
    setRowFuncs(funcs) {
      this.rowFuncs = funcs
    },
    loadRowFuncs() {
      return this.rowFuncs
    },
    showRowFunc(row, func) {
      return true
    },
    clear() {
      this.loading = true
      this.rows = []
      this.$nextTick(() => {
        this.loading = false
      })
    },
    getRows() {
      return this.rows
    },
    setRows(rows) {
      this.loading = true
      this.rows = rows
      this.$nextTick(() => {
        this.syncSelect()
        this.loading = false
      })
    },
    formatter(row, column, val) {
      return val
    },
    selsChange(sels) {
      // if (this.loading) {
      //   return;
      // }
      this.sels = sels

      if (this.showSelectionTags) {
        this.allSels = this.allSels.concat(sels)

        let listAllKeys = this.rows.map(a => a[this.$props.objKey])
        let selKeys = this.sels.map(a => a[this.$props.objKey])
        function pageSelect(id) {
          return listAllKeys.indexOf(id) > -1 && selKeys.indexOf(id) > -1
        }

        // 去重+选择
        let keys = []
        let temp = []
        let objId = this.$props.objKey
        this.allSels.forEach((obj, i) => {
          if (keys.indexOf(obj[objId]) == -1) {
            if (listAllKeys.indexOf(obj[objId]) > -1) {
              if (selKeys.indexOf(obj[objId]) > -1) {
                keys.push(obj[objId])
                temp.push(obj)
              }
            } else {
              // 不是当页，直接添加
              keys.push(obj[objId])
              temp.push(obj)
            }
          }
        })

        this.allSels = temp

        console.log('listAllKeys ' + JSON.stringify(listAllKeys))
        console.log('selKeys ' + JSON.stringify(selKeys))
        console.log('allSels ' + JSON.stringify(this.allSels))
      }
    },
    onDblClickRow(row) {
      this.$emit('dblclick-row', row)
    },
    onClickRow(row) {
      this.$emit('click-row', row)
    },
    getSels() {
      return this.sels
    },
    getAllSels() {
      return this.allSels
    },
    clearSelected() {
      this.sels = []
      this.allSels = []
      this.$refs.ref.clearSelection()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadData()
    },
    formatter(row, column, val) {
      return val
    },
    setData(data) {
      this.sels = []
      this.loading = true
      this.rows = data.rows
      this.total = data.total
      this.showTitle = data.showTitle

      this.$nextTick(() => {
        this.syncSelect()
        this.loading = false
      })
    },
    handleClose(idx) {
      let rmobj = this.allSels[idx]
      this.allSels.splice(idx, 1)

      let selIdx = this.sels.map(a => a[this.$props.objKey]).indexOf(rmobj[this.$props.objKey])
      if (selIdx > -1) {
        this.sels.splice(selIdx, 1)
      }

      this.$nextTick(() => {
        this.syncSelect()
      })
    },
    syncSelect() {
      if (!!this.$props.objKey) {
        let selectKeys = this.sels.map(a => a[this.$props.objKey])
        console.log('当前页选择 ' + JSON.stringify(selectKeys))
        selectKeys = selectKeys.concat(this.allSels.map(a => a[this.$props.objKey]))
        console.log('全部选择 ' + JSON.stringify(selectKeys))
        selectKeys = Array.from(new Set(selectKeys))
        console.log('去重选择 ' + JSON.stringify(selectKeys))

        console.log('all selectKeys ' + JSON.stringify(selectKeys))
        this.rows.forEach((row, idx) => {
          let key = row[this.$props.objKey]
          let selected = selectKeys.indexOf(key) > -1
          console.log('toggleRowSelection ' + JSON.stringify(row) + ' ' + key + ' ' + selected)
          this.$refs.self.toggleRowSelection(row, selected)
          this.$forceUpdate()
          this.rows = this.rows
        })

        console.log(this.$refs.self.toggleRowSelection)
      }
    }
  }
}
</script>

<style>
.el-table__empty-block {
  width: 100% !important;
}
</style>
