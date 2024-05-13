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

export const disconnectDB = async () => {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB', error);
    }
  }