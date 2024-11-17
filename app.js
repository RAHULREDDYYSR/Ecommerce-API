import dot from 'dotenv'
dot.config();
import 'express-async-errors';

//express
import express from 'express';
const app = express();

import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//database
import { connectDB } from './db/connect.js';

//routers 
import authRouter from './routes/authRoutes.js'


//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


app.get('/api/v1',(req, res)=>{
    console.log(req.signedCookies);
    
    res.send('Hello World')

})

app.use('/api/v1/auth',authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)
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