import { msg } from "../constant/message";
import {statuscode} from "../constant/status"
import { categorInterface } from "../interface/model.interface";
import  {Category} from "../model/category.model"

export class CategoryService {
    async getcategory (page : null | string = null ,pagesize : null | string =null ,searchedCategory : null | string =null){
        try {
            if (page == null && pagesize == null ) {
                const result= await Category.find();
                return{
                    status : statuscode.success,
                    content : {
                        result
                    }
                }
            }
            else{
                const pageNUmber = parseInt((page as string)) || 1;
                const limit = parseInt((pagesize as string)) || 10;
                const skip = (pageNUmber-1)*limit;
    
                const result = await Category.find({category: searchedCategory}).skip(skip).limit(limit);
    
                return{
                    status :statuscode.success,
                    content : {
                        result
                    }
                }
            }
        } catch (error) {
            return{
                status :statuscode.catchErr,
                content : {
                    message : msg.catchErr
                }
            }
        }
        
    }


    async createCAtegory (  Book: string , categories: string ){
        try {
            const result = {
                Book : Book,
                Categoryy : categories
            }
            const r = await Category.create(result);
            return{
                status :statuscode.success,
                content : {
                    message : `category is created ${msg.sucess} `,
                    r
                }
            }
        } catch (error) {
            return{
                status :statuscode.catchErr,
                content : {
                    message : msg.catchErr,
                    error
                }
            }
        }
        
    }

    async deletecategory (id :string){
        try {
        const result = await Category.findByIdAndDelete({ _id: id });
        return{
            status :statuscode.success,
            content : {
                result
            }
        } 
        } catch (error) {
            return{
                status :statuscode.catchErr,
                content : {
                    message : msg.catchErr
                }
            }
        }
    }

    async updatecategory (id : string,data : categorInterface){
        try {
            const category = await Category.findById(id);
            const Categoryitem =data.Category ? data.Category : category?.Categoryy

            const result = await Category.findByIdAndUpdate({ _id: id } ,{ $set: { Categoryy : Categoryitem} });
        return{
            status :statuscode.success,
            content : {
                message : `category is updated ${msg.sucess}`,
                result
            }
        } }catch (error) {
            return{
                status :statuscode.catchErr,
                content : {
                    message : msg.catchErr
                }
            }
        }
    }
}