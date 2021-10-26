import { Message } from 'element-ui'
import moment from './moment'
import settings from '@/settings'

// 请求url
const baseURL = settings.baseUrl

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  return !str || str === 'undefined' || str === 'null' ? '' : str
}

// 首字母大写
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 横线- 转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

// 数字字符串
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

/**
 * @description: 日期格式化
 * @param {*} time 时间
 * @param {string} fmt 格式
 * @return {string}
 */
export function formatDate(time = new Date(), fmt = 'YYYY-MM-DD') {
  return moment(time).format(fmt)
}
/**
 * @description: 指定日期前/后几天
 * @param {*} date 指定日期
 * @param {number} day 距离当前几天
 * @return {string}
 */
export function getNextDate(date, day) {
  var dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return y + '-' + m + '-' + d
}

/**
 * @description: 获取日期格式对象
 * @param {string} strDate 字符串日期
 * @return {string}
 */
export function getObjDate(strDate) {
  var date = eval(
    'new Date(' +
      strDate
        .replace(/\d+(?=-[^-]+$)/, function(a) {
          return parseInt(a, 10) - 1
        })
        .match(/\d+/g) +
      ')'
  )
  return date
}

/**
 * @description: 返回周几
 * @param {*} date 日期
 * @return {string}
 */
export function getWeek(date) {
  let week = moment(date).day()
  switch (week) {
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    case 0:
      return '周日'
  }
}

/**
 * @description: 相对时间
 * @param {*} time 时间
 * @return {string}
 */
export function fromNow(time = new Date()) {
  let result = null
  let oldTime = new Date(time).getTime()
  let mistiming = Math.round(new Date()) - oldTime
  let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 6; i >= 0; i--) {
    let inm = Math.floor(mistiming / 1000 / arrn[i])
    if (inm != 0) {
      result = inm + arrr[i] + '前'
    }
  }
  return result
}

/**
 * @description: 表单重置
 * @param {string} refName ref名称
 * @return {*}
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 * @description: 添加日期范围
 * @param {object} params 传参对象
 * @param {array} dateRange 日期范围
 * @param {string} fmt 格式化方式
 * @param {array} propName  日期字段
 * @return {object}
 */
export function addDateRange(params, dateRange, fmt = 'YYYY-MM-DD', propName) {
  if (dateRange !== null && dateRange !== '' && Array.isArray(dateRange) && dateRange.length) {
    if (typeof propName === 'undefined') {
      params.startDate = moment(dateRange[0]).format(fmt)
      params.endDate = moment(dateRange[1]).format(fmt)
    } else {
      params[propName[0]] = moment(dateRange[0]).format(fmt)
      params[propName[1]] = moment(dateRange[1]).format(fmt)
    }
  }
  return params
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data = [], id = id, parentId = 'parentId', children = children, rootId) {
  rootId =
    rootId ||
    Math.min.apply(
      Math,
      data.map(item => {
        return item[parentId]
      })
    ) ||
    0
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 && (father.children = branchArr)
    //返回第一层
    return father[parentId] === rootId
  })
  // 排序
  treeData
    .sort((a, b) => {
      return Number(a.code) - Number(b.code)
    })
    .forEach(m => {
      if (m.children && m.children.length) {
        m.children.sort((c, d) => {
          return Number(c.code) - Number(d.code)
        })
      }
    })
  return treeData !== '' ? treeData : data
}

/**
 * @description: 检查元素是否有class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @description: 元素添加class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @description: 元素删除class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @description: 元素切换class
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += ' ' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @description: 获取dom样式
 * @param {*} obj
 * @param {*} attr
 * @return {*}
 */
export function getStyle(obj, attr) {
  if (obj.currentStyle) {
    //兼容IE
    return obj.currentStyle[attr]
  } else {
    return getComputedStyle(obj, false)[attr]
  }
}

/**
 * @description: 价格保留小数位
 * @param {sring/number} price 价格
 * @param {number} n 保留几位小数
 * @return {*}
 */
export function priceCecimal(price, n = 2) {
  if (price) {
    price = Number(price)
    return price.toFixed(n)
  } else {
    var zero = 0
    return zero.toFixed(n)
  }
}

/**
 * @description: 数字转人民币格式
 * @param {*} num 价格
 * @return {*}
 */
