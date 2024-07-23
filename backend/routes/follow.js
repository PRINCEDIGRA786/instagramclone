//Route for the follow and unfollow of some id on the instagram

const express = require('express')
const User = require('../models/User');
const fetchuser = require('../Middleware/fetchUser');
const router = express.Router();

router.post('/follow', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;


        //user followed by someone
        const userfollow = await User.findOne({ "username": req.body.username })
        userfollow.followers.push(userId);
        userfollow.save();


        //user which is folowing someone
        const userfollowing = await User.findById(userId);
        userfollowing.following.push(userfollow.id);
        userfollowing.save();
        // console.log(user)
        if (!userfollow && !userfollowing) {
            res.status(400).send({ "success": false, "status": "User doesn't exist" })
        }
        res.status(200).send({ "success": true, "status": "Following done dona done" })
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send({ "success": true, "status": "Internal Error occurred" })
    }
})
router.post('/unfollow', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // User to be unfollowed
        const userUnfollow = await User.findOne({ "username": req.body.username });

        if (!userUnfollow) {
            return res.status(400).send({ "success": false, "status": "User doesn't exist" });
        }

        // Remove follower from the user being unfollowed
        const indexFollower = userUnfollow.followers.indexOf(userId);
        if (indexFollower > -1) {
            userUnfollow.followers.splice(indexFollower, 1);
        }
        await userUnfollow.save();

        // Remove the user being unfollowed from the user's following list
        const userUnfollowing = await User.findById(userId);
        const indexFollowing = userUnfollowing.following.indexOf(userUnfollow.id);
        if (indexFollowing > -1) {
            userUnfollowing.following.splice(indexFollowing, 1);
        }
        await userUnfollowing.save();

        res.status(200).send({ "success": true, "status": "Unfollow successful" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "success": false, "status": "Internal Error occurred" });
    }
});

//fetch all the followers and the following of some user :
router.post('/fetchfo', async (req, res) => {
    try {
        const userId = req.body.id;

        // User to be unfollowed
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).send({ "success": false, "result": "User doesn't exist" });
        }

        if (req.body.followers) {
            const followers = await User.find({ _id: { $in: user.followers } }, 'username fullname pic');
            return res.status(200).send({ "success": true, "result": followers });
        }

        if (req.body.following) {
            const following = await User.find({ _id: { $in: user.following } }, 'username fullname blueTick pic posts');
            return res.status(200).send({ "success": true, "result": following });
        }

        // If neither followers nor following is provided in the request
        return res.status(400).send({ "success": false, "result": "Invalid request parameters" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "success": false, "result": "Internal Error occurred" });
    }
});




module.exports = router