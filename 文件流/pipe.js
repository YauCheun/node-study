const fs = require('fs')

const c = console.log

// 创建一个读取流
let rs = fs.createReadStream('hello.txt', { flags: 'r', encoding: 'utf-8' })

// 创建一个写入流
let ws = fs.createWriteStream('a.txt', { flags: 'w' })

rs.on('open', () => c('读取文件打开'))

rs.on('close', () => {
  c('读取文件关闭')
})

rs.pipe(ws)