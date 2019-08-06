const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
  port: 8081
})

wss.on('connection', (ws) => {
  console.log('client connect')
  ws.on('message', (message) => {
    console.log('收到传来的信息', message)
  })
})
