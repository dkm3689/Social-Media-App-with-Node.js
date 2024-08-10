import express from 'express';
import { generateOTP, verifyOTP } from './otp.controller.js';

const otpRouter = express.Router();

otpRouter.post('/otp/send', generateOTP);
otpRouter.post('/otp/verify', verifyOTP);

// otpRouter.post('otp/reset-password');

export default otpRouter;