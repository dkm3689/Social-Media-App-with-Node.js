import express from "express";
import { getLikesComment, getLikesPost, toggleLikePost, toggleLikeComment } from "./like.controller.js";

const router = express.Router();

router.get("/like/:commentId:", (req, res) => {
    getLikesComment(req, res);
});

router.get("/like/:postId:", (req, res) => {
    getLikesPost(req, res);
});


router.post("/like/:commentId:", (req, res) => {
    toggleLikeComment(req, res);
});

router.post("/like/:postId:", (req, res) => {
    toggleLikePost(req, res);
});