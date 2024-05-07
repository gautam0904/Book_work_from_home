import express from 'express'
import userRoutes from './routes/user.routes';
import authorRoutes from './routes/author.routes';
import categoryRoutes from './routes/category.routes'
import bookRoutes from './routes/book.routes';
import { connectDb } from './DB/index';
import { PORT } from './constant/constat';

const app = express();

app.use(express.json());


connectDb().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`server is starting on port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
    
})


app.use('/user' , userRoutes);
app.use('/book' , bookRoutes);
app.use('/author' , authorRoutes);
app.use('/category' , categoryRoutes);
