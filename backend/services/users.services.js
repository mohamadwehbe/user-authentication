const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return callback(null, { ...user.toJSON(), token })
        }
        else {
            return callback({
                message: "Invalid Username/Password!"
            })
        }
    }
    else {
        return callback({
            message: "Invalid Username/Password!"
        })
    }
}

async function register(params, callback) {
    if (params.username === undefined) {
        return callback({
            message: "Username Required"
        })
    }

    const user = new User(params);
    user.save()
        .then(res => {
            return callback(null, res);
        })
        .catch(err => {
            return callback(err);
        });
}

module.exports = {
    login,
    register
}