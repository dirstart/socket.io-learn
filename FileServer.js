const path = require('path');
const fs = require('fs');
const Server = require('http').createServer((req, res) => {
    // 排除掉老因为图标报的错，天知道为什么它一定要发这个请求
    if (req.url === '/favicon.ico') {
        return;
    }
    console.log('req.url', req.url);
    // 如果请求的是首页
    if (req.url === '/') {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    } else {
        let target = path.join(__dirname, req.url);
        let stream = fs.createReadStream(target);
        stream.pipe(res);
        stream.on('error', function (err) {
            console.log('看下到底是哪个请求出的错', req.url);
            console.log('err', err);
        });
    }

});

const io = require('socket.io')(Server);

io.on('connect', function (socket) {
    socket.emit('news', {
        test: 'Hello World'
    });
    console.log('网页被连接了');
}); 

Server.listen(8080);