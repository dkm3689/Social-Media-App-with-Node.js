import mongoose from "mongoose";
import userModel from "./user.schema.js";
import { compareHashedPassword } from "../../util/hashPassword.js";

export const userRegistrationRepo = async(userData) => {

    try{
        const newUser = new userModel(userData);
        await newUser.save();

        if(!newUser) {
            return { success: false };
        } else {
            return { success: true, res: newUser };
        }

    } catch (err) {
        return { success: false, error: { statusCode: 400, message: err.message } };
    }
};


export const userLoginRepo = async(userData, userId) => {

    try{   
        const { email, password } = userData;
        const user = await userModel.findOne({ email: email });

        if(!user) {
            return { 
                success: false,      
            };
        } else {
            let passwordValidation = await compareHashedPassword(password, user.password);
            if(passwordValidation) {
                userModel.loggedInUsers.set(userId, user.name);
                return { success: true, res: user};
            } else {
                return {
                    success: false,
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

export const updateUserPasswordRepo = async(userId, newPassword) => {

    try{
        const user = await userModel.findById(userId);
        if(user){
            const newHashedPassword  = await hashPassword(newPassword);
            user.password = newHashedPassword;
            let updatedUser = await user.save();
            return { success: true, res: updatedUser};
        } else {
            return { 
                success: false, 
                error: { statusCode: 404, message: "user not found"} 
        };

        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400 , message: err.message},
        };
    }
};


export const getDetailsRepo = async({ userId, field }) => {

    try{
        const user = await userModel.findById(userId).select(field).exec();  //exec returns a promise
        if(user){
            return { success: true, res: user};
        } else {
            return { 
                success: false, 
                error: { statusCode: 404, message: "user not found"} 
        };

        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400 , message: err.message},
        };
    }

};



export const getAllDetailsRepo = async({ userId }) => {

    try{
        const user = await userModel.findById(userId).exec();  //exec returns a promise
        if(user){
            return { success: true, res: user};
        } else {
            return { 
                success: false, 
                error: { statusCode: 404, message: "user not found"} 
        };

        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400 , message: err.message},
        };
    }

};


export const updateDetailsRepo = async({ userId, newData }) => {

    try{
        const updatedUser = await userModel.findByIdAndUpdate( userId, newData, {
            new: true,
            runValidators: true
        });

        const user = await userModel.findById(userId);  //exec returns a promise
        if(user){
            return { success: true, res: user};
        } else {
            return { 
                success: false, 
                error: { statusCode: 404, message: "user not found"} 
        };

        }
    } catch(err) {
        return {
            success: false,
            error: { statusCode: 400 , message: err.message},
        };
    }
};