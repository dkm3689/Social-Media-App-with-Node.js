import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, "name is required" ],
        minLength: [3, "min length of name should be 3" ]
    },

    mobile: {
        type: String,
        required: [ true, "mobile number is required"],
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/]
    },

    age: {
        type: Number,
        required: true,
        validate: {
            validator: function(userAge) {
                return userAge > 0 && userAge <= 100;
            },
            message: "age should be between 0 and 100",
        },
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],

    loggedInUsers: [{
        type: Map,
        of: String,
        default: new Map()
    }]

});

const userModel = mongoose.Schema("user", userSchema);
export default userModel;