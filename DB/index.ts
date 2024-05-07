import mongoose, { connect } from "mongoose";
import { dburl, dbname } from '../constant/constat';


export const connectDb = async () => {
    try {
        await mongoose.connect(`${dburl}/${dbname}`);
        console.log('database is connected ');
    }
    catch (e: any) {
        console.log(e);
    }
}
