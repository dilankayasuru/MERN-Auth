const express = require('express');
const Message = require('../Database/Model/Message');
const {authenticate} = require('../Middleware/auth');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    try {
        const messageContent = {
            message: req.body.message,
            name: req.user.name,
            userId: req.user._id
        }

        const message = new Message(messageContent);
        await message.save();
        res.status(200).json({
            status: 'success',
            data: message
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})

module.exports = router;