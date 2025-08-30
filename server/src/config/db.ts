import mongoose from 'mongoose';

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || "your_mongo_uri";
    try{
        await mongoose.connect(MONGO_URI, {dbName: "learningPlatform"});
        console.log("MongoDB connected successfully!");
    }catch(error){
        console.log("MongoDB connection error", error);
        process.exit(1);
    }

}