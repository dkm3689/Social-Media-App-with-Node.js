import OTPModel from "./otp.schema.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {

//check this
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const generateOTPRepo = async (email) => {

  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    await OTPModel.findOneAndUpdate({ email }, { otp }, { upsert: true });

    await transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    return ({ success: true, res: otp });


  } catch(err) {
    return {
        success: false,
        error: { statusCode: 400, message: err.message }
    };
}

};

export const verifyOTPRepo = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await OTPModel.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return ({ success: false });
    }
    await OTPModel.deleteOne({ email }); // Remove OTP after verification
    return ({ success: true, res: otpRecord });
  } catch(err) {
    return {
        success: false,
        error: { statusCode: 500, message: err.message }
    };
}
  
};