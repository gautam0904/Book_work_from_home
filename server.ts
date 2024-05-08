import express from 'express'
import userRoutes from './routes/user.routes';
import authorRoutes from './routes/author.routes';
import categoryRoutes from './routes/category.routes'
import bookRoutes from './routes/book.routes';
import { connectDb } from './DB/index';

import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());



connectDb().then(()=>{
    app.listen(parseInt(process.env.PORT as string) , ()=>{
        console.log(`server is starting on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(error);
    
})


app.use('/user' , userRoutes);
app.use('/book' , bookRoutes);
app.use('/author' , authorRoutes);
app.use('/category' , categoryRoutes);
