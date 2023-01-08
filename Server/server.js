import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
const Port=4000;

// mongoose for db connection M.
// connection is promise .
await mongoose.connect("mongodb+srv://sanchit:pass231020@mern-stack.tzfiyj1.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("Database connected!");}).catch((err)=>{console.error(err);})


app.use(cors());
app.use(bodyParser.json())
app.get(
    "/",(req,res)=>{
       
        res.send(req.body);
    }
);
app.post(
    "/",(req,res)=>{
        const {amount,desc,date}=req.body; 
        // we got form data from frontend to backend by req of Post of backend now we getting the data so we have to store it.

        console.log(req.body)
        res.json({message:'Hello World!'});
}
);
app.listen(
    Port,()=>{
        console.log("Server listen at : http://localhost:4000/ ");
    }
)
