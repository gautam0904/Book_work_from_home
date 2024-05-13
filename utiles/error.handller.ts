export class customError extends Error {
    statusCode: number;
    data: null;
    errors: never[];
    constructor (statusCode : number,
        message ="somthing thing failed",
        errors= [],
        stack= "" ){
            super(message);
            this.statusCode = statusCode;
            this.data = null;
            this.errors = errors;
            this.message = message;
    
            if(stack){
                this.stack = stack;
            }
            else{
                Error.captureStackTrace(this, this.constructor);
            } 
        }
}