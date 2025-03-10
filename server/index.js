const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
    res.send("Welcome our chat app APIs...");
});

const port = process.env.port || 5000
const uri = process.env.ATLAS_URI;

const expressServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

mongoose.connect(uri)
    .then(
        () => console.log("MongoDB connection established")
    ).catch((err) => {
        console.log(err);
        console.log("Connection failed")
    })

const io = new Server(expressServer, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});


let onlineUsers = [];

io.on('connection', (socket) => {
    console.log("new connection: ", socket.id);

    //listen to a connection

    socket.on('addNewUser', (userId) => {
        if (onlineUsers.some((user) => user.userId === userId) == false) {
            onlineUsers.push({ userId, socketId: socket.id });
        }

        io.emit('getOnlineUsers', onlineUsers);
    });

    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", { senderId: message.senderId, isRead: false, date: new Date() });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});
