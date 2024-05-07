import {Request} from 'express'

export interface createuserInterface extends Request {
    name : string;
    email : string;
    password : string;
    type : string;
}  

export interface loginuserInterface extends Request {
    email : string;
    password : string;
}

export interface getauthorInterface extends Request {
    page :string;
    pagesizen: string;
    searchedauthor: string; 
}
