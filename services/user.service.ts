import { User } from '../model/user.model';
import { msg } from "../constant/message";
import {statuscode} from "../constant/status"
import jwt from 'jsonwebtoken';


export class UserService {
    async createuser(signupRequestBody) {
        try {
            const existinguser = await User.find({ Email: signupRequestBody.email });
            if (existinguser.length != 0) {
                return {
                    status: statuscode.existalready,
                    content: {
                        message: `${signupRequestBody.name} is ${msg.existalready}`
                    }
                }
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
                    message: `User ${name} created ${msg.sucess}`,
                    result
                }
            }
        }
        catch (e: any) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }

    }

    async login(loginequestBody){
        try {
            const user = await User.findOne({Email : loginequestBody.email});
            if (!user) {
                return{
                    status : statuscode.notfound,
                    content : {
                        message : `this user is ${msg.notfound}`
                    }
                }
            }
            if(loginequestBody.password != user.Password){
                return{
                    status : statuscode.notfound,
                    content : {
                        message : `passord  ${msg.notmach}`
                    }
                }
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
