import {
    generateOTPRepo,
    verifyOTPRepo
} from './otp.respository.js';


export const generateOTP = async (req, res, next) => {

    try {
        const { email } = req.body;
        const resp = await generateOTPRepo(email);

        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "OTP generated and sent to mail Successfully", 
                res: resp.res
        });
    }   else {
        res.status(400).send({
            success: false,
            message: "OTP Not Generated"
            });
        }

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Generating OTP";
        next(err);
    }

    // await sendOTP(phoneNumber, otp);
    // return otp;
};


export const verifyOTP = async(req, res, next) => {

    try {
        const { email } = req.body;
        const resp = await verifyOTPRepo(email, otp);

        if(resp.success) {
            res.status(200).send({
                success: true,
                message: "OTP Verified Successfully", 
                res: resp.res
        });
    }   else {
        res.status(400).send({
            success: false,
            message: "Invalid OTP"
            });
        }

    } catch(err) {
        err.statusCode = err.statusCode || 400;
        err.message = err.message || "Error Verifying OTP";
        next(err);
    }


}