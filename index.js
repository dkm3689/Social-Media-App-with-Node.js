import express from "express";
import commentsRouter from "./src/features/comments/comment.routes.js";
import likesRouter from "./src/features/like/like.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import friendshipRouter from "./src/features/friendships/friendship.routes.js";
import { auth } from "./src/middlewares/jwtAuth.js";

const app = express();

app.use("/api", auth, commentsRouter);
app.use("/api", auth, likesRouter);
app.use("/api", auth, postRouter);
app.use("/api", auth, userRouter);

//check if auth is required here or not
app.use("/api", auth, otpRouter);

//check if auth is required here or not
app.use("/api", auth, friendshipRouter);


export default app; 