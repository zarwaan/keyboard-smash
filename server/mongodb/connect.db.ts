import { KSEnv } from "../envConfig";
import mongoose from "mongoose";

const dbUri = KSEnv.MONGODB_URI;
if(!dbUri){
    console.error("No env var found!")
    process.exit(1);
}

export const connectDB = async () => {   
    try {
        const conn = await mongoose.connect(dbUri);
        console.log("MongoDB conneced to "+conn.connection.name);
    }
    catch (e) {
        console.error("Failed to connect")
        console.error(e);
        process.exit(1);
    }
}