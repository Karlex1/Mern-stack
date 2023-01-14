import mongoose  from "mongoose";

export async function DbConn(){
    // mongoose for db connection M.
    // connection is promise .
    await mongoose.connect("mongodb+srv://sanchit:pass231020@mern-stack.tzfiyj1.mongodb.net/?retryWrites=true&w=majority").then(() => { console.log("Database connected!"); }).catch((err) => { console.error(err); })
}