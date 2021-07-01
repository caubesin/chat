import io from 'socket.io-client';

export const socket = io(process.env.SERVER_URL, {
    withCredentials: true,
    autoConnect: false
});

export const sendMess = (message, _id, userId) => {
    socket.emit("newMessage", {
        roomId: _id,
        message: message,
        userId: userId,
        created_at: new Date()
    });
}
