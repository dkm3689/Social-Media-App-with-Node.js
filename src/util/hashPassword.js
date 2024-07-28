import bcrypt from 'bcrypt';
import { customErrorHandler } from '../middlewares/errorHandler';

export const hashPassword = async ( password, next ) => {

    try {
        return await bcrypt.hash(password, 12);
    } catch(err) {
        next( new customErrorHandler( 400, "encountered error in hashing password"));
    }
};

export const compareHashedPassword = async (password, hashPassword, next) => {
   
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch(err) {
        next(new customErrorHandler( 400, "unable to compare passwords"));
    }
};