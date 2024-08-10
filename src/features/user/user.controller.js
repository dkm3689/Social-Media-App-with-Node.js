import { userRegistrationRepo, 
         userLoginRepo, 
         updateUserPasswordRepo,
         getDetailsRepo, 
         getAllDetailsRepo, 
         updateDetailsRepo
        } from "./user.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//getDetails, getAllDetails, updateDetails;

export const getDetails = async (req, res, next) => {

    const { userId } = req.user._id;
    const resp = await getDetailsRepo({ userId });

    try{
        if(resp) {
            res.status(200).json({ 
                success: true, 
                message: "User Details fetched successfully", res: resp.res });
        } else {
            res.status(400).send({
                success: false,
                message: "User Details not found"
                });
            }

    } catch(err) {
            err.statusCode = err.statusCode || 400;
            err.message = err.message || "Error Fetching User Details";
            next(err);
            }
};


export const getAllDetails = async (req, res, next) => {

    const { userId } = req.user._id;
    const resp = await getAllDetailsRepo({ userId });

    try{
        if(resp) {
            res.status(200).json({ 
                success: true, 
                message: "User's All Details fetched successfully", 
                res: resp.res });
        } else {
            res.status(400).send({
                success: false,
                message: "User All Details not found"
                });
            }

    } catch(err) {
            err.statusCode = err.statusCode || 400;
            err.message = err.message || "Error Fetching User's All Details";
            next(err);
            }
};


export const updateDetails = async (req, res, next) => {

    const { userId } = req.user._id;
    const { newData } = req.body;
    const resp = await updateDetailsRepo( { userId, newData } );
    try{
        if(resp) {
            res.status(201).json({ 
                success: true, 
                message: "User Details Updated successfully", 
                res: resp.res 
            });
        } else {
            res.status(400).send({
                success: false,
                message: "User Details not found"
                });
            }
    } catch(err) {
            err.statusCode = err.statusCode || 400;
            err.message = err.message || "Error Fetching User Details";
            next(err);
            }
};


//register login logout
export const userRegistration = async (req, res, next) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const resp = await userRegistrationRepo({ ...req.body, hashedPassword });

    try{
        if(resp) {
            res.status(201).json({ 
                success: true, 
                message: "User created successfully", 
                res: resp.res 
            });
        } else {
            res.status(400).send({
                success: false,
                message: "User Not Created"
                });
            }

    } catch(err) {
            err.statusCode = err.statusCode || 400;
            err.message = err.message || "Error Creating Post";
            next(err);
            }
    
    // else {
    //     next(new customErrorHandler( resp.err.message, resp.err.status  ));
    // }

}

export const userLogin = async(req, res, next) => {
    // let { password } = req.body;

    const { userId } = req.user._id;
   const resp = await userLoginRepo(req.body, userId);

   try{
        if(resp.success) {
                const token = jwt.sign(
                    {
                        _id: resp.res._id, user: resp.res
                    },
                    "mysecretkey",
                    {
                        expiresIn: "1h",
                    }
                );

                res.cookie(
                    "jwtToken", token, { maxAge: 1 * 60 * 60 * 24, httpOnly: true}
                ) .json({
                    success: true, message: "user login successful", token
                });
        }  else {
            res.status(400).send({
                success: false,
                message: "Invalid Credentials"
                });
            }

   } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Updating Password";
        next(err);
        }

};

export const userLogOut = (req, res, next) => {
    res.clearCookie("jwtToken").json({ success: true, message: "logout Successful" });
};

export const updateUserPassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const { userId } = req.user._id;
    try {
        const resp = await updateUserPasswordRepo( userId , newPassword);
        if(resp.success) {
            res.status(201).json( {
                success: true, 
                message: "password updated successfully", 
                res: resp.res
            });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Password Not Updated"
                    });
                }

    } catch(err) {
            err.statusCode = err.statusCode || 400;
            err.message = err.message || "Error Updating Password";
            next(err);
        }  
};