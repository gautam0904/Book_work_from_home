import mongoose from "mongoose";
import { userInterface } from "../interface/model.interface";

const userType = ['user', 'author', 'admin']

const userSchema : mongoose.Schema<userInterface> = new mongoose.Schema({
    Name : {
        type : String ,
        required : [true , "user name is requried" ]
    },
    Email : {
        type : String,
        required : [true ,"email is required"]
    },
    Password : {
        type : String,
        required : [true , "Password is required"]
    },
    Type : {
        type : String,
        enum : Object.values(userType),
        required : true 
    }
});

export const User = mongoose.model("User" , userSchema);