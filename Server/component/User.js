import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    firstName: { type: String, required: ['First name is required'] },
    lastName: { type: String, required: ['Last name is required'] },
    email: { type: String, required: ['Email is required'] },
    password: { type: String, required: ['Password rakh le bhai'] },   
},
    {
        timestamps:true
    }
);

export default new mongoose.model('User', UserSchema);