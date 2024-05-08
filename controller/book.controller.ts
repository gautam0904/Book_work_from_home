import {Request,Response} from "express";
import { msg } from "../constant/return";
import { BookService } from "../services/book.service";
import { Book } from "../model/book.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user.model";


const book = new BookService();

export const createbook = async(req : Request , res : Response) => {
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type == "user" ){
            return  res.status(500).json({
                messae : msg.bookauth
            });
        }  
        const {Title ,Author ,Category  , ISBN  ,Description,Price  } = req.body;
        const ret = await book.createbook(Title ,Author ,Category  , ISBN  ,Description,Price );
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getbook = async (req: Request, res: Response) => {
    const { page, pagesize, searchedCategory ,author,category} = req.query;
    try {
        if (!page && !pagesize) {
            const ret = await book.getbook((page as string), (pagesize as string), (searchedCategory as string),(author as string),(category as string));
            return res.status((ret as { status: number, content: object }).status).json({
                "response": (ret as { status: number, content: object }).content
            })
        } else {
            const ret = await book.getbook((page as string), (pagesize as string), (searchedCategory as string),(author as string),(category as string));
            return res.status((ret as { status: number, content: object }).status).json({
                "response": (ret as { status: number, content: object }).content
            })
        }
    } catch (error) {
        console.log(error);
    }
}


export const deletebook = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type == "user"){
            return  res.status(500).json({
                messae : msg.bookauth
            });
        }  
        const {id} =req.body;
        if (user?.Type == "author") {
            const deletebook = await Book.findById(id);
            if(deletebook?.Author == user.Name){
                const ret = await book.deletebook(id);
                return res.status((ret as { status: number, content: object }).status).json({
                    "response": (ret as { status: number, content: object }).content
                })
            }
            else{
                return  res.status(500).json({
                    messae : msg.authorbook
                });
            }
        }
        const ret = await book.deletebook(id);
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}


export const updatebook = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type == "user"){
            return  res.status(500).json({
                messae : msg.categoryAdmin
            });
        } 
        const {id ,data } =req.body;
        if (user?.Type == "author") {
            const updatebook = await Book.findById(id);
            if(updatebook?.Author == user.Name){
                const ret = await book.updatebook(id,data);
                return res.status((ret as { status: number, content: object }).status).json({
                    "response": (ret as { status: number, content: object }).content
                })
            }
            else{
                return  res.status(500).json({
                    messae : msg.authorbook
                });
            }
        } 
        const ret = await book.updatebook(id,data);
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}