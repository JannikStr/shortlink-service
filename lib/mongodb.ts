import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

if(!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.")
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(DATABASE_URL);
    if(connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch(error) {
    console.error(error);
    return Promise.reject(error);
  }
}

