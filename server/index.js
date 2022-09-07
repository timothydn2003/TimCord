const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
require('dotenv').config()

app.use(cors())
app.get('/', (req,res) => {
    res.json("Server Running")
})
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        allRoutes: true,
        origin:"*"||"http://localhost:3000",
        credential: true,
        methods: ["GET", 'POST'],
        headers: 'content-type'
    }
})

io.on("connection", (socket) => {
    console.log('User connected', socket.id)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log('Joined room', data)

    })
    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("recieve_message", data)
    })
    socket.on("disconnect", () => {
        console.log('User disconnected', socket.id)
    })
})

server.listen(process.env.PORT||3001, () => {
    console.log('Server is up and running')
})