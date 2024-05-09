import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { JwtPayload } from "jsonwebtoken";
import {statuscode} from  "../constant/status";

const author = new AuthorService();

export const getauthor = async (req: Request, res: Response) => {
    const requestQuery = req.query;
    try {
        const ret = await author.getauthor(requestQuery);
            return res.status(ret.status).json({
                "response": ret .content
            })      
        }catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        });
    }
}

export const createAuthor = async(req : Request , res : Response) =>{
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestBody = req.body
        const ret = await author.addauthor(userId , requestBody);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}

export const deleteauthor = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const {id} =req.query;
        const ret = await author.deleteauthor(uerId ,id);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}


export const updateauthor = async (req :Request , res : Response)=>{
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestBody =req.body;
        const ret = await author.updateauthor(requestBody,userId);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.status(statuscode.catchErr).json({
            error
        })
    }
}