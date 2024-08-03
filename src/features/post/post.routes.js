import express from "express";
import { newPost, updatePost, getPost, deletePost } from "./post.controller.js";

const router = express.Router();

// const 

// newPost, updatePost, getPosts, deletePost

router.post("/post/", (req, res) => {
    newPost(req, res);
});

router.put("/post/:postId:", (req, res) => {
    updatePost(req, res);
});

router.get("/post/:postId:", (req, res) => {
    getPost(req, res);
});

router.delete("/post/:postId:", (req, res) => {
    deletePost(req, res);
});