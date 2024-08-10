import { createPostRepo, 
        getPostsByUserIdRepo, 
        updatePostRepo, 
        findPostRepo, 
        deletePostRepo } from "./post.repository.js";

export const newPost = async (req, res, next) => {

    try {
        const { caption, image, hashtags } = req.body;
        const userId = req.user._id

        const resp = await createPostRepo(userId, caption, image, hashtags);
        if(resp.success) {
            res.status(201).send({
                success: true,
                message: "Post Created Successfully", 
                res: resp.res
        });
    }   else {
        res.status(400).send({
            success: false,
            message: "Post Not Created"
            });
        }

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Creating Post";
        next(err);
    }
};


// Controller function to get posts by user ID
export const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;

    const result = await getPostsByUserIdRepo(userId);

    if (result.success) {
        res.status(200).json(result.res);
    } else {
        res.status(result.error.statusCode).json(result.error.message);
    }
};





export const updatePost = async (req, res, next) => {

    const { postId } = req.params.id;
    // const { userId, caption, image, hashtags } = req.body;

    try {
        const resp = await updatePostRepo(postId , req.body);
        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "Post Updated Successfully", 
                res: resp.res
        });
    }   else {
            res.status(404).send({
                success: false,
                message: "Post Not Found"
            });
    }

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Deleting Post";
        next(err);
    }
 
};

export const getPosts = async (req, res, next) => {

    const { postId } = req.params.id;

    try {
        const resp = await findPostRepo(postId);
        if(resp.success) {
            res.status(200).send({
            success: true,
            message: "Post Found Successfully", 
            res: resp
                });
        }else {
            res.status(404).send({
            success: false,
            message: "Post Not Found"
        });
             }   
    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Deleting Post";
        next(err);
        }
};


export const deletePost = async (req, res, next) => {

    const postId = req.params.id;

    try {
        const resp = await deletePostRepo(postId);
        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "Post Deleted Successfully", 
                res: resp
          });
        } else {
            res.status(404).send({
                success: false,
                message: "Post Not Found"
            });
        }

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Deleting Post";
        next(err);
    }
};