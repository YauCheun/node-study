const path = require('path')

const c= console.log
// 获取当前执行文件的目录
c(__dirname)

// 获取当前的执行文件
c(__filename)

// 获取路径中的拓展名
c(path.extname(__filename))

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 
// 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz
// 相当于执行cd操作
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'

// path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径
c(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
// 返回: '/foo/bar/baz/asdf'