import e from "express";
import {createAuthor, deleteauthor, getauthor, updateauthor} from '../controller/author.controller'
import { authmiddle } from "../middleware/auth.middleare";

const authorRoutes = e.Router();

authorRoutes.get('/get' ,authmiddle, getauthor);
authorRoutes.post("/create" , authmiddle , createAuthor);
authorRoutes.delete("/delete" , authmiddle , deleteauthor);
authorRoutes.put('/update',authmiddle,updateauthor)

export default authorRoutes