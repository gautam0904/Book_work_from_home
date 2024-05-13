import { User } from '../model/user.model';
import { msg } from "../constant/message";
import {statuscode} from "../constant/status"
import jwt from 'jsonwebtoken';
import { createuserInterface, loginuserInterface } from '../interface/request.interface';
import { customError } from '../utiles/error.handller';


export class UserService {
    async createuser(signupRequestBody : createuserInterface) {
        try {
            const existinguser = await User.find({ Email: signupRequestBody.email });
            if (existinguser.length != 0) {
                throw new customError(statuscode.existalready,msg.existalready(signupRequestBody.name));
            }
            const result = await User.create({
                Name: signupRequestBody.name,
                Email: signupRequestBody.email,
                Password: signupRequestBody.password,
                Type: signupRequestBody.type
            });
            return {
                status: statuscode.success,
                content: {
                    message: `User ${signupRequestBody.name} created ${msg.sucess}`,
                    result
                }
            }
        }
        catch (e: any) {
            return {
                status: statuscode.catchErr,
                content: {
                    message:e.message
                }
            }
        }

    }

    async login(loginequestBody : loginuserInterface){
        try {
            const user = await User.findOne({Email : loginequestBody.email});
            if (!user) {
                throw new customError(statuscode.notfound,`this user is ${msg.notfound}`);
            }
            if(loginequestBody.password != user.Password){
                throw new customError(statuscode.notfound,`passord  ${msg.notmach}`);
            }
            const accesstoken = await jwt.sign({
                id: user._id
            },(process.env.JWT_SECRET as jwt.Secret),{expiresIn: 86400});
            return {
                status : statuscode.success,
                content : {
                   accesstoken
                }
            }
        } catch (error) {
            return {
                status : statuscode.catchErr,
                content:{
                    message : msg.catchErr
                }
            }
        }
    }
}
