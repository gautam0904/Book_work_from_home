import { msg, statuscode } from "../constant/return";
import { authorInterface } from "../interface/model.interface"
import {Author} from "../model/author.model"

export class AuthorService {
    async getauthor (page : null | string = null ,pagesize : null | string =null ,searchedauthor : null | string =null){
        try {
            if (page == null && pagesize == null ) {
                const result= await Author.find();
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
    
                const result = await Author.find({Name: searchedauthor}).skip(skip).limit(limit);
    
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


    async addauthor (  Name : string,Biography : string,Nationality : string ){
        try {
            const result = {
                Name : Name ,
                Biography : Biography ,
                Nationality : Nationality
            }
            const r = await Author.create(result);
            return{
                status :statuscode.success,
                content : {
                    r
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

    async deleteauthor (id :string){
        try {
        const result = await Author.findByIdAndDelete({ _id: id });
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

    async updateauthor (id : string,data : authorInterface){
        try {
            const author = await Author.findById(id);
            const Name = data.Name ? data.Name : author?.Name;
            const Biography =data.Biography ? data.Biography : author?.Biography;
            const Nationality = data.Nationality ? data.Nationality : author?.Nationality; 

            const result = await Author.findByIdAndUpdate({ _id: id } ,{ $set: { Name : Name ,Biography :Biography,Nationality : Nationality} });
        return{
            status :statuscode.success,
            content : {
                message : `author is updated ${msg.sucess}`
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