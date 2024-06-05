import { getQueryParamValues } from './common'

export const http = {
  get(url, params?: object | undefined, headers?: HeadersInit | undefined) {
    if (params) {
      let paramsArray = []
      Object.keys(params).forEach((key) =>
        paramsArray.push(key + '=' + params[key])
      )
      url += (url.search(/\?/) === -1 ? '?' : '&') + paramsArray.join('&')
    }
    if (!headers) {
      headers = {}
    }
    if (!headers['token']) {
      headers['token'] = getQueryParamValues('token')
    }
    return new Promise((resolve, reject) => {
      fetch(this.getUrl(url), {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            reject({ status: response.status })
          }
        })
        .then((response) => resolve(response))
        .catch((reason) => reject({ message: reason, status: -1 }))
    })
  },
  post(url, formData?: string | undefined, headers?: HeadersInit | undefined) {
    if (!headers) {
      headers = {}
    }
    if (!headers['token']) {
      headers['token'] = getQueryParamValues('token')
    }
    return new Promise((resolve, reject) => {
      fetch(this.getUrl(url), {
        method: 'POST',
        headers: headers,
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            reject({ status: response.status })
          }
        })
        .then((response) => resolve(response))
        .catch((reason) => reject({ message: reason, status: -1 }))
    })
  },
  postJSON(
    url,
    jsonData?: object | undefined,
    headers?: HeadersInit | undefined
  ) {
    if (!jsonData) {
      jsonData = {}
    }
    if (!headers) {
      headers = {}
    }
    headers['Content-Type'] = 'application/json'
    return this.post(url, JSON.stringify(jsonData), headers)
  },
  parseBody(bodyParams) {
    let body = undefined
    if (bodyParams) {
      body = {}
      bodyParams.map((o) => {
        body[o.name] = o.value
      })
    }
    return body
  },
  contextPath() {
    if (this.ctxPath == undefined) {
      try {
        let pathname = window.location.pathname
        pathname = pathname.substring(1, pathname.indexOf('/', 1))
        this.ctxPath = location.protocol + '//' + location.host + '/'
        if (pathname && pathname !== '/') {
          this.ctxPath += pathname + '/'
        }
      } catch (e) {}
      this.ctxPath = this.ctxPath || ''
    }
    return this.ctxPath
  },
  getUrl(url) {
    if (url) {
      if (url.toLocaleString().indexOf('://') === -1) {
        const cxtPath = this.contextPath()
        if (cxtPath.length > 0) {
          if (url.startsWith('/')) {
            url = url.substring(1)
          }
          url = cxtPath + url
        }
      }
    }
    return url
  },
}
