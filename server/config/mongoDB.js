const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const {v1: uuidv1} = require('uuid');
const db = mongoose.connection;
const ObjectId = require('mongoose').Types.ObjectId;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true});
db.once('open', () => {
    console.log("Kết nối thành công !");
})
db.on('error', (err) => {
    throw err;
})

const userSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    nickname: {type: String, max: 10, default: ''},
    birth: {type: Date},
    avatar: {type: String, default: ''},
    friend: {type: Array},
    chatroom: {type: Array},
    is_active: { type: Boolean, default: false },
})

const messageSchema = new mongoose.Schema({
    id: {type: ObjectId, required: true},
    roomId: String,
    userId: String,
    message_body: String,
    message_status:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

const chatRoomSchema = new Schema({
    name: { type: String, default: ""},
    topic: {type: String, default: ""},
    user: [userSchema],
    message: [messageSchema],
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    admin: {type: Array}
})


userSchema.methods.generateHash = function () {
    return bcrypt.hashSync(this.password,bcrypt.genSaltSync(8),null);
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

messageSchema.methods.generateId = function () {
    return uuidv1().toString();
}

const User = mongoose.model("User", userSchema);
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = {
    User,
    ChatRoom,
    Message,
    db
}