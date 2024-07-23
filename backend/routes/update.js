const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User');
const fetchuser = require('../Middleware/fetchUser');
const router = express.Router();

router.post('/updatepic', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(
            { "_id": userId },
            { $set: { "pic": req.body.pic } },
            { new: true }
        )
        const post = await Post.findByIdAndUpdate(
            { "_id": userId },
            { $set: { "pic": req.body.pic } },
            { new: true }
        )
        // console.log(user)
        if (!user && !post) {
            res.status(400).send({ "success": false, "status": "Failed to update the pic" })
        }
        res.status(200).send({ "success": true, "pic": user.pic })
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": false, "status": "Internal Error occurred" })
    }
})


//This is the route for the story uploading...........

router.post('/story', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId)
        user.story.push({ "pic": req.body.pic, "music": req.body.music })

        user.stories.push({ "pic": req.body.pic, "music": req.body.music, "date": Date.now() })
        // console.log(user)
        user.save();
        if (!user) {
            res.status(400).send({ "success": false, "status": "Failed to update the pic" })
        }
        res.status(200).send({ "success": true, "status": "Story uploaded" })
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": false, "status": "Internal Error occurred" })
    }
})

// for edit of the profile and
router.post('/edit', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(
            { "_id": userId },
            { $set: { "bio": req.body.bio, "username": req.body.username, "fullname": req.body.fullname } },
            { new: true }
        )

        if (!user) {
            res.status(400).send({ "success": false, "status": "failed to update" })
        }
        res.status(200).send({ "success": true, "status": "Updated successfully" })
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": false, "status": "Internal Error occurred" })
    }
})



module.exports = router