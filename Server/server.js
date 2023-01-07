import express from "express";
import mongoose from "mongoose";

const app = express();
const Port=4000;

// mongoose for db connection M.
// connection is promise .
await mongoose.connect("mongodb+srv://sanchit:pass231020@mern-stack.tzfiyj1.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("Database connected!");}).catch((err)=>{console.error(err);})



app.get(
    "/",(req,res)=>{res.send('Hello World!');}
);
app.listen(
    Port,()=>{
        console.log("Server listen at Port: "+Port);
    }
)