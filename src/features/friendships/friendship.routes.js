import express from "express";
import {
    getFriendsByUserId,
    getPendingFriendRequests,
    toggleFriendship,
    handleFriendRequest
} from "./friendship.controller.js";

const friendshipRouter = express.Router();

// Get all friends of a user
friendshipRouter.get("/friends/get-friends/:userId", (req, res) => {
    getFriendsByUserId(req, res);
});

// Get all pending friend requests for a user
friendshipRouter.get("/friends/get-pending-requests", (req, res) => {
    getPendingFriendRequests(req, res);
});

// Toggle friendship status (send or cancel request)
friendshipRouter.post("/friends/toggle-friendship/:friendId", (req, res) => {
    toggleFriendship(req, res);
});

// Accept or reject a friend request
friendshipRouter.put("/friends/response-to-request/:friendId", (req, res) => {
    handleFriendRequest(req, res);
});

export default friendshipRouter;