import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "types",
        required: true
    },

    types: {
        type: mongoose.Schema.Types.String,
        enum: ["post", "comment"],
        default: "post",
        required: true
    }

});

const likeModel = new mongoose.model("like", likeSchema);
export { likeModel };