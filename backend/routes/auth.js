const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchUser');

const JWT_SECRET = "JAISHREERAM"


// ROUTE 1: Create a user using :POST "/api/auth/createuser". Doesn't required authentication

router.post('/signup',
    async (req, res) => {
        // let success = false;
        const salt = await bcrypt.genSalt(10);
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email  already exists" })
            }
            const secpass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                email: req.body.email,
                // password: req.body.password, As now we will store the password with bcryptjs....salt...
                fullname: req.body.fullname,
                username: req.body.username,
                password: secpass,
            })
            const data = {
                user: {
                    id: user.id
                }

            }
            // success = true
            const authToken = jwt.sign(data, JWT_SECRET)
                /
                res.json({ "success": true, "authtoken": authToken })
            // res.json({ "success": success }) Now we will send the authtoken ...as above line bro
        }

        catch (error) {
            console.error(error.message)
            res.status(500).send("INTERNAL SERVER ERROR")
        }
    })

//Route 2: For the login of the user
router.post('/login',
    async (req, res) => {
        let success = false;

        const { email, password } = req.body;
        try {

            let user = await User.findOne({
                $or: [
                    { email: email },
                    { username: email },
                    { phonenumber: email }
                ]
            });
            if (!user) {
                return res.status(400).json({ error: "Try login Using correct ceredentials!! Please" })
            }

            const passwordverify = await bcrypt.compare(password, user.password)
            if (!passwordverify) {
                return res.status(400).json({ error: "Email or Password is Incorrect" })
            }
            const data = {
                user: {
                    id: user.id
                }

            }
            success = true
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ "success": success, "authtoken": authToken })

        }

        catch (error) {
            console.error(error.message)
            res.status(500).send("INTERNAL SERVER ERROR")
        }
    })


//3rd route to get the user data from the mongodb database

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        // console.log(user)
        res.send(user)
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send("INTERNAL SERVER ERROR")
    }

})


// get the other user by it's username
router.get('/userPage/:id', async (req, res) => {
    try {
        const username = req.params.id;
        const user = await User.findOne({ "username": username }).select("-password")
        // console.log(user)
        res.send(user)
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send("INTERNAL SERVER ERROR")
    }

})

// To get all the users blueTick and without blueTick both
router.post('/allusers', fetchuser, async (req, res) => {
    try {
        // Assuming req.user.id contains the ID of the current user
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) {
            return res.status(404).send({ "success": false, "result": "User not found" });
        }

        // Extract the IDs of the users that the current user is following
        const followingIds = currentUser.following;
        // Add the current user's ID to the list of IDs to exclude
        followingIds.push(currentUserId);

        let users;
        if (req.body.blueTick === true) {
            users = await User.find({
                "blueTick": true,
                "_id": { $nin: followingIds }
            });
        }
        else if (req.body.blueTick === false) {
            users = await User.find({
                "blueTick": { $ne: true },
                "_id": { $nin: followingIds }
            });
        }
        else {
            users = await User.find(
                { "_id": { $ne: currentUserId } },
                "pic username fullname"
            );

        }

        return res.json({ "success": true, "result": users });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "success": false, "result": "Internal Server Error" });
    }
});


// to get the id, name ,pic and the fullname of the users whom the current user messaged...
router.get('/messaged', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("messaged");
        const messagedUserIds = user.messaged;

        // Fetch the details of each user
        const messagedUsers = await User.find({ _id: { $in: messagedUserIds } }).select('username pic fullname');

        res.send({ "success": true, "result": messagedUsers });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ "success": false, "result": "INTERNAL SERVER ERROR" });
    }
});



module.exports = router;