const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Story schema
const StorySchema = new Schema({
    music: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Define the User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pic: {
        type: String
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    },
    bio: {
        type: String
    },
    posts: {
        type: Array
    },
    blueTick: {
        type: Boolean,
        default: false
    },
    story: [StorySchema] // Embed Story schema as an array;
    ,
    stories: {
        type: Array
    },
    messaged: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
