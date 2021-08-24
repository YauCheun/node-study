const http = require('http')
const url = require('url')
class myApp {
  constructor() {
    this.reqEvent = {}
    this.server = http.createServer()
    this.server.on('request', (req, res) => {
      let reqObj = url.parse(req.url)
      console.log(reqObj)
      if (reqObj.pathname in this.reqEvent) {
        this.reqEvent[reqObj.pathname](req, res)
      } else {
        res.end('404')
      }
    })
  }
  on(url, fn) {
    this.reqEvent[url] = fn
  }
  run(port, callback) {
    this.server.listen(port, callback)
  }
}

module.exports = myApp