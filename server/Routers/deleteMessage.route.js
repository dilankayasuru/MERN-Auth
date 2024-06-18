const express = require('express');
const Message = require('../Database/Model/Message');

const {authenticate} = require('../Middleware/auth')

const router = express.Router();

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {deletedMessage}
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
})

module.exports = router;