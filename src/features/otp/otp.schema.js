const mongoose = require('mongoose');

const OTP_Schema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' }, // expires in 15 minutes
});

const OTPModel = mongoose.model('OTP', OTP_Schema);
export default OTPModel;