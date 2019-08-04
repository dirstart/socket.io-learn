var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // 对所有用户执行
  socket.broadcast.emit('欢迎来到聊天室');
  socket.on('chat msg', function (msg) {
    console.log('msg:', msg);
    io.emit('chat msg', msg);
  });
});