import { msg } from "../constant/message";
import { statuscode } from "../constant/status";
import { bookInterface } from "../interface/model.interface";
import { Book } from "../model/book.model"
import { User } from "../model/user.model";

export class BookService {
    async getbook(requestQuery) {
        try {
            if (!requestQuery.page && !requestQuery.pagesize) {
                if (requestQuery.author != null) {
                    const result = await Book.find({ Author: requestQuery.author });
                    return {
                        status: statuscode.success,
                        content: {
                            result
                        }
                    }
                }
                if (requestQuery.category != null) {
                    const result = await Book.find({ Category: requestQuery.category });
                    return {
                        status: statuscode.success,
                        content: {
                            result
                        }
                    }
                }
                const result = await Book.find();
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

                const result = await Book.find({ Title: requestQuery.searchedBook }).skip(skip).limit(limit);
                if (requestQuery.author != null) {
                    const result = await Book.find({ Author: requestQuery.author });
                    return {
                        status: statuscode.success,
                        content: {
                            result
                        }
                    }
                }
                if (requestQuery.category != null) {
                    const result = await Book.find({ Category: requestQuery.category });
                    return {
                        status: statuscode.success,
                        content: {
                            result
                        }
                    }
                }
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


    async createbook(requestBody, userId) {
        try {
            const user = await User.findById(userId);
            if (user?.Type == "user") {
                return {
                    status: statuscode.catchErr,
                    content: {
                        message: msg.bookauth
                    }
                }
            }
            const result = {
                Title: requestBody.Title,
                Author: requestBody.Author,
                Category: requestBody.Category,
                ISBN: requestBody.ISBN,
                Description: requestBody.Description,
                Price: requestBody.Price
            }
            const r = await Book.create(result);
            return {
                status: statuscode.success,
                content: {
                    message: `Book is created ${msg.sucess} `,
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

    async deletebook(id, userId): Promise<{ status: number, content: object }> {
        try {
            const user = await User.findById(userId);
            if (user?.Type == "user") {
                return {
                    status: statuscode.catchErr,
                    content: {
                        message: msg.bookauth
                    }
                }
            }
            if (user?.Type == "author") {
                const deletebook = await Book.findById(id);
                if (deletebook?.Author != user.Name) {
                    return {
                        status: statuscode.catchErr,
                        content: {
                            message: msg.authorbook
                        }
                    }
                }
                const result = await Book.findByIdAndDelete({ _id: id });
                return {
                    status: statuscode.success,
                    content: {
                        result,
                        message: `Thi book is deleted ${msg.sucess}`
                    }
                }
            }
            const result = await Book.findByIdAndDelete({ _id: id });
            return {
                status: statuscode.success,
                content: {
                    result,
                    message: `Thi book is deleted ${msg.sucess}`
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

    async updatebook(userId: string, requestBody, requestQuery) {
        try {
            const user = await User.findById(userId);
            if (user?.Type == "user") {
                return {
                    status: statuscode.catchErr,
                    content: {
                        message: msg.categoryAdmin
                    }
                }
            }
            if (user?.Type == "author") {
                const updatebook = await Book.findById(requestQuery.id);
                if (updatebook?.Author != user.Name) {
                    return {
                        status: statuscode.catchErr,
                        content: {
                            message: msg.authorbook
                        }
                    }
                }
                const book = await Book.findById(requestQuery.id);
                const Title = requestBody.data.Title ? requestBody.data.Title : book?.Title;
                const Author = requestBody.data.Author ? requestBody.data.Author : book?.Author;
                const Category = requestBody.data.Category ? requestBody.data.Category : book?.Category;
                const Description = requestBody.data.Description ? requestBody.data.Description : book?.Description;
                const ISBN = requestBody.data.ISBN ? requestBody.data.ISBN : book?.ISBN;
                const Price = requestBody.data.Price ? requestBody.data.Price : book?.Price;

                const result = await Book.findByIdAndUpdate({ _id: requestQuery.id }, { $set: { Title: Title, Author: Author, Category: Category, ISBN: ISBN, Description: Description, Price: Price } });
                return {
                    status: statuscode.success,
                    content: {
                        message: `book is updated ${msg.sucess}`,
                        result
                    }
                }
            }
            const book = await Book.findById(requestQuery.id);
            const Title = requestBody.data.Title ? requestBody.data.Title : book?.Title;
            const Author = requestBody.data.Author ? requestBody.data.Author : book?.Author;
            const Category = requestBody.data.Category ? requestBody.data.Category : book?.Category;
            const Description = requestBody.data.Description ? requestBody.data.Description : book?.Description;
            const ISBN = requestBody.data.ISBN ? requestBody.data.ISBN : book?.ISBN;
            const Price = requestBody.data.Price ? requestBody.data.Price : book?.Price;

            const result = await Book.findByIdAndUpdate({ _id: requestQuery.id }, { $set: { Title: Title, Author: Author, Category: Category, ISBN: ISBN, Description: Description, Price: Price } });
            return {
                status: statuscode.success,
                content: {
                    message: `book is updated ${msg.sucess}`,
                    result
                }
            } 
        }catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }
    }
}
