import {Request,Response} from "express";
import { msg } from "../constant/message";
import { CategoryService } from "../services/category.service";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../model/user.model";


const catrgory = new CategoryService();

export const createCategory = async(req : Request , res : Response) => {
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : msg.categoryAdmin
            });
        }  
        const {Book,Category } = req.body;
        const ret = await catrgory.createCAtegory(Book,Category);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}

export const getcategory = async (req: Request, res: Response) => {
    const { page, pagesize, searchedCategory } = req.query;
    try {
        if (!page && !pagesize) {
            const ret = await catrgory.getcategory();
            return res.status(ret.status).json({
                "response":ret.content
            })
        } else {
            const ret = await catrgory.getcategory((page as string), (pagesize as string), (searchedCategory as string));
            return res.status(ret.status).json({
                "response": ret.content
            })
        }
    } catch (error) {
        console.log(error);
    }
}


export const deletecategory = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : msg.categoryAdmin
            });
        }  
        const {id} =req.body;
        const ret = await catrgory.deletecategory(id);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}


export const updatecategory = async (req :Request , res : Response)=>{
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const user = await User.findById(uerId);
        if (user?.Type != "admin"){
            return  res.status(500).json({
                messae : msg.categoryAdmin
            });
        }  
        const {id ,data } =req.body;
        const ret = await catrgory.updatecategory(id,data);
        return res.status(ret.status).json({
            "response": ret.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}