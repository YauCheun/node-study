const puppeteer = require('puppeteer')
const axios = require('axios')
const url = require('url');
const fs = require('fs');
const { fsRead, fsWrite } = require('./common')
let httpUrl = 'https://www.aibooks.cc/';
(async function () {
  let debugOptions = {
    defaultViewport: {
      width: 1400,
      height: 800
    },
    // 设置为有界面
    headless: false
  }
  let options = { headless: true }
  let browser = await puppeteer.launch(debugOptions)


  let bookArr = await parseTxt()
  let index = 1

  downloadBook()

  async function downloadBook() {
    if (index == bookArr.length) {
      return '完成'
    }
    let bookObj = bookArr[index]
    index++
    let page = await browser.newPage()
    await page.goto(bookObj.url)
    // 因为a是ajax请求来的，不是页面请求过来的，需要等待
    await page.waitForSelector("#table_files tbody .even a")
    let element = await page.$("#table_files tbody .even a")
    let aHref = await element.getProperty('href')
    aHref = aHref._remoteObject.value
    bookLinkPage(aHref,bookObj.title)
    page.close()
    // await element.click()
    // let pages = await browser.pages()
  }

  async function bookLinkPage(linkUrl,title) {
    let page = await browser.newPage()
    await page.goto(linkUrl)
    await page.waitForSelector(".btn.btn-outline-secondary.fs--1")
    let btn = await page.$(".btn.btn-outline-secondary.fs--1")
    await page.setRequestInterception(true)
    //监听请求事件，并拦截
    page.on('request', interceptedRequest => {
      //通过url模块对网址拦截
      let urlObj = new URL(interceptedRequest.url())
      if (urlObj.hostname == '197-cmcc-dd.tv002.com') {
        // 如果是谷歌的请求就放弃当次请求
        interceptedRequest.abort()
        // console.log('截获',urlObj)
        let ws = fs.createWriteStream('./book/'+title+'.epub')
        axios.get(urlObj.href,{responseType: "stream"}).then(res=>{
          res.data.pipe(ws)
          ws.on('close',()=>{
            downloadBook()
            page.close()
            console.log("下载完成："+title)
          })
        })
      } else {
        interceptedRequest.continue()
      }
    })
    btn.click()
  }

  async function wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time)
    })
  }

  async function parseTxt() {
    let textContent = await fsRead('./book.txt')
    // 正则匹配json字符串对象
    let reg = /(\{.*?\})/igs
    let tempReg
    let bookArr = []
    while (tempReg = reg.exec(textContent)) {
      // 获取匹配结果
      let jsonStr = tempReg[1]
      //字符串解析成对象
      let jsonObj = JSON.parse(jsonStr)
      //获取连接属性
      // let bookHref = jsonObj.url
      bookArr.push(jsonObj)
    }
    return bookArr
  }
})();
