const event = require('events')
const c = console.log
const ee= new event.EventEmitter()

ee.on('data',()=>c('监听事件'))

ee.emit('data')