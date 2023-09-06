import express from "express";
import * as dotenv from 'dotenv';
import { DbConn } from "./component/databaseConnection.js";
import cors from 'cors';
import bodyParser from "body-parser";
import passport from 'passport';
import passportConfig from './config/passport.js';
import router from './index.js';
import path from 'path';
import url from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);
await DbConn();

app.get(
    "/", (req, res) => {
        res.send({reso:'hello! server is ready!'});
    }
);
//main
app.use('/', router);


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*',function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});

app.listen(
    PORT, () => {
        console.log("Server listen at : http://localhost:4000/ ");
    }
)
