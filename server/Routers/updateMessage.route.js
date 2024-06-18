const express = require('express');
const Message = require('../Database/Model/Message');

const {authenticate} = require('../Middleware/auth')

const router = express.Router();

router.put('/:id', authenticate, async (req, res) => {
    try {
        const message = req.body.messages;
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {message: message});
        res.status(200).json({
            status: 'success',
            data: {updatedMessage}
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})

module.exports = router;