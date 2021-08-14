// 1.数组不能进行二进制的操作
// 2.js数组不像java、python等语言效率高
// 3.buffer内存空间开辟出固=固定大小的内存
let c = console.log

let str = 'helloworld'
let buf = Buffer.from(str)
c(buf)

// 输出buf内容
c(buf.toString())

// 开辟一个空的buffer缓存区
let buf1 = Buffer.alloc(10)
buf1[0] = 10
c(buf1)

// 开辟一个不安全的buffer缓存区
let buf2 = Buffer.allocUnsafe(10)
c(buf2)