import epress from "express";
import { authmiddle } from "../middleware/auth.middleare";
import { getbook, createbook , updatebook  , deletebook} from "../controller/book.controller";


const bookRoutes = epress.Router();

bookRoutes.get('/get' ,authmiddle, getbook);
bookRoutes.post('/create' , authmiddle , createbook);
bookRoutes.put('/update' , authmiddle , updatebook);
bookRoutes.delete('/delete' , authmiddle, deletebook)

export default bookRoutes;