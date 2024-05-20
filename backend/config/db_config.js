import mongoose from "mongoose";

export const db_connection = async () => {
  await mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected");
  });
};
