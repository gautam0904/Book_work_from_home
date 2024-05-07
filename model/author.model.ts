import mongoose from "mongoose";
import { authorInterface } from "../interface/model.interface";

const authorSchema : mongoose.Schema<authorInterface> = new mongoose.Schema({
    Name : {
        type : String ,
        required : [true , "author name is requried" ]
    },
    Biography : {
        type : String,
        required : [true ,"biography is required"]
    },
    Nationality : {
        type : String,
        required : [true , "author's nationality is required"]
    }
});

export const Author = mongoose.model("Author" , authorSchema);