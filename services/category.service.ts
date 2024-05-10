import { msg } from "../constant/message";
import { statuscode } from "../constant/status"
import { categorInterface } from "../interface/model.interface";
import { Category } from "../model/category.model"
import { User } from "../model/user.model";

export class CategoryService {
    async getcategory(requestQuery) {
        try {
            if (!requestQuery.page && !requestQuery.pagesize) {
                const result = await Category.find();
                return {
                    status: statuscode.success,
                    content: {
                        result
                    }
                }
            }

            const pageNUmber = parseInt(requestQuery.page) || 1;
            const limit = parseInt(requestQuery.pagesize) || 10;
            const skip = (pageNUmber - 1) * limit;

            const result = await Category.find({ category: requestQuery.searchedCategory }).skip(skip).limit(limit);

            return {
                status: statuscode.success,
                content: {
                    result
                }
            }
        } catch(error) {
        return {
            status: statuscode.catchErr,
            content: {
                message: msg.catchErr
            }
        }
    }

}


    async createCAtegory(userId ,requestBody) {
    try {
        const user = await User.findById(userId);
        if (user?.Type != "admin") {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.categoryAdmin,
                }
            }
        }
        const result = {
            Book: requestBody.Book,
            Categoryy: requestBody.categories
        }
        const r = await Category.create(result);
        return {
            status: statuscode.success,
            content: {
                message: `category is created ${msg.sucess} `,
                r
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

    async deletecategory(userId, id: string) {
    try {
        const user = await User.findById(userId);
        if (user?.Type != "admin") {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.categoryAdmin
                }
            }
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

    async updatecategory(uerId: string, requestBody) {
    try {
        const user = await User.findById(uerId);
        if (user?.Type != "admin") {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.categoryAdmin
                }
            }
        }
        const category = await Category.findById(requestBody.id);
        const Categoryitem = requestBody.data.Category ? requestBody.data.Category : category?.Categoryy

        const result = await Category.findByIdAndUpdate({ _id: requestBody.id }, { $set: { Categoryy: Categoryitem } });
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