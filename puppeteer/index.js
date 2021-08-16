const puppeteer = require('puppeteer')


async function test() {
  // puppeteer.launch 实例开启浏览器
  // 可以传入一个options对象， 可以配置为无界面浏览器，也可以配置为有界面浏览器
  // 无界面浏览器性能更高更快， 有界面一般用于调试
  let browser = await puppeteer.launch({ headless: false })

  // 打开新页面
  let page = await browser.newPage()
  await page.goto("http://www.baidu.com")
  let elements = await page.$('#kw')
  console.log(elements)
  // 光标进入
  await elements.focus()
  //输入内容
  await page.keyboard.type("puppeteer")
  // 点击按钮
  let subBtn = await page.$('#su')
  await subBtn.click()
}
test()