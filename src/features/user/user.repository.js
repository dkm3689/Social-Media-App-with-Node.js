import mongoose from "mongoose";
import userModel from "./user.schema.js";
import { compareHashedPassword } from "../../util/hashPassword.js";


export const userRegistrationRepo = async(userData) => {

    try{
        const newUser = new userModel(userData);
        await newUser.save();
        return { success: true, res: newUser } ;
    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err } };
    }
};



export const userLoginRepo = async(userData) => {

    try{   
        const { email, password } = userData;
        const user = await userModel.findOne({ email });

        if(!user) {
            return { 
                success: false, 
                error: { statusCode: 404, message: 'User not found' },     
            };
        } else {
            let passwordValidation = await compareHashedPassword(password, user.password);
            if(passwordValidation) {
                return { success: true, res: user};
            } else {
                return {
                    success: false,
                    error: { statusCode: 400, message: 'Invalid password'},
                        }
                 }
                } 
        } catch(err) {
            return {
                success: false,
                error: { statusCode: 400, message: err.message},
            };
        }    
};

export const updateUserPasswordRepo = async(_id, newPassword, next) => {

    try{
        const user = await userModel.findById(_id);
        if(user){
            const newHashedPassword  = await hashPassword(newPassword, next);
            user.password = newHashedPassword;
            let updatedUser = await user.save();
            return { success: true, updatedUser: updatedUser};
        } else {
            return { 
                success: false, 
                error: { statusCode: 404, message: "user not found"} 
        };

        }
    } catch(error) {
        return {
            success: false,
            error: { statusCode: 400 , message: error },
        };
    }
};
