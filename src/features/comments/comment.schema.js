import mongoose from "mongoose";


const commentSchema = new mongoose.schema ({

    content: {
        type: String,
        required: true
    },

    //the one who commented
    user: {
        type: mongoose.Schema.types.ObjectId,
        ref: "user",
        required: true
    },

    //post on which comment is made
    post: {
        type: mongoose.Schema.types.ObjectId,
        ref: "post",
        required: true
    },

    //users who liked
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "like"
    }],

    //post owners
    parentPostUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

export const commentModel = new mongoose.model("comment", commentSchema);