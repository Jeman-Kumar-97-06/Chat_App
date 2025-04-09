require('dotenv').config();
const {Server}  = require('socket.io');
const http    = require('http');
const express = require('express');
const app     = express();
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;



const server = http.createServer(app);

const io     = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST']
    }
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);
    //Whenever a user connects and sends his/her userId from the client side to backend, we pick it up and add it to userSocketMap like : 
    //  { userId : corresponding_socket_id }
    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') {
        userSocketMap[userId] = socket.id;
    }
    //Now we send the userSocketMap object with all the connected users' socket_ids to client side 
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        console.log("user disconnected ",socket.id);
        //If someone disconnects, we remove that userId and send the updated object to the client side
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

app.use(express.json());
app.use(cors())

app.use("/api/users",userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

mongoose.connect(process.env.MONGOURL).then(()=>{
    server.listen(process.env.PORT,()=>{console.log("Connected to Database and listening at ",process.env.PORT)})
});

module.exports = {getReceiverSocketId}