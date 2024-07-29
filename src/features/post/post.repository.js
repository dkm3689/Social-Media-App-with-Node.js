import mongoose from "mongoose";
import postModel from "./post.schema.js"; 

export const createPostRepo = async (newPost) => {
    const post = new postModel(newPost);
    await post.save()

    if(post) {
        return { success: true, message: "Post Created Successfully", data: post }
    }

    return post;
}

export const updatePostRepo = async (postId, newData) => {
    const updatedPost = await postModel.findByIdAndUpdate(
        postId, 
        newData,
        { new: true, runValidators: true }
    );
    return updatedPost;
}

export const findPostRepo = async (postId) => {
    const post = await postModel.findById(postId);
    return post;
} 

export const deletePostRepo = async (postId) => {
    const deletedPost = await postModel.findByIdAndDelete(postId);
    return deletePost;
}