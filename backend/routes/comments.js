const express = require('express')
const Post = require('../models/Post')
// const User = require('../models/User');
const Comment = require('../models/Comment')
const fetchuser = require('../Middleware/fetchUser');
const router = express.Router();

router.post('/posts/:postId/comments', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { content } = req.body;
        const { postId } = req.params;

        const newComment = new Comment({
            user: userId,
            post: postId,
            content
        });

        await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id }
        });
        res.status(200).send({ "success": true })

    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }
});


//Liking a comment

router.post('/:commentId/like', fetchuser, async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id

    try {
        await Comment.findByIdAndUpdate(commentId, {
            $addToSet: { likes: userId } // addToSet ensures no duplicates
        });

        res.status(200).json({ "success": true, "message": 'Comment liked' });
    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }
});

router.delete('/:commentId/unlike', fetchuser, async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id

    try {
        await Comment.findByIdAndUpdate(commentId, {
            $pull: { likes: userId } // addToSet ensures no duplicates
        });

        res.status(200).json({ "success": true, "message": 'Comment Disliked' });
    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }
});
// Adding reply to the comment

router.post('/:commentId/replies', fetchuser, async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const { postId, content } = req.body;

    try {
        const reply = new Comment({
            user: userId,
            post: postId,
            content
        });

        await reply.save();

        await Comment.findByIdAndUpdate(commentId, {
            $push: { replies: reply._id }
        });

        res.status(200).json({ "success": true, "message": reply });
    } catch (error) {
        res.status(500).json({ "success": false, "message": error });
    }
});

//To get the comments from the postId:

router.get('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId })
            .populate('user', 'username pic') // populate user info
            .populate({
                path: 'replies',
                populate: {
                    path: 'user',
                    select: 'username pic'
                }
            });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;