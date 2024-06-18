const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 18;
            },
            message: 'Age must be at least 18.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }


})

const user = mongoose.model('User', userSchema);

module.exports = user;