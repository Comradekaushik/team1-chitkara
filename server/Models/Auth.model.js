import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true, 
        unique: true,
    },
    name:{
        type: String, 
        require: true,
    },
    username:{
        type: String,
        require: true, 
    },
    password:{
        type: String,
        require: true, 
    },
    role:{
        type: String,
        enum: ["user", "organiser"],
        require: true,
    },
    token:{
        type: String,
        require: true,
    }
},{timestamps: true});

const auth = mongoose.model("Auth", authSchema);
export default auth;