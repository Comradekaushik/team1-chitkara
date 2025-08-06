import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connect successfully")
    } catch (error) {
            console.log(error.message," Mongo Error")
    }
}
export default dbconnect