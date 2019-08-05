/**
 * Problem
 * 1.浏览器刷新的时候不代表 client 退出？
 */
let wsUtil = require('ws');
let WebSocketServer = wsUtil.Server;
let uuid = require('node-uuid');
let wsServer = new WebSocketServer({
  port: 8080
});
let clientIndex = 0;
let clients = [];
// 服务器传递信息封装的函数
const socketSend = (type, message, nickname) => {
  let len = clients.length;
  for (let i = 0; i < len; i++) {
    let clientSocket = clients[i].ws;
    if (clientSocket.readyState === wsUtil.OPEN) {
      let obj = { type, message };
      // 上线和下线只需要 type 和 message 就够了
      if (type !== 'message') {
        obj.userCount = len;
      } else {
        obj.nickname = nickname;
      }
      clientSocket.send(JSON.stringify(obj));
    }
  }
}
// 服务器处理链接关闭
const closeSocket = (nickname, clientId, userDownMsg) => {
  userDownMsg = nickname + userDownMsg || '下线了！';
  for (let i = 0 ; i < clients.length; i++) {
    if (clients[i].id === clientId) {
      clients.splice(i, 1);
      break;
    }
  }
  socketSend('userDown', userDownMsg);
};
// 服务端处理链接
wsServer.on('connection', function(ws) {
  var client_uuid = uuid.v4();
  var nickname = "夏目美绪" + clientIndex;
  let currentUser = '';
  clientIndex += 1;
  clients.push({ "id": client_uuid, "ws": ws, "nickname": nickname });
  console.log('client [%s] connected', client_uuid);
  clients.forEach(item => currentUser += `[${item.nickname}]`);
  console.log('当前的用户们个数:', clients.length, currentUser);
  var connect_message = nickname + " has connected";
  socketSend("userUp", connect_message);

  // 监听客户端传来的东西
  ws.on('message', function(message) {
    console.log(`客户端[${nickname}]传过来了`, message);
    socketSend('message', message, nickname);
  });

  // ws退出
  ws.on('close', function () {
    console.log(`用户${nickname}退出了链接！`);
    closeSocket(nickname, client_uuid);
  });
});
