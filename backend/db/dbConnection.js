import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("mongoose res:", res)
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}

export default connectDb;