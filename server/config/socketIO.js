const socketIO = require('socket.io');
require('dotenv').config();
const {addMessage} = require('../helper/message_Helper');


const createIOConnect = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    
    io.on('connection', (socket) => {
        console.log(socket.id + ": connected");
    
        socket.on("disconnect", () => {
            console.log(socket.id + ': disconnected')
        })
    
        socket.on('newMessage', async (data) => {
            const res = await addMessage(data.message, data.userId, data.roomId);
            io.emit('newMessage', {
                message: res.message,
                updated_at: res.time
            });
        })
    })
}


module.exports = {
    createIOConnect
};