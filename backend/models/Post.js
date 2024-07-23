const mongoose = require('mongoose')
const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    caption: {
        type: String,
    },
    pic: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;