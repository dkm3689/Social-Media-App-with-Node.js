// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const baseURL = process.env.MONGODB || "mongodb://localhost:27017";

// export const connectToDB = async () => {
//     try{
//         await mongoose.connect(`mongoDB://${baseURL}//socialMedia`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//     }catch(err) {
//         console.log("Not able to connect", err);
//     }
// };

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.MONGODB || "mongodb://localhost:27017";

export const connectToDB = async () => {
    try {
        // Correct the connection string
        await mongoose.connect(`${baseURL}/socialMedia`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Not able to connect", err);
    }
};
