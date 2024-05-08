import mongoose, { connect } from "mongoose";



export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.dburl}/${process.env.dbname}`);
        console.log('database is connected ');
    }
    catch (e: any) {
        console.log(e);
    }
}
