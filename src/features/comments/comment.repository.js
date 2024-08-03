import mongoose from "mongoose";
import { commentModel } from "./comment.schema.js";
import { postModel } from "../post/post.schema.js";

//create comment
export const createCommentRepo = async (postId, userId, commentData) => {

    try{
        const newCommentDocument = new commentModel({ 
            content: commentData,
            user: userId,
            post: postId
        });

        const savedComment = await newCommentDocument.save();

        if(savedDocument) {
            return { success: true, res: newCommentDocument } ;
        } 
        
    } catch(err) {
        return { success: false, error: { statusCode: 500, message: "error creating comment" } };
    }
};


//get comments by post Id
export const getCommentsByPostIdRepo = async (postId, commentId) => {
    
    try {
        // let query = postModel.findById({ post: postId });

        const requiredComments = await postModel.findById(postId).populate('comments');

        if(requiredComments) {
            return {
                success: true,
                res: requiredComments.comments
            }
        } else {
            return {
                success: false
            }
        }

        // let query = commentModel.find({ post: postId });
        // query = query.or([{ _id: commentId }, { post: postId }]);

    } catch(err) {  
        return { success: false, error: { statusCode: 400, message: err.message } };
    }

};


export const deleteCommentRepo = async (commentId) => {
    
    const deletedComment =  await commentModel.findByIdAndDelete(commentId);

    try{
        if(deletedComment) {
            return { success: true, message: "Comment deleted successfully", res: deletedComment } ;
        } else {
            return { success: false };
        }
    } catch(err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }

};


export const updateCommentRepo = async () => {
    const updatedComment = await commentModel.findByIdAndUpdate(
        commentId, 
        comment,
        { new: true, runValidators: true }
    );

    try{
        if(updatedComment) {
            return { success: true, res: updatedComment } ;
        } else {
            return { success: false };
        }
    } catch(err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};