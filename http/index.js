const http = require('http')

let server = http.createServer()

server.on('request', (req, res) => {
  res.end('helloworld')
})

server.listen(3000, () => {
  console.log("服务端启动成功")
})