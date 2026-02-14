import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connection success: ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB connection failed: ${error.message}`);
  }
};

export default connectDb;
