const cheerio = require('cheerio')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const c = console.log
let httpUrl = 'https://www.doutula.com/article/list/?page=1'

// 等待函数

async function wait(time){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(), time)
  })
}
async function spider() {
  // 获取页面总数
  let allNum = await getNum()
  // let allNum =1
  for (let i = 1; i <= allNum; i++) {
    getListPage(i)
  }
}

// 获取页面总数
async function getNum() {
  let res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  let btnLength = $('.pagination li').length
  let total = $('.pagination li').eq(btnLength - 2).find('a').text()
  return total
}

async function getListPage(pageNum) {
  let httpUrl = 'https://www.doutula.com/article/list/?page=' + pageNum
  let res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  $('#home .col-sm-9>a').each((i, ele) => {
    let pageUrl = $(ele).attr('href')
    let title = $(ele).find('.random_title').text()
    let reg = /(.*?)\d/igs
    title = reg.exec(title)[1]
    fs.mkdir('./images/' + title, (err) => {
      if (err) {
        c(err)
      } else {
        // c('创建目录成功')
      }
    })
    parsePage(pageUrl, title)
  })
}


async function parsePage(url, dirName) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, ele) => {
    let imgUrl = $(ele).attr('src')
    let extName = path.extname(imgUrl)
    let pathURL = `./images/${dirName}/${dirName}-${i}${extName}`
    let ws = fs.createWriteStream(pathURL)
    axios.get(imgUrl, { responseType: 'stream' }).then(res => {
      res.data.pipe(ws)
      c('图片加载完成', pathURL)
      ws.end()
    })
  })
  await wait(1000)
}

spider()