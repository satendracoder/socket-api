const express = require('express');
const { on } = require('node:events');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const path = require('path');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
 return res.sendFile("/public/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    
    socket.on('dis', function () {
        console.log('a user dis');
    })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});