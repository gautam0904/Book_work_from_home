import mongoose from "mongoose";
import { categorInterface } from "../interface/model.interface";

const categorySchema = new mongoose.Schema({
    Book :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book' ,
        required : true
    },
    Categoryy : {
        type :String,
        required : true
    }
}) ;

export const Category = mongoose.model('Category' , categorySchema);