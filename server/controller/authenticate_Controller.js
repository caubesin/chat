
exports.fail_authenticate = (req, res) => {
    res.json({
        isAuthenticated: false,
        message: {
            type: 'error',
            mess: "Sai tài khoản hoặc mật khẩu !"
        },
        chatroom: null
    })
}
