import { Request, Response } from "express";
import { msg } from "../constant/message";
import { BookService } from "../services/book.service";
import { Book } from "../model/book.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user.model";


const book = new BookService();

export const createbook = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;

        const requestBody = req.body;
        const ret = await book.createbook(requestBody, userId);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getbook = async (req: Request, res: Response) => {
    const requestQuery = req.query;
    try {
        const ret = await book.getbook(requestQuery);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        console.log(error);
    }
}


export const deletebook = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;
        const id = req.query;
        const ret = await book.deletebook(id ,userId);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}


export const updatebook = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestQuery =  req.query;
        const requestBody = req.body;
        const ret = await book.updatebook(userId, requestBody ,requestQuery );
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}