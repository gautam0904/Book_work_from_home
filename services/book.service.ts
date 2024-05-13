import mongoose, { ObjectId } from "mongoose";
import { msg } from "../constant/message";
import { statuscode } from "../constant/status";
import { createbookInterface } from "../interface/request.interface";
import { Book } from "../model/book.model"
import { User } from "../model/user.model";
import { customError } from "../utiles/error.handller";

export class BookService {
    async getbook(requestQuery: any) {
        try {
            const pipeline: any = [];

            if (requestQuery.category != null) {
                pipeline.push({
                    $match: {
                        Category: new mongoose.Schema.Types.ObjectId(requestQuery.category)
                    }
                },)
            } else if (requestQuery.author != null) {
                pipeline.push({
                    $match: {
                        Author: new mongoose.Schema.Types.ObjectId(requestQuery.author)
                    }
                },)
            } else if (requestQuery.searchedBook != null) {
                pipeline.push({
                    $match: {
                        Title: requestQuery.searchedBook
                    }
                },)
            } else if (requestQuery.page != undefined && requestQuery.pagesize != undefined) {
                const pageNUmber = parseInt((requestQuery.page as string)) || 1;
                const limit = parseInt((requestQuery.pagesize as string)) || 10;
                const skip = (pageNUmber - 1) * limit;
                pipeline.push({
                    $skip: skip
                },
                    {
                        $limit: limit
                    })
            }
            const result = await Book.aggregate(pipeline);
            return {
                status: statuscode.success,
                content: {
                    result
                }
            }

        }
        catch (error) {
            return {
                status: statuscode.catchErr,
                content: {
                    message: msg.catchErr
                }
            }
        }

    }


    async createbook(requestBody: createbookInterface, userId: string) {
        try {
            const user = await User.findById(userId);
            if (user?.Type === "user") {
                throw new customError(statuscode.catchErr, msg.bookauth)
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

    async deletebook(id: string, userId: string): Promise<{ status: number, content: object }> {
        try {
            const user = await User.findById(userId);
            if (user?.Type === "user") {
                throw new customError(statuscode.catchErr, msg.bookauth)
            }
            if (user?.Type === "author") {
                const deletebook = await Book.findById(id);
                // if (deletebook?.Author != user.Name) {
                //     throw new customError(statuscode.catchErr , msg.authorbook)
                // }
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

    async updatebook(userId: string, requestBody: createbookInterface, requestQuery: any) {
        try {
            const book = await Book.findById(requestQuery.id);
            const user = await User.findById(userId);
            if (user?.Type === "user") {
                throw new customError(statuscode.catchErr, msg.categoryAdmin)
            }
            if (user?.Type === "author") {
                const updatebook = await Book.findById(requestQuery.id);
                // if (updatebook?.Author != user.Name) {
                //     throw new customError (statuscode.catchErr ,msg.authorbook)
                // }

                const Title = requestBody.Title ? requestBody.Title : book?.Title;
                const Author = requestBody.Author ? requestBody.Author : book?.Author;
                const Category = requestBody.Category ? requestBody.Category : book?.Category;
                const Description = requestBody.Description ? requestBody.Description : book?.Description;
                const ISBN = requestBody.ISBN ? requestBody.ISBN : book?.ISBN;
                const Price = requestBody.Price ? requestBody.Price : book?.Price;

                const result = await Book.findByIdAndUpdate({ _id: requestQuery.id }, { $set: { Title: Title, Author: Author, Category: Category, ISBN: ISBN, Description: Description, Price: Price } });
                return {
                    status: statuscode.success,
                    content: {
                        message: `book is updated ${msg.sucess}`,
                        result
                    }
                }
            }
            const Title = requestBody.Title ? requestBody.Title : book?.Title;
            const Author = requestBody.Author ? requestBody.Author : book?.Author;
            const Category = requestBody.Category ? requestBody.Category : book?.Category;
            const Description = requestBody.Description ? requestBody.Description : book?.Description;
            const ISBN = requestBody.ISBN ? requestBody.ISBN : book?.ISBN;
            const Price = requestBody.Price ? requestBody.Price : book?.Price;

            const result = await Book.findByIdAndUpdate({ _id: requestQuery.id }, { $set: { Title: Title, Author: Author, Category: Category, ISBN: ISBN, Description: Description, Price: Price } });
            return {
                status: statuscode.success,
                content: {
                    message: `book is updated ${msg.sucess}`,
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
