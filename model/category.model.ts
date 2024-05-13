import mongoose from "mongoose";
import { categorInterface } from "../interface/model.interface";

const categorySchema = new mongoose.Schema({
       Categoryy : {
        type :String,
        required : true
    }
}) ;

export const Category = mongoose.model('Category' , categorySchema);