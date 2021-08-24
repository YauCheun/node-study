const myApp = require('./server')

let server = new myApp()

server.on('/test', (req, res) => {
  res.end('helloworld')
})

server.run(3000, () => {
  console.log("服务端启动成功")
})