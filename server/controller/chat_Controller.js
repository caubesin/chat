const {getChatRoom, addUserToChatRoom, createChatRoom} = require('../helper/message_Helper');
const {findUserById} = require('../helper/user_Helper');

exports.sendData = async (req, res) => {
    const getData = () => {
        return Promise.all(
            req.user.chatroom.map(async (chatroomId) => {
                return await getChatRoom(chatroomId);
            })
        )
    }
    res.json({
        isAuthenticated: true,
        user: req.user,
        chatroom: await getData()
    })
}

exports.addUserToRoom = async (req, res) => {
    const user = await findUserById(req.body.userId);
    const status = await addUserToChatRoom(user, req.body.roomId);
    if(status) {
        res.json({
            status: 'Success',
            message: {
                type: "success",
                mess: "Thêm vào thành công"
            }
        })
    }
    else {
        res.json({
            status: 'Error',
            message: {
                type: "error",
                mess: "Đã xảy ra lỗi ! Vui lòng thử lại sau !"
            }
        })
    }
}

exports.createChatRoom = async (req,res) => {
    const data = {
        name: req.body.room_name,
        user: req.user,
        admin: [req.user._id.toString()]
    }
    const result = await createChatRoom(data);
    if(result) {
        res.json({
            status: 'Success',
            message: {
                type: "success",
                mess: "Tạo nhóm thành công !"
            }
        })
    }
    else {
        res.json({
            status: 'Error',
            message: {
                type: "error",
                mess: "Đã xảy ra lỗi ! Vui lòng thử lại sau !"
            }
        })
    }
}