import mongoose, { Schema } from "mongoose";

const mood= new Schema({
    MOOD :{type: String , required : true},
    NOTE: String,
    DATE: {type:Date, default:Date.now()}
});

export const Mood = mongoose.model("mood",mood)