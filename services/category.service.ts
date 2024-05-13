import { msg } from "../constant/message";
import { statuscode } from "../constant/status";
import { createcategoryInterface } from "../interface/request.interface";
import { Category } from "../model/category.model"
import { User } from "../model/user.model";
import { customError } from "../utiles/error.handller";

export class CategoryService {
    async getcategory(requestQuery: any) {
        try {
            let result;
            if (!requestQuery.page == undefined && !requestQuery.pagesize) {
                const pageNUmber = parseInt(requestQuery.page) || 1;
                const limit = parseInt(requestQuery.pagesize) || 10;
                const skip = (pageNUmber - 1) * limit;
                result = await Category.find({ Categoryy: requestQuery.searchedCategory }).skip(skip).limit(limit);
            }
            result = await Category.find();
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


    async createCAtegory(userId: string, requestBody: createcategoryInterface) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                throw new customError(statuscode.catchErr, msg.categoryAdmin)
            }
            const result = await Category.create({
                Book: requestBody.Book,
                Categoryy: requestBody.Categories
            });
            return {
                status: statuscode.success,
                content: {
                    message: `category is created ${msg.sucess} `,
                    result
                }
            }
        } catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr,
                }
            }
        }

    }

    async deletecategory(userId: string, id: string) {
        try {
            const user = await User.findById(userId);
            if (user?.Type != "admin") {
                throw new customError(statuscode.catchErr, msg.categoryAdmin)
            }
            const result = await Category.findByIdAndDelete({ _id: id });
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

    async updatecategory(id: string, uerId: string, requestBody: createcategoryInterface) {
        try {
            const user = await User.findById(uerId);
            if (user?.Type != "admin") {
                throw new customError(statuscode.catchErr, msg.categoryAdmin)
            }

            const result = await Category.findByIdAndUpdate({ _id: id }, { $set: { Categoryy: requestBody.Categories } });
            return {
                status: statuscode.success,
                content: {
                    message: `category is updated ${msg.sucess}`,
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
}