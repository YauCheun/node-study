const puppeteer = require('puppeteer')
const axios = require('axios')
const url = require('url');
const fs = require('fs');

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


  spider()

  async function wait(time){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>resolve(), time)
    })
  }
  async function spider() {
    // 获取页面总数
    let pageNum = getAllNum()
    // let pageNum =1
    for (let i = 1; i <= pageNum; i++) {
      await wait(i*8000) 
      pageList(i)
    }
  }

  // 进入小说页面触发下载
  async function getPageInfo(pageObj) {
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    //监听请求事件，并拦截
    page.on('request', interceptedRequest => {
      //通过url模块对网址拦截
      let urlObj = new URL(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 如果是谷歌的请求就放弃当次请求
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })
    await page.goto(pageObj.href)
    let eleA = await page.$('.dltable tr:nth-child(3) a:nth-child(4)')
    let aHref = await eleA.getProperty('href')
    aHref = aHref._remoteObject.value
    let content = `书名: "${pageObj.title}", 下载地址:"${aHref}"\n`
    fs.writeFile('book.txt', content, { flag: 'a' }, () => {
      console.log('已将下载路径写入')
    })
    page.close()
  }


  // 获取每个分页的小说详情连接
  async function pageList(num) {
    let pageURL = 'https://www.aibooks.cc/page/' + num
    let page = await browser.newPage()
    await page.setRequestInterception(true)
    //监听请求事件，并拦截
    page.on('request', interceptedRequest => {
      //通过url模块对网址拦截
      let urlObj = new URL(interceptedRequest.url())
      if (urlObj.hostname == 'googleads.g.doubleclick.net') {
        // 如果是谷歌的请求就放弃当次请求
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })
    // 访问列表页面
    await page.goto(pageURL)
    let allArr = await page.$$eval('.card .card-item .thumb-img>a', (elements) => {
      let arr = []
      elements.forEach((element, i) => {
        let obj = {
          href: element.getAttribute("href"),
          title: element.getAttribute("title")
        }
        arr.push(obj)
      });
      console.log(arr)
      return arr
    })
    page.close()
    // 通过获取的数组的地址和标题去请求书籍的详情
    allArr.forEach(async(pageObj, i) => {
      await wait(i*2000)
      getPageInfo(pageObj)
    }
    )
  }
  function getAllNum() {
    let allNum = 118
    return allNum
  }
})();
