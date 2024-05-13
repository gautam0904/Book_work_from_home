import QueryString from "qs";
import { msg } from "../constant/message";
import { statuscode } from "../constant/status"
import { authorInterface } from "../interface/model.interface"
import { createAuthorInterface } from "../interface/request.interface";
import { Author } from "../model/author.model"
import { User } from "../model/user.model";
import { customError } from "../utiles/error.handller";

export class AuthorService {
    async getauthor(requestQuery : QueryString.ParsedQs) {
        try {
            if (!requestQuery.page && !requestQuery.pagesize) {
                const result = await Author.find();
                return {
                    status: statuscode.success,
                    content: {
                        result
                    }
                }
            }
            else {
                const pageNUmber = parseInt((requestQuery.page as string)) || 1;
                const limit = parseInt((requestQuery.pagesize as string)) || 10;
                const skip = (pageNUmber - 1) * limit;

                const result = await Author.find({ Name: requestQuery.searchedauthor }).skip(skip).limit(limit);

                return {
                    status: statuscode.success,
                    content: {
                        result
                    }
                }
            }
        } catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }

    }


    async addauthor(userId: string, requestBody : createAuthorInterface) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                throw new customError (statuscode.unauthorized ,msg.notAdmin('author'))
            }
            const result :authorInterface = await Author.create({
                Name: requestBody.Name,
                Biography: requestBody.Biography,
                Nationality: requestBody.Nationality
            });
            return {
                status: statuscode.success,
                content: {
                    result
                }
            }
        } catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }

    }

    async deleteauthor(userId: string, id : string) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                throw new customError(statuscode.unauthorized , msg.notAdmin('author'));
            }
            const result = await Author.findByIdAndDelete({ _id: id });
            return {
                status: statuscode.success,
                content: {
                    result
                }
            }
        } catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }
    }

    async updateauthor(authorId : string,requestBody : createAuthorInterface,userId : string) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                throw new customError(statuscode.unauthorized , msg.notAdmin('author'));
            }
            const result = await Author.findByIdAndUpdate({ _id: authorId}, { $set: { Name: requestBody.Name, Biography: requestBody.Biography, Nationality: requestBody.Nationality } });
            return {
                status: statuscode.success,
                content: {
                    message: `author is updated ${msg.sucess}`
                }
            }
        } catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }
    }
}