const fs = require('fs')
const { fsRead, fsWrite } = require('./common')
const c = console.log
// ============同步==========

// const fd = fs.openSync('hello.txt', 'r')  // 返回文件描述符
// let buf = Buffer.alloc(16)
// let content = fs.readSync(fd,buf,0,16) // readSync 返回字节数量
// c(content)

// const content = fs.readFileSync('hello.txt', { flag: 'r', encoding: 'utf-8' })  // 返回读取内容
// c(content)

// ============异步==========

async function readList() {
  let file1 = await fsRead('hello.txt')
  let file2 = await fsRead(file1 + '.txt')
  let file3 = await fsRead(file2 + '.txt')
  c(file3)

}
// readList()

// 读取目录
fs.readdir('../文件模块', (err, fileList) => {
  if (err) {
    console.log(err)
  } else {
    fileList.forEach(async (item) => {
      let content = await fsRead(item)
      await fsWrite(content)
    })
  }
})