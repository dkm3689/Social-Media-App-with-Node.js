import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' }
}, { timestamps: true });

const friendshipModel = mongoose.model('Friendship', friendshipSchema);
export default friendshipModel;