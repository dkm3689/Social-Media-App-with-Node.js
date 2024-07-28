import mongoose from "mongoose";

const postSchema = new mongoose.Schema ({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    caption: {
        type: String,
    },

    image: {
        type: String,  //URL to image path
        default: null
    },

    hashtags: [{
        type: String
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

const postModel = new mongoose.Schema("post", postSchema);
export default postModel;