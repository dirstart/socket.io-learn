const http = require('http');
const io = require('socket.io');

let app = http.createServer().listen(8003);
let ws = io.listen(app);