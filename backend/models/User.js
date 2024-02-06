const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    regNo: String,
    uName: String,
    email: String,
    password: String,
    role:String
})

const userModel = mongoose.model("users",UserSchema)


module.exports =  userModel