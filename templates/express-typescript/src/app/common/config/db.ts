import mongoose from "mongoose";
import { env } from "../../../env.js";

const MONGO_URI = env.MONGO_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;