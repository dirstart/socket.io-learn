/**
 * Problem
 * 1.浏览器刷新的时候不代表 client 退出？
 */
const wsUtil = require('ws')
const qs = require('querystring')
const WebSocketServer = wsUtil.Server
const uuid = require('node-uuid')
const wsServer = new WebSocketServer({
  port: 8080
})
let clientIndex = 0
const clients = []
// 服务器传递信息封装的函数 - 这里关于用户的信息最好用对象来表示
const socketSend = (type, message, nickName, color) => {
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
        obj.nickName = nickName
        obj.color = color
      }
      clientSocket.send(JSON.stringify(obj))
    }
  }
}
// 服务器处理链接关闭
const closeSocket = (nickName, clientId, userDownMsg) => {
  userDownMsg = nickName + userDownMsg || '下线了！'
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].id === clientId) {
      clients.splice(i, 1)
      break
    }
  }
  socketSend('userDown', userDownMsg)
}
// 服务端处理链接

wsServer.on('connection', (ws, req) => {
  // 获取传过来的用户名
  const url = req['url']
  const paramObj = qs.parse(url.split('?')[1])
  const nickName = paramObj['nick']
  const color = paramObj['color']
  const clientUuid = uuid.v4()
  let currentUser = ''

  clientIndex += 1
  clients.push({ id: clientUuid,
    ws,
    nickName })
  console.log('client [%s] connected', clientUuid)
  clients.forEach((item) => {
    currentUser += `[${item.nickName}]`
  })
  console.log('当前的用户们个数:', clients.length, currentUser)
  const connectMessage = `${nickName} has connected`

  socketSend('userUp', connectMessage)

  // 监听客户端传来的东西
  ws.on('message', (message) => {
    console.log(`客户端[${nickName}]传过来了`, message)
    socketSend('message', message, nickName, color)
  })

  // Ws退出
  ws.on('close', () => {
    console.log(`用户${nickName}退出了链接！`)
    closeSocket(nickName, clientUuid)
  })
})
