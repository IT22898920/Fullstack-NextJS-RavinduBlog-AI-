import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
        return true;
    } catch (error) {
        console.error("Error connecting to MongoDB",error);
        process.exit(1);
    }
};