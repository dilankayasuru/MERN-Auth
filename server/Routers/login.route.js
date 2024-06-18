const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Database/Model/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: 'failed',
                message: 'Incorrect Password!'
            })
        }

        const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET_KEY, {expiresIn: '1h'})

        res.status(200).json({
            status: 'success',
            message: 'Login Success',
            token: token
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;