import mongoose from mongoose;

const baseURL = process.env.MONGODB || "mongodb://localhost:27017";

export const connect = async () => {
    try{
        await mongoose.connect(`mongoDB://${baseURL}//socialMedia`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch(err) {
        console.log("Not able to connect", err);
    }
};