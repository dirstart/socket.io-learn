// Server App
const app = require('http').createServer(handler);
// const io = require('socket.io')(app);
const fs = require('fs');
const join = require('path').join;

// 端口监听
app.listen(8080, function () {
    console.log('正在连接端口 8080!');
});

function handler (req, res) {
    
};

// io 控制了服务端被触发的时候的操作
io.on('connect', function (socket) {
    console.log('a user connect', socket);
});