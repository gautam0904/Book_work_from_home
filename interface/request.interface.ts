export interface createuserInterface  {
    name : string;
    email : string;
    password : string;
    type : string;
}  

export interface loginuserInterface  {
    email : string;
    password : string;
}

export interface getauthorInterface  {
    page :string;
    pagesizen: string;
    searchedauthor: string; 
}

export interface createAuthorInterface {
    Name: string,
    Biography: string,
    Nationality: string
}

export interface getcategoryInterface {
    page :string;
    pagesizen: string; 
}

export interface createcategoryInterface {
    Book: string,
    Categories: string
}

export interface createbookInterface {
    Title: string,
    Author : string,
    Category : string,
    ISBN : string,
    Description : string,
    Price : string
}