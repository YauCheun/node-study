const fs = require('fs')

const c = console.log

// ============异步==========

function fsWrite(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile('test.txt',content, { flag: 'a', encoding: 'utf-8' }, (err) => {
      if (err) {
        reject('err')
      } else {
        resolve(err)
      }
    })
  })
}
async function writeList() {
  await fsWrite('七夕快乐\n')
  await fsWrite('你好啊\n')
  await fsWrite('感觉怎么样')
}
writeList()