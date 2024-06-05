export function is(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
export function isDate(val) {
  return is(val, 'Date')
}
export function isUnDef(val) {
  return is(val, 'Undefined')
}

/**
 * 是否是字符串
 * @param val
 * @returns {boolean}
 */
export function isString(val) {
  return typeof val === 'string'
}
/**
 * 是否对象
 * @param {对象} obj
 * @returns
 */
export function isObject(obj) {
  return is(obj, 'Object')
}
/**
 * 是否数组对象
 * @param {对象} arr
 * @returns
 */
export function isArray(arr) {
  return Array.isArray(arr)
}
/**
 * 是否为空
 * @param {对象} val
 * @returns
 */
export function isNull(val) {
  let tof = typeof val
  return (
    val === null ||
    tof === 'undefined' ||
    val === '' ||
    val === 'null' ||
    val === 'undefined' ||
    (tof === 'string' && val.replace(/(^\s+)|(\s+$)/g, '') === '') ||
    (Array.isArray(val) && val.length < 1) ||
    (tof === 'object' && Object.keys(val).length < 1 && val.toString() === '')
  )
}
/**
 * 是否不为空
 * @param {对象} val
 * @returns
 */
export function isNotNull(val) {
  return !isNull(val)
}
/**
 * 获取url参数值
 * @param {string} name
 * @returns
 */
export function getQueryParamValues(name) {
  if (!location.search) return null
  if (name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  } else {
    let params = {}
    let arr = location.search.substr(1).split('&')
    for (let i = 0; i < arr.length; i++) {
      let parr = arr[i].split('=')
      params[parr[0]] = decodeURI(parr[1])
    }
    return params
  }
}
/**
 * 生成uuid
 * @returns uuid
 */
export function uuid() {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
/**
 * 时间格式化
 * @param {时间} date
 * @param {格式} fmt yyyy-MM-dd EEE hh:mm:ss
 * @returns {*}
 */
export function dateFormat(date, fmt?: string | 'yyyy-MM-dd') {
  date = date || new Date()
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  fmt = fmt || 'yyyy-MM-dd'
  let o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  let week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d',
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[date.getDay() + '']
    )
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
/**
 * 合并对象
 * @param {目标对象} target
 * @param  {...any} arg 对象
 * @returns
 */
export function merge(target, ...arg) {
  return arg.reduce((acc, cur) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key]
      if (isObject(srcVal)) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else if (isArray(srcVal)) {
        subAcc[key] = srcVal.map((item, idx) => {
          // 表单只有两层
          return item
          // if (isObject(item)) {
          //   const curAccVal = subAcc[key] ? subAcc[key] : []
          //   return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
          // } else {
          //   return item
          // }
        })
      } else {
        try {
          subAcc[key] = srcVal
        } catch {
          console.warn(subAcc, key, srcVal)
        }
      }
      return subAcc
    }, acc)
  }, target)
}

export function toggleTranProp(obj, sProp, tProp) {
  if (obj) {
    if (obj.constructor === Array) {
      obj.forEach(function (o) {
        toggleTranProp(o, sProp, tProp)
      })
    } else {
      obj[tProp] = obj[sProp]
      toggleTranProp(obj.children, sProp, tProp)
    }
  }
}

export function toggleTree(list, handler) {
  if (list) {
    list.map((o) => {
      handler && handler(o)
      toggleTree(o.children, handler)
    })
  }
}
