import mongoose from "mongoose";
import { bookInterface } from "../interface/model.interface";

const bookSchema : mongoose.Schema<bookInterface> = new mongoose.Schema({
    Title : {
        type : String ,
        required : [true , "Title is requried" ]
    },
    Author : {
        type : mongoose.Types.ObjectId,
        ref : 'Author',
        required : [true ,"Author is required"]
    },
    Category : {
        type : mongoose.Types.ObjectId,
        ref : 'Category',
        required : [true , "Category is required"]
    },
    ISBN : {
        type : String,
        required : [true , "ISBN is required"]
    },
    Description : {
        type : String,
        required : [true , "Description is required"]
    },
    Price : {
        type : Number,
        required : [true , "Price is required"]
    }
});

export const Book = mongoose.model("Book" , bookSchema);