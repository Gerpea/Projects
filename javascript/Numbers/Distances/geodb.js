const http = require('http')

const params = {
  host: 'geodb-free-service.wirefreethought.com',
  method: 'GET',
}

exports.getCities = function (prefix) {
  const path = `/v1/geo/cities?${
    prefix ? 'namePrefix=' + prefix + '&' : ''
  }languageCode=en&sort=name,-population&hateoasMode=false`.replaceAll(' ', '%20')

  return new Promise(function (resolve, reject) {
    var req = http.request({ ...params, path }, function (res) {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode))
      }
      var body = []
      res.on('data', function (chunk) {
        body.push(chunk)
      })
      res.on('end', function () {
        try {
          body = JSON.parse(Buffer.concat(body).toString())
        } catch (e) {
          reject(e)
        }
        resolve(body.data)
      })
    })
    req.on('error', function (err) {
      reject(err)
    })

    req.end()
  })
}
