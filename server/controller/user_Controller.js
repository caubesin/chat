const {addUser, findUserByUserName, findUserById} = require('../helper/user_Helper');

exports.sendLoginPage = (req, res) => {
    res.json({
        isAuthenticated: false,
        message: {
            type: "error",
            mess: null
        },
        chatroom:  null
    });
}

exports.signUpReq = async (req, res) => {
    const user = await findUserByUserName(req.body.username);
    if(user) {
        res.json({
            status: "Fail",
            message: {
                type: "error",
                mess: "Tên tài khoản đã tồn tại !"
            }
        })
    }
    else {
        const status = await addUser({
            username: req.body.username,
            password: req.body.password,
            birth: req.body.date
        });
        if(status) {
            res.json({
                status: 'Success',
                message: {
                    type: "success",
                    mess: "Đăng ký thành công ! Hãy đăng nhập vào tài khoản của bạn"
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
}

exports.findUser = async (req,res) => {
    const user = await findUserById(req.body.userId);
    res.send(user);
}