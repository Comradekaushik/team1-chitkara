import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    location: {
        type: String, 
        require: true,
    },
    description: {
        type: String, 
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    eventName: {
        type: String, 
        require: true,
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
},{timestamps: true});

const event = mongoose.model("Event", eventSchema);
export default event;