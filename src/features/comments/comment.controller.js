import { createCommentRepo, 
        updateCommentRepo, 
        getCommentsByPostIdRepo, 
        deleteCommentRepo
     } from "./comment.repository";

//create comment
export const createComment = async (req, res, next) => {
    
    const { commentData } = req.body;
    const postId = req.params.postId;
    const userId = req.user._id;

    if( !postId || !commentData ) {
        res.status(400).send({
            success: false,
            message: "Post ID and Comment Data are required"
        });
    }

   const resp = await createCommentRepo(postId, userId, commentData);

   try{ 
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Comment Created Successfully", 
                data: resp.res
                    });
            } else {
            res.status(400).send({
                success: false,
                message: "Post Not Found"
                });
            }
    } catch(err) {
        console.log(err);
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Creating Comment";
        next(err);
    }
};

//update comment
export const updateComment = async (req, res, next) => {

    const { newComment } = req.body;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const resp = await updateCommentRepo(postId, userId, commentId, newComment);

    try{ 
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Comment Updated Successfully", 
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
        err.message = err.message || "Error Updating Comment";
        next(err);
    }


}


//get comments
export const getCommentsByPostId = async (req, res, next) => {

    const { postId, commentId } = req.params;
    const resp = await getCommentsByPostIdRepo(postId, commentId);

    try{
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Comment Found Successfully", 
                data: resp.res
                    });
            } else {
            res.status(404).send({
                success: false,
                message: "Post/Comment Not Found"
                });
            }
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Finding Comment";
        next(err);
    }

};


//delete comment
export const deleteComment = async(req, res, next) => {
    const { commentId} = req.params.commentId;
    const resp = await deleteCommentRepo(commentId);

    try{
        if(resp.success) {
            res.status(204).send({
                success: true,
                message: "Comment Deleted Successfully", 
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
        err.message = err.message || "Error Deleting Comment";
        next(err);
        }
};