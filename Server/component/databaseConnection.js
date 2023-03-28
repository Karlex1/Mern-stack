import mongoose  from "mongoose";

export async function DbConn(){
    // mongoose for db connection M.
    // connection is promise .


    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const url = process.env.DB_URL;

    await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`).then(() => { console.log("Database connected!"); }).catch((err) => { console.error(err); })
}