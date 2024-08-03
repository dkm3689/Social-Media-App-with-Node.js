// createComment, updateComment, getCommentsByPostId, deleteComment

import express from "express";
import { createComment, updateComment, getCommentsByPostId, deleteComment } from "./comment.controller.js";

const router = express.Router();

router.get( "/comments/:postId:", (req, res) => {
    getCommentsByPostId(req, res);
});

router.post( "/comments/:postId:", (req, res) => {
    createComment(req, res);
});

router.delete( "/comments/:commentId:", (req, res) => {
    deleteComment(req, res);
});

router.put( "/comments/:commentId:", (req, res) => {
    updateComment(req, res);
});