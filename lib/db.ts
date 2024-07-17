// lib/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    const uri: string | undefined = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("DB connected OK");
    } catch (error) {
        console.error("DB connection error:", error);
        throw error;
    }
};