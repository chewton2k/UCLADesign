const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true}, 
    password: {type: String, required: true},
    loginAttempts: { type: Number},
    lockTime:{type: Date},
    //rooms: {type: Array} //rooms to tie to a user 
},
{ timestamps: true });

module.exports = mongoose.model("User", userSchema);