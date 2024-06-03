const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//socket.io connection handling
io.on('connection', (socket) => {
    console.log("A client connected");
})

//Start server
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

module.exports = {io}