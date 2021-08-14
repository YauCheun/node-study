const fs = require('fs')
function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
function fsWrite(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile('test.txt', content, { flag: 'a', encoding: 'utf-8' }, (err) => {
      if (err) {
        reject('err')
      } else {
        resolve(err)
      }
    })
  })
}
module.exports = { fsRead, fsWrite }