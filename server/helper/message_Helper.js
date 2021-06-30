const {ChatRoom, Message, db} = require('../config/mongoDB');
const ObjectId = require('mongoose').Types.ObjectId;

const createChatRoom = async (data) => {
    let status = false;
    const chatRoomCollections = new ChatRoom(data);
    const User = db.collection('users');
    await chatRoomCollections.save()
        .then(() => status = true)
        .catch((err) => status = false)
    await User.updateOne({_id: ObjectId(data.user._id)}, {$push: {chatroom: chatRoomCollections._id.toString()}})
        .then(() => status = true)
        .catch((err) => status = false)
    return status;
}

const getChatRoom =  (id) => {
    const ChatRoom = db.collection('chatrooms');
    return new Promise((resolve, reject) => {
        ChatRoom.findOne({_id: ObjectId(id)}, (err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}

const addMessage = (data, userId, roomId) => {
    const message = new Message({
        roomId: roomId,
        userId: userId,
        message_body: data
    })
    
    const time = new Date();
    let status = {
        status: false,
        message: message,
        time: time
    };
    const ChatRoom = db.collection('chatrooms');
    return new Promise((resolve, reject) => {
        ChatRoom.updateOne({_id: ObjectId(roomId)}, {$push: {message: message}}, (err, res) => {
                if (err) reject(status);
                console.log('update success: ' + res.result.nModified + ' records');
                ChatRoom.updateOne({_id: ObjectId(roomId)}, {$set: {updated_at: time}}, (err,res) => {
                    if(err) reject(status);
                    resolve(
                        status = {
                            status: true,
                            message: message,
                            time: time
                        }
                    )
                })
        })
    })
}

const addUserToChatRoom = async (user, roomId) => {
    let status = false;
    const ChatRoom = db.collection('chatrooms');
    await ChatRoom.updateOne({_id: ObjectId(roomId)}, {$push: {user: user}})
        .then(() => status = true)
        .catch(err => console.err(err))
    return status;
}


module.exports = {
    createChatRoom,
    addMessage,
    getChatRoom,
    addUserToChatRoom,
    ChatRoom
}