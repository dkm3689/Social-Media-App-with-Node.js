import mongoose from "mongoose";
import commentModel from "./comment.schema.js";

//create comment
export const createCommentRepo = async (newComment) => {

    try{
        const newCommentDocument = new commentModel(newComment);
        await newCommentDocument.save();
        return { success: true, res: newCommentDocument } ;
    } catch(err) {

        return { success: false, error: { statusCode: 400, message: err } };

        return {
            success: false,
            error: {
                statusCode: 400,
                message: err
            }
        }
    }
};


//get comments by post Id
export const getCommentsByPostIdRepo = async (postId, commentId) => {
    
    try {
        let query = commentModel.find({ postId: postId });
        if(commentId) {
            query = query.or([{ _id: commentId }, { parentId: commentId }]);
        }
    } catch(err) {

        return { success: false, error: { statusCode: 400, message: err } };

        return {
            success: false,
            error: {
                statusCode: 400,
                message: err
            }
        }
    }

};


export const deleteCommentRepo = async (commentId) => {
    
    const deletedComment =  await commentModel.deleteComment(commentId);

    try{
        if(deletedComment) {
            return { success: true, message: "Comment deleted successfully", res: deletedComment } ;
        } else {
            return { success: false, error: { statusCode: 404, message: "Comment not found" } };
        }
    } catch(err) {
        return { success: false, error: { statusCode: 400, message: err } };
    }

};


export const updateCommentRepo = async () => {
    const updatedComment = await commentModel.findByIdAndUpdate(commentId, comment);

    try{
        if(updatedComment) {
            return { success: true, res: updatedComment } ;
        } else {
            return { success: false, error: { statusCode: 404, message: "Comment not found" } };
        }
    } catch(err) {
        return { success: false, error: { statusCode: 400, message: err } };
    }
};