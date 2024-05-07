import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user.model";
import { msg } from "../constant/return";

const author = new AuthorService();

export const getauthor = async (req: Request, res: Response) => {
    const { page, pagesize, searchedauthor } = req.query;
    try {
        if (!page && !pagesize) {
            const ret = await author.getauthor();
            return res.status((ret as { status: number, content: object }).status).json({
                "response": (ret as { status: number, content: object }).content
            })
        } else {
            const ret = await author.getauthor((page as string), (pagesize as string), (searchedauthor as string));
            return res.status((ret as { status: number, content: object }).status).json({
                "response": (ret as { status: number, content: object }).content
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const createAuthor = async(req : Request , res : Response) =>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : msg.authorAdmin
            });
        }  
        const {Name , Biography , Nationality} =req.body;
        const ret = await author.addauthor(Name,Biography,Nationality);
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const deleteauthor = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : "you are not admin so you can not manipulate the author"
            });
        }  
        const {id} =req.body;
        const ret = await author.deleteauthor(id);
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}


export const updateauthor = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : "you are not admin so you can not manipulate the author"
            });
        }  
        const {id ,data } =req.body;
        const ret = await author.updateauthor(id,data);
        return res.status((ret as { status: number, content: object }).status).json({
            "response": (ret as { status: number, content: object }).content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}