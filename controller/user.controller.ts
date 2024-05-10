import { createuserInterface, loginuserInterface } from "../interface/request.interface";
import  {UserService}  from "../services/user.service";
import { Request, Response } from 'express'

const user = new UserService();

export const  signup = async(req : Request,res : Response) =>{
    try {
        const signupRequestBody : createuserInterface = req.body
        const createdUser = await user.createuser(signupRequestBody);
        return res.status(createdUser.status).json({
            "response" : createdUser.content
        })   
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req : Request , res : Response )=>{
    try {
        const loginequestBody :loginuserInterface = req.body;
        const ret = await user.login(loginequestBody);
        return res.status(ret.status).json({
            "response" : ret.content
        })
    } catch (error) {
        console.log(error);
    }
}

