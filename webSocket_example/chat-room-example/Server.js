let WebSocketServer = require('ws').Server;
let uuid = require('node-uuid');
let wsServer = new WebSocketServer({
  port: 8080
});
let clientIndex = 0;
let clients = [];
// 服务端发送信息
const socketSend = (type, client_uuid, nickname, message) => {
  for (var i = 0; i < clients.length; i++) {
      var clientSocket = clients[i].ws;
      if (clientSocket.readyState === wsServer.OPEN) {
          clientSocket.send(JSON.stringify({
              "type": type,
              "id": client_uuid,
              "nickname": nickname,
              "message": message
          }));
      }
  }
}
// 服务器处理链接关闭
const closeSocket = (customMessage) => {
  for (var i = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
          var disconnect_message;
          if (customMessage) {
              disconnect_message = customMessage;
          } else {
              disconnect_message = nickname + " has disconnected";
          }
          socketSend("notification", client_uuid, nickname, disconnect_message);
          clients.splice(i, 1);
      }
  }
};
// 服务端处理链接
// todo - 这里看下能不能通过客户端传过来
wsServer.on('connection', function(ws) {
  var client_uuid = uuid.v4();
  var nickname = "AnonymousUser" + clientIndex;
  clientIndex += 1;
  clients.push({ "id": client_uuid, "ws": ws, "nickname": nickname });
  console.log('client [%s] connected', client_uuid);
  console.log('当前的用户们个数:', clients.length);
  var connect_message = nickname + " has connected";
  socketSend("notification", client_uuid, nickname, connect_message);
});
// 监听客户端传来的东西
wsServer.on('message', function(message) {
  // if (message.indexOf('/nick') === 0) {
  //     var nickname_array = message.split(' ');
  //     if (nickname_array.length >= 2) {
  //         var old_nickname = nickname;
  //         nickname = nickname_array[1];
  //         var nickname_message = "Client " + old_nickname + " changed to " + nickname;
  //         socketSend("nick_update", client_uuid, nickname, nickname_message);
  //     }
  // } else {
  socketSend("message", client_uuid, nickname, message);
  // }
});
wsServer.on('close', function () {
  console.log('有个用户退出了链接');
  closeSocket();
});

