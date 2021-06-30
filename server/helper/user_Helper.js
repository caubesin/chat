const {User, db} = require('../config/mongoDB');
const ObjectId = require('mongoose').Types.ObjectId;

const findUserByUserName = (username) => {
    const User = db.collection('users');
    return new Promise((resolve,reject) => {
        User.findOne({username: username}, (err, user) => {
            if(err) reject(err);
            resolve(user);
        })
    })
    
}

const findUserToLogin = (id, done) => {
    const User = db.collection('users');
    return new Promise((resolve, reject) => {
        User.findOne({_id: ObjectId(id)}, (err, result) => {
            resolve(done(err,result));
        })
    })
}

const findUserById = (id) => {
    const User = db.collection('users');
    return new Promise((resolve, reject) => {
        User.findOne({_id: ObjectId(id)}, (err, result) => {
            if(err) reject(err)
            resolve(result);
        })
    })
}

const addUser = async function (data) {
    let status = false;
    const userCollections = new User(data);
    userCollections.password = await userCollections.generateHash();
    await userCollections.save()
        .then(() => status = true)
        .catch(err => console.error(err))
    return status;
}

module.exports = {
    findUserByUserName,
    findUserById,
    addUser,
    findUserToLogin,
    User
}