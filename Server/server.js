import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import Transaction from "./TransactionModel.js";

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
    "/",async (req,res)=>{
        const {amount,description,date}=req.body; 
        // we got form data from frontend to backend by req of Post of backend now we getting the data so we have to store it.
const transaction = new  Transaction({
    amount,
    description,
    date,
})
await transaction.save()
        res.json({output:transaction});
}
);
app.listen(
    Port,()=>{
        console.log("Server listen at : http://localhost:4000/ ");
    }
)
