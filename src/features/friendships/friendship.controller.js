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
    const resp = await getFriendsByUserIdRepo(userId);

    try{
        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "Friend Get Successfully", 
                res: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Friend Request Not Found"
                });
            }
    }    catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Getting Friend Request";
        next(err);
        }

   };

// Get all pending friend requests for a user
export const getPendingFriendRequests = async (req, res) => {
    const { userId } = req.params;
    const resp = await getPendingFriendRequestsRepo(userId);

    try{
        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "Pending friend request got successfully", 
                res: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Pending Friend Request Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Getting Pending Friend Request";
        next(err);
        }

};

// Toggle friendship status (send or cancel request)
export const toggleFriendship = async (req, res) => {
    const { userId } = req.params;
    const requesterId = req.user._id; // Assume req.user is set by authentication middleware

    // Check existing friendship status
    const existingRequest = await getPendingFriendRequestsRepo(requesterId, userId);

    try {

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

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Toggling Friendship";
        next(err);
        }
    

};

// Accept or reject a friend request
export const handleFriendRequest = async (req, res) => {
    const { requestId } = req.params;
    const { action } = req.body; // "accept" or "reject"


    try{
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
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Handling Friend Request";
        next(err);
        }

};