const mysql = require('mysql')

let options = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'demo'
}

// 创建数据库连接
let con = mysql.createConnection(options)
// 建立连接
con.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('数据库连接成功')
  }
})

// 执行查询语句

let strSql = "select * from user"

con.query(strSql, (err, result, fields) => {
  console.log(err)
  console.log(result)
  console.log(fields)
})

//删除表

// let strSql2 = 'drop table user'

// con.query(strSql2, (err, result) => {
//   console.log(err)
//   console.log(result)
// })

// 插入数据
// let strSql3 = 'insert into user (id,username,password) values (1,"zhangyou","123456")'
// con.query(strSql3, (err, res) => {
//   console.log(err)
//   console.log(res)
// })
// 插入数据
let strSql4 = 'insert into user (username,password,mail) values (?,?,?)'
con.query(strSql4, ["zhangyou", "123456", "123@qq.com"], (err, res) => {
  console.log(err)
  console.log(res)
})