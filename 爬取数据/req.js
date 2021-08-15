const axios = require('axios')
const fs = require('fs')
const c = console.log

let httpURl = 'https://www.1905.com/vod/list/n_1_t_1/o3p1.html'
function req(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
function fsWrite(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile('movies.txt',content, { flag: 'a', encoding: 'utf-8' }, (err) => {
      if (err) {
        reject('err')
      } else {
        resolve(err)
      }
    })
  })
}
async function getClassUrl() {
  let { data } = await req(httpURl)
  //<a href="javascript:void(0);" onclick="location.href='https://www.1905.com/vod/list/n_1/o3p1.html';return false;" class="cur">全部</a>
  //<a href="javascript:void(0);" onclick="location.href='https://www.1905.com/vod/list/n_1_t_1/o3p1.html';return false;" >爱情</a>
  let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/igs
  let result = reg.exec(data)[1]
  let regClass = /<a href="javascript\:void\(0\);" onclick="location\.href='(.*?)';return false;".*?>(.*?)<\/a>/igs
  let calssArr = []
  let res
  while (res = regClass.exec(result)) {
    let obj = {
      url: res[1],
      calssName: res[2]
    }
    calssArr.push(obj)
    getMovieUrl(obj.url,obj.calssName)
  }
  // c(calssArr)
}
async function getMovieUrl(url, className) {
  let { data } = await req(url)
  let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)" title="(.*?)"><img/igs
  let movieList = []
  let res
  while (res = reg.exec(data)) {
    let obj = {
      className,
      movieName: res[2],
      movieUrl: res[1]
    }
    fsWrite(`分类：${obj.className}, 电影名： ${obj.movieName}, 电影链接： ${obj.movieUrl}\n`)
    movieList.push(obj)
  }
  c(movieList)
}
getClassUrl()