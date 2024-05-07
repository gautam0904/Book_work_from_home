import e from "express";
import { authmiddle } from "../middleware/auth.middleare";
import {createCategory,getcategory,deletecategory,updatecategory} from "../controller/category.controller"

const categoryRoutes = e.Router();

categoryRoutes.post('/create' , authmiddle,createCategory);
categoryRoutes.get('/get', authmiddle,getcategory);
categoryRoutes.put('/update',authmiddle,updatecategory);
categoryRoutes.delete('/delete',authmiddle,deletecategory);

export default categoryRoutes;