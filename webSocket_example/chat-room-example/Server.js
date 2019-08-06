/**
 * Problem
 * 1.浏览器刷新的时候不代表 client 退出？
 */
const wsUtil = require('ws')
const WebSocketServer = wsUtil.Server
const uuid = require('node-uuid')
const wsServer = new WebSocketServer({
  port: 8080
})
let clientIndex = 0
const clients = []
// 服务器传递信息封装的函数
const socketSend = (type, message, nickname) => {
  const len = clients.length

  for (let i = 0; i < len; i++) {
    const clientSocket = clients[i].ws

    if (clientSocket.readyState === wsUtil.OPEN) {
      const obj = { type,
        message }
      // 上线和下线只需要 type 和 message 就够了

      if (type !== 'message') {
        obj.userCount = len
      } else {
        obj.nickname = nickname
      }
      clientSocket.send(JSON.stringify(obj))
    }
  }
}
// 服务器处理链接关闭
const closeSocket = (nickname, clientId, userDownMsg) => {
  userDownMsg = nickname + userDownMsg || '下线了！'
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].id === clientId) {
      clients.splice(i, 1)
      break
    }
  }
  socketSend('userDown', userDownMsg)
}
// 服务端处理链接

wsServer.on('connection', (ws) => {
  const clientUuid = uuid.v4()
  const nickname = `夏目美绪${clientIndex}`
  let currentUser = ''

  clientIndex += 1
  clients.push({ id: clientUuid,
    ws,
    nickname })
  console.log('client [%s] connected', clientUuid)
  clients.forEach((item) => {
    currentUser += `[${item.nickname}]`
  })
  console.log('当前的用户们个数:', clients.length, currentUser)
  const connectMessage = `${nickname} has connected`

  socketSend('userUp', connectMessage)

  // 监听客户端传来的东西
  ws.on('message', (message) => {
    console.log(`客户端[${nickname}]传过来了`, message)
    socketSend('message', message, nickname)
  })

  // Ws退出
  ws.on('close', () => {
    console.log(`用户${nickname}退出了链接！`)
    closeSocket(nickname, clientUuid)
  })
})
