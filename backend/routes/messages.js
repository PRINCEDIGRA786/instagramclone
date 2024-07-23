const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const fetchuser = require('../Middleware/fetchUser');
const User = require('../models/User');

// Route to get messages between two users
router.get('/:userId', fetchuser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort('timestamp');
        res.json(messages);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to send a message
router.post('/send', fetchuser, async (req, res) => {
    try {
        const { receiver, content } = req.body;
        const user = await User.findById(req.user.id);
        user.messaged.push(receiver);
        await user.save();
        const message = new Message({
            sender: req.user.id,
            receiver: receiver,
            content: content
        });
        await message.save();
        res.status(200).json(message);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
