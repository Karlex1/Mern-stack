import express from "express";

import { DbConn } from "./component/databaseConnection.js";
import cors from 'cors';
import bodyParser from "body-parser";
import TransactionRoutes from "./component/transactionRoute.js";
import AuthRoute from './component/AuthRoute.js'
import passport from 'passport';
import passportConfig from './config/passport.js';

const app = express();
const Port = 4000;
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
await DbConn();

app.get(
    "/", (req, res) => {
        res.send({reso:'hello!'});
    }
);
app.use('/', TransactionRoutes);

app.use('/auth', AuthRoute);

app.listen(
    Port, () => {
        console.log("Server listen at : http://localhost:4000/ ");
    }
)
