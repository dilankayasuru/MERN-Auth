const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Database/Model/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {name, email, password, age} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword, age});

        await user.save();

        res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (error) {

        let errorMessage;

        if (error.code === 11000) errorMessage = 'Email already exists!'
        else if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).map(val => val.message).join(', ')
        } else errorMessage = error.message

        res.status(500).json({
            status: 'failed',
            message: errorMessage
        })
    }
});

module.exports = router;