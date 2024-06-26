import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { JwtPayload } from "jsonwebtoken";
import {statuscode} from  "../constant/status";
import { createAuthorInterface, getauthorInterface } from "../interface/request.interface";

const author = new AuthorService();

export const getauthor = async (req: Request, res: Response) => {
    const requestQuery  = req.query ;
    try {
        const authors = await author.getauthor(requestQuery);
            return res.status(authors.status).json(authors .content)      
        }catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        });
    }
}

export const createAuthor = async(req : Request , res : Response) =>{
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestBody :createAuthorInterface = req.body
        const ceratedauthor = await author.addauthor(userId , requestBody);
        return res.status(ceratedauthor.status).json(ceratedauthor.content)
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}

export const deleteauthor = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const id =req.query.id as string;
        const deletedAuthor = await author.deleteauthor(uerId ,id);
        return res.status(deletedAuthor.status).json(deletedAuthor.content)
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}


export const updateauthor = async (req :Request , res : Response)=>{
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestBody : createAuthorInterface =req.body;
        const authorId : string = req.query.id as string;
        const updatedAuthor = await author.updateauthor((authorId as string),requestBody,userId);
        return res.status(updatedAuthor.status).json(updatedAuthor.content)
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}