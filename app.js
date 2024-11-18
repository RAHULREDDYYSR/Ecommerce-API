import dot from 'dotenv'
dot.config();
import 'express-async-errors';

//express
import express from 'express';
const app = express();

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

//database
import { connectDB } from './db/connect.js';

//routers 
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'



//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'))

app.use(fileUpload())


app.get('/api/v1',(req, res)=>{
    console.log(req.signedCookies);
    
    res.send('Hello World')

})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);


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