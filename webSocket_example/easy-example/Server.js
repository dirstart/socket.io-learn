let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({
  port: 8081
});
wss.on('connection', function (ws) {
  console.log('client connect');
  ws.on('message', function (message) {
    console.log('收到传来的信息', message);
  });
});