import {
    getFriendsByUserIdRepo,
    getPendingFriendRequestsRepo,
    createFriendshipRepo,
    deleteFriendshipRepo,
    acceptFriendshipRepo,
    rejectFriendshipRepo
} from "./friendship.repository.js";

// Get all friends of a user
export const getFriendsByUserId = async (req, res) => {
    const { userId } = req.params;
    const result = await getFriendsByUserIdRepo(userId);

    if (result.success) {
        res.status(200).json(result.res);
    } else {
        res.status(result.error.statusCode).json(result.error.message);
    }
};

// Get all pending friend requests for a user
export const getPendingFriendRequests = async (req, res) => {
    const { userId } = req.params;
    const result = await getPendingFriendRequestsRepo(userId);

    if (result.success) {
        res.status(200).json(result.res);
    } else {
        res.status(result.error.statusCode).json(result.error.message);
    }
};

// Toggle friendship status (send or cancel request)
export const toggleFriendship = async (req, res) => {
    const { userId } = req.params;
    const requesterId = req.user._id; // Assume req.user is set by authentication middleware

    // Check existing friendship status
    const existingRequest = await getPendingFriendRequestsRepo(requesterId, userId);
    
    if (existingRequest.success && existingRequest.res.length > 0) {
        // If request exists, cancel it
        const result = await deleteFriendshipRepo(requesterId, userId);
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(result.error.statusCode).json(result.error.message);
        }
    } else {
        // Otherwise, create a new request
        const result = await createFriendshipRepo(requesterId, userId);
        if (result.success) {
            res.status(201).json(result.res);
        } else {
            res.status(result.error.statusCode).json(result.error.message);
        }
    }
};

// Accept or reject a friend request
export const handleFriendRequest = async (req, res) => {
    const { requestId } = req.params;
    const { action } = req.body; // "accept" or "reject"

    if (action === "accept") {
        const result = await acceptFriendshipRepo(requestId);
        if (result.success) {
            res.status(200).json(result.res);
        } else {
            res.status(result.error.statusCode).json(result.error.message);
        }
    } else if (action === "reject") {
        const result = await rejectFriendshipRepo(requestId);
        if (result.success) {
            res.status(200).json(result.message);
        } else {
            res.status(result.error.statusCode).json(result.error.message);
        }
    } else {
        res.status(400).json({ message: "Invalid action" });
    }
};