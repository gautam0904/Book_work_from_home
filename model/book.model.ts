import mongoose from "mongoose";
import { bookInterface } from "../interface/model.interface";

const userSchema : mongoose.Schema<bookInterface> = new mongoose.Schema({
    Title : {
        type : String ,
        required : [true , "Title is requried" ]
    },
    Author : {
        type : String,
        required : [true ,"Author is required"]
    },
    Category : {
        type : String,
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

export const Book = mongoose.model("Book" , userSchema);