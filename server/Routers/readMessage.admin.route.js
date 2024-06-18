const express = require('express');
const Message = require('../Database/Model/Message');
const {authenticate, authorize} = require('../Middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const messages = await Message.find({});

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