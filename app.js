import dot from 'dotenv'
dot.config();
import express from 'express';
const app = express();

import { connectDB } from './db/connect.js';

const port = process.env.PORT || 5000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening at ${port}`));
        
    } catch (error) {
        console.log(error);
        
    }
}
start();