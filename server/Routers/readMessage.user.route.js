const express = require('express');
const Message = require('../Database/Model/Message');
const {authenticate} = require('../Middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const messages = await Message.find({userId: user._id});

        if (messages.length === 0) {
            return res.status(404).json({
                status: 'failed',
                data: 'No message fond for this user'
            });
        }

        res.status(200).json({
            status: 'success',
            messages: messages
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})

module.exports = router;