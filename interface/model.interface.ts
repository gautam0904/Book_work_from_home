import mongoose from "mongoose";
export interface userInterface {
    Name : string;
    Email : string;
    Password : string;
    Type : string
    
}

export interface categorInterface {
    Book : mongoose.Schema.Types.ObjectId;
    Category : string; 
}

export interface authorInterface { 
    Name : string,
    Biography : string;
    Nationality : string; 
}

export interface bookInterface {
    Title : string,
    Author : string ,
    Category : mongoose.Schema.Types.ObjectId,
    ISBN :  string,
    Description : string,
    Price : number
}