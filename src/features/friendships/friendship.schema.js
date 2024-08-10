import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' }
}, { timestamps: true });

const friendshipModel = mongoose.model('Friendship', friendshipSchema);
export default friendshipModel;