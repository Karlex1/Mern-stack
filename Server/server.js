import express from "express";

import { DbConn } from "./component/databaseConnection.js";
import cors from 'cors';
import bodyParser from "body-parser";
import TransactionRoutes from "./component/transactionRoute.js";

const app = express();
const Port = 4000;
app.use(cors());
app.use(bodyParser.json());




await DbConn();




app.get(
    "/", (req, res) => {
        res.send({reso:'hello!'});
    }
);
app.use('/',TransactionRoutes);
app.listen(
    Port, () => {
        console.log("Server listen at : http://localhost:4000/ ");
    }
)
