import { Request, Response } from "express";
import { BookService } from "../services/book.service";
import { JwtPayload } from "jsonwebtoken";

const book = new BookService();

export const createbook = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;

        const requestBody = req.body;
        const createdBook = await book.createbook(requestBody, userId);
        return res.status(createdBook.status).json(createdBook.content);
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getbook = async (req: Request, res: Response) => {
    const requestQuery = req.query;
    try {
        const books = await book.getbook(requestQuery);
        return res.status(books.status).json(books.content);
    } catch (error) {
        console.log(error);
    }
}


export const deletebook = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;
        const id = req.query.id as string;
        const deletedBook = await book.deletebook(id ,userId);
        return res.status(deletedBook.status).json(deletedBook.content);
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
        const updatedBook = await book.updatebook(userId, requestBody ,requestQuery );
        return res.status(updatedBook.status).json(updatedBook.content);
    } catch (error) {
        return res.json({
            error
        })
    }
}