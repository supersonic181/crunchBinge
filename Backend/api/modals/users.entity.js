const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: "true"
        },
        email:{
            type: String,
            required: true,
            unique: "true"
        },
        password:{
            type: String,
            required: true,
        },
        watched: {
            type: Array
        },
        watchLater: {
            type: Array
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },
    {timestamps: true}
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;