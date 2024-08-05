import { toggleLikePostRepo, 
        toggleLikeCommentRepo, 
        getLikesCommentRepo, 
        getLikesPostRepo } from "./like.repository.js";


export const getLikesComment = async (req, res, next) => {

    const { commentId } = req.params;
    const resp = await getLikesCommentRepo(commentId);

    try{
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Comment Likes fetched Successfully", 
                data: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Comment Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Fetching Comment Likes";
        next(err);
    }
};



export const getLikesPost = async (req, res, next) => {

    const { postId } = req.params;
    const resp = await getLikesPostRepo(postId);

    try{
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Post Likes fetched Successfully", 
                data: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Post Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Fetching Comment Likes";
        next(err);
    }
};


export const toggleLikePost = async (req, res, next) => {

    //userId is the id of the post owner
    const { postId, likeUserId } = req.params;
    const { likeOwnerId } = req.user._id;
    const resp = await toggleLikePostRepo(postId, likeUserId, likeOwnerId);

    try{
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Post Liked Successfully", 
                data: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Post Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Toggle Liking Post";
        next(err);
    }

};

export const toggleLikeComment = async (req, res, next) => {

    const { postId, userId, commentId } = req.params;
    const { commentOwnerId } = req.user._id;

     //userId is the id of the post owner
    const resp = await toggleLikeCommentRepo(postId, commentId, userId);

    try{
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Comment Liked Successfully", 
                data: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Comment Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Toggle liking Comment";
        next(err);
    }
};