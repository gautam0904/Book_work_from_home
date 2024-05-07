import { User } from '../model/user.model';
import { msg, statuscode } from '../constant/return';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constant/constat';

export class UserService {
    async createuser(name: string, email: string, password: string, type: string) {
        try {
            const existinguser = await User.find({ Email: email });
            if (existinguser.length != 0) {
                return {
                    status: statuscode.existalready,
                    content: {
                        message: `${name} is ${msg.existalready}`
                    }
                }
            }
            const result = await User.create({
                Name: name,
                Email: email,
                Password: password,
                Type: type
            });
            return {
                status: statuscode.success,
                content: {
                    message: `User ${name} created successfully`,
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

    async login(email : string , password : string){
        try {
            const user = await User.findOne({Email : email});
            if (!user) {
                return{
                    status : statuscode.notfound,
                    content : {
                        message : `this user is ${msg.notfound}`
                    }
                }
            }
            if(password != user.Password){
                return{
                    status : statuscode.notfound,
                    content : {
                        message : `passord  ${msg.notmach}`
                    }
                }
            }
            const accesstoken = await jwt.sign({
                id: user._id
            },JWT_SECRET,{expiresIn: 86400});
            return {
                status : statuscode.success,
                content : {
                    accesstoken : accesstoken
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
