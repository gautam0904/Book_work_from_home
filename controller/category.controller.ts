import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { JwtPayload } from "jsonwebtoken";
import { getcategoryInterface } from "../interface/request.interface";



const catrgory = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const requestBody = req.body;
        const ret = await catrgory.createCAtegory(uerId,requestBody);
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
    const requestQuery = req.query;
    try {
        const categories = await catrgory.getcategory(requestQuery );
        return res.status(categories.status).json({
            "response": categories.content
        })

    } catch (error) {
        error
    }
}


export const deletecategory = async (req: Request, res: Response) => {
    try {
        const uerId = (req as JwtPayload).decoded.id;
        const { id } = req.body;
        const deletedcategory = await catrgory.deletecategory(uerId, id);
        return res.status(deletedcategory.status).json({
            "response": deletedcategory.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}


export const updatecategory = async (req: Request, res: Response) => {
    try {
        const userId = (req as JwtPayload).decoded.id;
        const requestBody = req.body;
        const id = req.query.id as string;
        const updatedCategory = await catrgory.updatecategory( id ,userId, requestBody);
        return res.status(updatedCategory.status).json({
            "response": updatedCategory.content
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}