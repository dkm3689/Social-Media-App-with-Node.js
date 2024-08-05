import mongoose from "mongoose";
import { likeModel } from "./like.schema.js";
import { postModel } from "../post/post.schema.js";
import { userModel } from "../user/user.schema.js";
import { commentModel } from "../comments/comment.schema.js";

export const getLikesCommentRepo = async(commentId) => {

  try{
    const comment = await commentModel.findById(commentId);
    // const user = await userModel.findById(userId);

    const commentLikes = comment.likes;

    if(commentLikes.length > 0) {
      return {
        success: true,
        res: commentLikes
      }
      
    } else {
        return {
          success: false
        }
    }
  } catch(err) {
        return {
          success: false,
          error: { statusCode: 400, message: "Error toggling like Post" }
        }
  }

};



export const getLikesPostRepo = async(postId) => {

  try{
    const post = await postModel.findById(postId);
    // const user = await userModel.findById(userId);

    const postLikes = post.likes;

    if(postLikes.length > 0) {
      return {
        success: true,
        res: postLikes
      }
      
    } else {
        return {
          success: false
        }
    }
  } catch(err) {
        return {
          success: false,
          error: { statusCode: 400, message: "Error toggling like Post" }
        }
  }


};








export const toggleLikePostRepo = async (postId, userId, likeOwnerId) => {

  try{
      const post = await postModel.findById(postId);
      // const user = await userModel.findById(userId);

      const isLiked = post.likes.includes(likeOwnerId);

      if(isLiked)  {
        const resp = await postModel.updateOne(
          { _id: postId },
          { $pull: { like: likeOwnerId } }
        );
        return {
          success: true,
          message: "Like removed successfully"
        }
        
      } else {
          const resp = post.likes.push(likeOwnerId);
          return {
            success: true,
            message: "post liked successfully"
          }
      }
    } catch(err) {
          return {
            success: false,
            error: { statusCode: 400, message: "Error toggling like Post" }
          }
    }
};

export const toggleLikeCommentRepo = async (postId, userId, likeOwnerId) => {

  try{
      //populate comments in the post instead of just comment ids tat are stored
      const post = await postModel.findById(postId).populate('comments');
      // const user = await userModel.findById(userId);
      const comments = post.comments;

      //check for all the comment likes if user with userId is there or not
      const isLiked = comments.some( comment =>
        comment.likes.includes(userId)
      );
      // const isLiked = post.comments.user.includes(likeOwnerId);

      if(isLiked)  {
        const resp = post.likes.remove(likeOwnerId);
        return {
          success: true,
          message: "Like removed successfully"
        }

      } else {
          const resp = post.likes.add(likeOwnerId);
          return {
            success: true,
            message: "post liked successfully"
          }
      }
      
    } catch(err) {
          return {
            success: false,
            error: { statusCode: 400, message: "Error toggling like Post" }
          }
       }
  };