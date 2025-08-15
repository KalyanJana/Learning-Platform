import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) throw new Error("MONGO_URI missing");
    await mongoose.connect(uri,  {dbName: "learningPlatform",});
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
}

