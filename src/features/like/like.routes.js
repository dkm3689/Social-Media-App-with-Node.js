import express from "express";
import { getLikesComment, getLikesPost, toggleLikePost, toggleLikeComment } from "./like.controller.js";

const likesRouter = express.Router();

likesRouter.get("/like/:commentId:", (req, res) => {
    getLikesComment(req, res);
});

likesRouter.get("/like/:postId:", (req, res) => {
    getLikesPost(req, res);
});

likesRouter.post("/like/:commentId:", (req, res) => {
    toggleLikeComment(req, res);
});

likesRouter.post("/like/:postId:", (req, res) => {
    toggleLikePost(req, res);
});

export default likesRouter;