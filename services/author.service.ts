import { msg } from "../constant/message";
import { statuscode } from "../constant/status"
import { authorInterface } from "../interface/model.interface"
import { Author } from "../model/author.model"
import { User } from "../model/user.model";

export class AuthorService {
    async getauthor(requestQuery) {
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


    async addauthor(userId: string, requestBody) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                return {
                    status: statuscode.catchErr,
                    content: {
                        message: msg.notAdmin('author')
                    }
                }
            }
            const result = {
                Name: requestBody.Name,
                Biography: requestBody.Biography,
                Nationality: requestBody.Nationality
            }
            const r = await Author.create(result);
            return {
                status: statuscode.success,
                content: {
                    r
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

    async deleteauthor(userId: string, id) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                return {
                    status: statuscode.catchErr,
                    content: {
                        message: msg.notAdmin('author')
                    }
                }
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

    async updateauthor(requestBody,userId) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                return{
                    status: statuscode.catchErr,
                    content: {
                        message: msg.notAdmin("Author")
                    }
                }
            }
            const author = await Author.findById(requestBody.id);
            const Name = requestBody.data.Name ? requestBody.data.Name : author?.Name;
            const Biography = requestBody.data.Biography ? requestBody.data.Biography : author?.Biography;
            const Nationality = requestBody.data.Nationality ? requestBody.data.Nationality : author?.Nationality;

            const result = await Author.findByIdAndUpdate({ _id: requestBody.id }, { $set: { Name: Name, Biography: Biography, Nationality: Nationality } });
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