export function numberToMoney(num) {
  let integer = (num + '').split('.')[0] //转成字符串后的整数
  let decimal = (num + '').split('.')[1] //转成字符串后的小数数
  decimal = decimal ? '.' + decimal : ''
  let a = integer.length % 3 //模3取余
  let result = '' //最终结果
  a = a == 0 ? 0 : a == 1 ? 2 : 1 //判断添加0的个数
  for (let i = 0; i < a; i++) {
    integer = '0' + integer
  }
  for (let i = 1; i <= integer.length; i++) {
    result += integer[i - 1]
    if (i % 3 == 0 && i != integer.length) {
      result += ','
    }
  }
  return (result = result.slice(a) + decimal)
}

/**
 * @description: 金额中文大写
 * @param {*} price
 * @return {*}
 */
export function chineseDigital(price) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(price)) return '数据非法'
  let unit = '千百拾亿千百拾万千百拾元角分'
  let str = ''
  parseFloat(price) < 0 && (str = '负')
  price += '00'
  var p = price.indexOf('.')
  if (p >= 0) price = price.substring(0, p) + price.substr(p + 1, 2)
  unit = unit.substr(unit.length - n.length)
  for (var i = 0; i < price.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(price.charAt(i)) + unit.charAt(i)
  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整')
}

/**
 * @description: 加法运算
 * @param {*} arg1
 * @param {*} arg2
 * @return {*}
 */
export function operationAdd(arg1, arg2) {
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
 * @description: 减法运算
 * @param {*} arg1
 * @param {*} arg2
 * @return {*}
 */
export function operationSub(arg1, arg2) {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 * @description: 乘法运算
 * @param {*} arg1
 * @param {*} arg2
 * @return {*}
 */
export function operationMul(arg1, arg2) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

/**
 * @description: 除法运算
 * @param {*} arg1
 * @param {*} arg2
 * @return {*}
 */
export function operationDiv(arg1, arg2) {
  let t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 下移到底部
export function moveToBottom(index, arrList) {
  if (index === arrList.length - 1) {
    Message.warning('已经是最后一条，不可下移')
  } else {
    const downDate = arrList[index]
    arrList.splice(index, 1)
    arrList.splice(arrList.length, 0, downDate)
  }
}
// 下移一行
export function moveToNext(index, arrList) {
  if (index === arrList.length - 1) {
    Message.warning('已经是最后一条，不可下移')
  } else {
    const downDate = arrList[index + 1]
    arrList.splice(index + 1, 1)
    arrList.splice(index, 0, downDate)
  }
}
// 上移一行
export function moveToPrev(index, arrList) {
  if (index > 0) {
    const upDate = arrList[index - 1]
    arrList.splice(index - 1, 1)
    arrList.splice(index, 0, upDate)
  } else {
    Message.warning('已经是第一条，不可上移')
  }
}
// 上移到顶部
export function moveToTop(index, arrList) {
  if (index > 0) {
    const upDate = arrList[index]
    arrList.splice(index, 1)
    arrList.splice(0, 0, upDate)
  } else {
    Message.warning('已经是第一条，不可上移')
  }
}

/**
 <div class="move_btn">
 <i :disabled="index === 0" @click="$toTop(index, arrlist)"><img src="@/assets/images/top.png"/></i>
 <i :disabled="index === 0" @click="$toPrev(index, arrlist)"><img src="@/assets/images/prev.png"/></i>
 <i :disabled="index === arrlist.length - 1" @click="$toNext(index, arrlist)"><img src="@/assets/images/next.png"/></i>
 <i :disabled="index === arrlist.length - 1" @click="$toBottom(index, arrlist)"><img src="@/assets/images/bottom.png"/></i>
 </div>
 */

/**
 * @description: 假分页
 * @param {*} params 请求
 * @param {*} orginData 原始数据
 * @param {*} data 每页展示数据
 * @return {*}
 */
export function fakePage(params, orginData) {
  let data = []
  let { page, size } = params
  params.total = orginData.length
  // page = Math.ceil(params.total / size)
  page = (params.total > page * size - size ? page : page - 1) || 1
  data = orginData.slice((page - 1) * size, page * size)
  return data
}

/**
 * @description: 字符串数组是否包含
 * @param {*} params 请求
 * @param {*} orginData 原始数据
 * @param {*} data 每页展示数据
 * @return {*}
 */
export function includesId(idsStr, currentId) {
  if (!idsStr) return false
  let idsList = idsStr.split(',')
  return idsList.some(id => +id === currentId)
}
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function getObjectToQuery(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
// console.log(getObjectToQuery({a: 1, b: 2}))

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryToObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
// console.log(getQueryToObject('http://localhost/system/menu?a=1&b=2'))

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
