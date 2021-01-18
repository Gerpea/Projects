import http from 'http'
class Server {
  constructor() {
    this._httpServer = http.createServer((req, res) => this._requestListener(req, res))

    this._get = []
    this._delete = []
    this._post = []
  }

  get(url, listener) {
    this._get.push({ url: this._getUrlRegex(url), listener })
  }
  post(url, listener) {
    this._post.push({ url: this._getUrlRegex(url), listener })
  }
  delete(url, listener) {
    this._delete.push({ url: this._getUrlRegex(url), listener })
  }

  listen(listener, port, hostname = '127.0.0.1') {
    this._httpServer.listen(port, hostname, listener)
  }

  close() {
    this._httpServer.close()
  }

  _requestListener(req, res) {
    let result
    switch (req.method) {
      case 'GET':
        result = this._findRoute(this._get, req.url)
        break
      case 'POST':
        result = this._findRoute(this._post, req.url)
        break
      case 'DELETE':
        result = this._findRoute(this._delete, req.url)
        break
    }

    if (result) {
      this._callRoute(result.route, Object.assign(req, { url: result.route.url }), res)
    }
  }

  _getUrlRegex(url) {
    let result = {
      path: url,
      regex: /gi/,
      paramsPosition: {},
    }

    let regexString = url

    const params = url.split('/:')
    if (params.length > 1) {
      for (let [idx, param] of params.slice(1).entries()) {
        result.paramsPosition[idx + 1] = param.split('/')[0]
      }
    }

    for (let param of Object.values(result.paramsPosition)) {
      regexString = regexString.replace(`/:${param}`, '/([a-z0-9]+)')
    }

    result.regex = new RegExp(regexString, 'gi')
    return result
  }

  _findRoute(routes, url) {
    for (let route of routes) {
      const rawParams = route.url.regex.exec(url)

      const params = {}
      rawParams.forEach((value, idx) => {
        const key = route.url.paramsPosition[idx]
        if (key) {
          params[key] = value
        }
      })

      if (params) {
        return { route: { ...route, url: { ...route.url, params } } }
      }
    }
  }

  _callRoute(route, req, res) {
    route.listener.call(this._httpSever, req, res)
  }
}

export { Server }
