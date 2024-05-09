import { createuserInterface ,loginuserInterface} from "../interface/request.interface";
import  {UserService}  from "../services/user.service";
import { Request, Response } from 'express'

const user = new UserService();

export const  signup = async(req : Request,res : Response) =>{
    try {
        const {name,email,password,type} : createuserInterface = req.body
        const ret = await user.createuser(name , email,password,type);
        return res.status(ret.status).json({
            "response" : ret.content
        })   
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req : Request , res : Response )=>{
    try {
        const {email , password} : loginuserInterface = req.body;
        const ret = await user.login(email , password);
        return res.status(ret.status).json({
            "response" : ret.content
        })
    } catch (error) {
        console.log(error);
    }
}

