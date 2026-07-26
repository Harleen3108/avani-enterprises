const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Second admin secret, bcrypt-hashed like a password. Null until the user
    // sets one; existing accounts have none.
    adminCodeHash: {
        type: String,
        default: null,
    },
    otp: String,
    otpExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);
