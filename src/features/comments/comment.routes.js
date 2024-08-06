// createComment, updateComment, getCommentsByPostId, deleteComment

import express from "express";
import { createComment, updateComment, getCommentsByPostId, deleteComment } from "./comment.controller.js";

const commentsRouter = express.Router();

commentsRouter.get( "/comments/:postId:", (req, res) => {
    getCommentsByPostId(req, res);
});

commentsRouter.post( "/comments/:postId:", (req, res) => {
    createComment(req, res);
});

router.delete( "/comments/:commentId:", (req, res) => {
    deleteComment(req, res);
});

commentsRouter.put( "/comments/:commentId:", (req, res) => {
    updateComment(req, res);
});

export default commentsRouter;