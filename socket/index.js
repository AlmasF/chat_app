const { Server } = require('socket.io');
const io = new Server({ cors: 'http://localhost:5173' });

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
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });



});

io.listen(3000);