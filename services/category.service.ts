import { msg } from "../constant/message";
import { statuscode } from "../constant/status";
import { categorInterface } from "../interface/model.interface";
import { createcategoryInterface } from "../interface/request.interface";
import { Category } from "../model/category.model"
import { User } from "../model/user.model";

export class CategoryService {
    async getcategory(requestQuery : any) {
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

            const result = await Category.find({ Categoryy: requestQuery.searchedCategory }).skip(skip).limit(limit);

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


    async createCAtegory(userId : string ,requestBody : createcategoryInterface ) {
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
        const result  = await Category.create({
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

    async deletecategory(userId : string, id: string) {
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

    async updatecategory( id : string, uerId: string, requestBody : createcategoryInterface) {
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
        const category = await Category.findById(id);
        const Categoryitem = requestBody.Categories ? requestBody.Categories : category?.Categoryy

        const result = await Category.findByIdAndUpdate({ _id: id }, { $set: { Categoryy: Categoryitem } });
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