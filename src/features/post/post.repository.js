import mongoose from "mongoose";
import { postModel } from "./post.schema.js"; 

export const createPostRepo = async (userId, caption, image, hashtags) => {

    try{
        const post = new postModel({
            user: userId,
            caption: caption,
            image: image,
            hashtags: hashtags
        });

        await post.save()

        if(!post) {
            return { 
                success: false
            };
        } else {
            return {
                success: true,
                res: post
            }
        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400, message: err.message }
        };
    }
      
}



export const getPostsByUserIdRepo = async (userId) => {
    try {
        // Find all posts where the user field matches the provided userId
        const posts = await postModel.find({ user: userId }).sort({ createdAt: -1 });

        // Return success response with the list of posts
        return {
            success: true,
            res: posts
        };
    } catch (err) {
        // Handle and return error response
        return {
            success: false,
            error: { statusCode: 400, message: err.message }
        };
    }
};





export const updatePostRepo = async (postId, newData) => {

    try{
        const updatedPost = await postModel.findByIdAndUpdate(
            postId, 
            newData,
            { new: true, runValidators: true }
        );

        if(!updatedPost) {
            return {
                success: false
            };
        } else {
            return {
                success: true, res: updatedPost 
            };
        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400, message: err.message }
        }
    }
};

export const findPostRepo = async (postId) => {

    try{
        const post = await postModel.findById(postId);

        if(!post) {
            return {
                success: false
            };
        } else {
            return { success: true, res: post };
        }
    } catch(err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }

} 

export const deletePostRepo = async (postId) => {

    try{
        const deletedPost = await postModel.findByIdAndDelete(postId);
       
        if(deletedPost) {
            return {
                success: true, res: deletedPost
            };
        } else {
            return {
                success: false
            };
        }

    } catch(err) {
        return {
            success: true,
            error: { statusCode: 400, message: err.message } 
        };
    }
}