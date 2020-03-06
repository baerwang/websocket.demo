const express = require('express')
const app = express()


const server = require('http').createServer(app)
const io = require('socket.io')(server)

var count = 0;
// socket 服务器监听连接 表示已经建立连接
io.on('connection', socket => {
  // 向客户端发送一个事件  消息
  // socket.emit('request',)

  // 向所有客户端发送消息
  // io.emit('broadcast',)
  // 定时发送消息
  // setInterval(() => {
  //   io.emit('msg', 'hello world' + (new Date()))
  // }, 1000);


  // 用户登陆时候监听登陆消息
  socket.on('login', (data) => {

    // 把用户名存到 socket 对象上面
    socket.username = data
    console.log('login:' + data);
    count++
    // 房间人数
    io.emit('count', count)
  })


  // 监听客户端发来的消息
  socket.on('reply', (data) => {
    // console.log('receive:' + data);

    // 向所有的客户端发送
    io.emit('msg', { username: socket.username, msg: data })
  })

  // 断开连接
  socket.on('disconnect', (data) => {
    count--
    // 房间人数
    io.emit('count', count)
  })
})


// 静态文件中间件
app.use(express.static(__dirname + '/static'))

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('*', function (req, res) {
  // 发送文件 参数是文件路径
  res.sendFile(__dirname + '/view/index.html')
})
// console.log(__dirname + '/view/1.html')
server.listen(3000)