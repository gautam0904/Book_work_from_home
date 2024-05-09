export const msg = {
    catchErr : "internal server error",
    existalready :(field)=>{return `${field} already exist `} ,
    notfound : "Not found",
    notmach : "is not match",
    sucess : "successfully done",
    notAdmin : (data)=>{return `you are not admin so you can not manipulate the ${data}`},
    categoryAdmin : "you are not admin so you can not manipulate the category of any book",
    bookauth :"you are not admin or author so you can not manipulate any book",
    authorbook : "you can only manipulate yours book"
}
