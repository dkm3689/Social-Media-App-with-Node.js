import mongoose from "mongoose";
import { friendshipModel } from "./friendship.schema.js";

// Get all friends of a user
export const getFriendsByUserIdRepo = async (userId) => {
    try {
        const friendships = await friendshipModel.find({
            $or: [
                { requester: userId, status: 'accepted' },
                { requestee: userId, status: 'accepted' }
            ]
        }).populate('requester requestee');

        return {
            success: true,
            res: friendships.map(friendship => 
                friendship.requester._id.toString() === userId ? friendship.requestee : friendship.requester
            )
        };
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};

// Get pending friend requests for a user
export const getPendingFriendRequestsRepo = async (userId) => {
    try {
        const requests = await friendshipModel.find({
            requestee: userId,
            status: 'pending'
        }).populate('requester');

        return { success: true, res: requests };
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};

// Create a friendship request
export const createFriendshipRepo = async (requesterId, requesteeId) => {
    try {
        const existingRequest = await friendshipModel.findOne({ 
            requester: requesterId, 
            requestee: requesteeId 
        });

        if (existingRequest) {
            return { success: false, error: { statusCode: 400, message: "Friendship request already exists" } };
        }

        const newFriendshipRequest = new friendshipModel({ 
            requester: requesterId,
            requestee: requesteeId,
            status: 'pending'
        });

        const savedRequest = await newFriendshipRequest.save();
        return { success: true, res: savedRequest };
    } catch (err) {
        return { success: false, error: { statusCode: 500, message: "Error creating friendship request" } };
    }
};

// Delete a friendship request or friendship
export const deleteFriendshipRepo = async (requesterId, requesteeId) => {
    try {
        const deletedFriendship = await friendshipModel.findOneAndDelete({
            $or: [
                { requester: requesterId, requestee: requesteeId },
                { requester: requesteeId, requestee: requesterId }
            ]
        });

        if (deletedFriendship) {
            return { success: true, message: "Friendship deleted successfully" };
        } else {
            return { success: false, error: { statusCode: 404, message: "Friendship not found" } };
        }
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};

// Accept a friendship request
export const acceptFriendshipRepo = async (requestId) => {
    try {
        const updatedRequest = await friendshipModel.findByIdAndUpdate(
            requestId,
            { status: 'accepted' },
            { new: true }
        );

        if (updatedRequest) {
            return { success: true, res: updatedRequest };
        } else {
            return { success: false, error: { statusCode: 404, message: "Friendship request not found" } };
        }
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};

// Reject a friendship request
export const rejectFriendshipRepo = async (requestId) => {
    try {
        const deletedRequest = await friendshipModel.findByIdAndDelete(requestId);

        if (deletedRequest) {
            return { success: true, message: "Friendship request rejected" };
        } else {
            return { success: false, error: { statusCode: 404, message: "Friendship request not found" } };
        }
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};
