import express from "express";
import { newPost, updatePost, getPost, deletePost } from "./post.controller.js";

const postRouter = express.Router();

// const 

// newPost, updatePost, getPosts, deletePost

postRouter.post("/post/", (req, res) => {
    newPost(req, res);
});

postRouter.put("/post/:postId:", (req, res) => {
    updatePost(req, res);
});

postRouter.get("/post/:postId:", (req, res) => {
    getPost(req, res);
});

postRouter.delete("/post/:postId:", (req, res) => {
    deletePost(req, res);
});

export default postRouter;