const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = express.Router();
const fetchuser = require('../Middleware/fetchUser');

router.post('/addpost', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        // const user = await User.findById(userId)
        await Post.create({
            caption: req.body.caption,
            pic: req.body.pic,
            likes: req.body.likes,
            comments: req.body.comments,
        })

        //To add to the posts
        const post = await User.findById(userId);
        post.posts.unshift(req.body.pic);
        post.save()

        res.status(200).send({ "success": true, "status": "Added successfully" })

    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": false, "status": "Internal Server Error" })
    }

})


router.post('/postdetails/:id', async (req, res) => {
    try {
        const userName = req.params.id;
        //To add to the posts
        const user = await User.findOne({ "username": userName });
        // console.log(user)
        const post = await Post.findOne({ "pic": user.posts[req.body.picnum] })

        res.status(200).send({ "success": true, "result": post })

    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": false, "status": "Internal Server Error" })
    }


})

// Liking the post route

router.post('/:postId/postlike', fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {
        const postId = req.params.postId;
        await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: userId } // addToSet ensures no duplicates
        });

        res.status(200).json({ "success": true, "message": 'Post liked' });
    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }


})
router.delete('/:postId/unlike', fetchuser, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id

    try {
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: userId } // addToSet ensures no duplicates
        });

        res.status(200).json({ "success": true, "message": 'Post Disliked' });
    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }
});

module.exports = router