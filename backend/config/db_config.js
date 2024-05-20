import mongoose from "mongoose";

export const db_connection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://food-app:food-app@cluster0.eyfplol.mongodb.net/food-app"
    )
    .then(() => {
      console.log("Database connected");
    });
};
