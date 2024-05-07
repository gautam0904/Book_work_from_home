import { msg, statuscode } from "../constant/return";
import { bookInterface } from "../interface/model.interface";
import {Book} from "../model/book.model"

export class BookService {
    async getbook (page : null | string = null ,pagesize : null | string =null ,searchedBook : null | string =null){
        try {
            if (page == null && pagesize == null ) {
                const result= await Book.find();
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
    
                const result = await Book.find({category: searchedBook}).skip(skip).limit(limit);
    
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


    async createbook (Title : string ,Author: String ,Category : String  , ISBN : String ,Description: String ,Price : number ){
        try {
            const result = {
                Title : Title,
                Author : Author,
                Category :Category,
                ISBN: ISBN,
                Description :Description,
                Price:Price
            }
            const r = await Book.create(result);
            return{
                status :statuscode.success,
                content : {
                    message : `Book is created ${msg.sucess} `,
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

    async deletebook (id :string){
        try {
        const result = await Book.findByIdAndDelete({ _id: id });
        return{
            status :statuscode.success,
            content : {
                result,
                message : `Thi book is deleted ${msg.sucess}`
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

    async updatebook (id : string,data : bookInterface){
        try {
            const book = await Book.findById(id);
            const Title =data.Title ? data.Title : book?.Title;
            const Author = data.Author ? data.Author : book?.Author;
            const Category = data.Category ? data.Category : book?.Category;
            const Description = data.Description ? data.Description : book?.Description;
            const ISBN = data.ISBN ? data.ISBN : book?.ISBN;
            const Price = data.Price ? data.Price : book?.Price;

            const result = await Book.findByIdAndUpdate({ _id: id } ,{ $set: {Title : Title ,Author: Author ,Category : Category  , ISBN : ISBN ,Description: Description ,Price : Price} });
        return{
            status :statuscode.success,
            content : {
                message : `book is updated ${msg.sucess}`,
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