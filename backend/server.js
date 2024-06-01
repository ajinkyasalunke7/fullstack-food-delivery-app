import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db_connection } from "./config/db_config.js";
import foodRouter from "./routes/food-route.js";
import userRouter from "./routes/user-route.js";
import cookieParser from "cookie-parser";
// Dotenv setup

dotenv.config({
  path: ".env",
});

// app config

const app = express();
const port = process.env.PORT || 8000;

// middlewares config

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
    withCredentials: true,
  })
);

// {
//     origin: ["http://192.168.134.122:5173", "http://localhost:5173"],
//     credentials: true,
//   }
app.use(cookieParser());

// DB connection
db_connection();

// Api Endpoints
app.use(`/images`, express.static("uploads"));
app.use(`/api/food`, foodRouter);
app.use(`/api/auth`, userRouter);

app.get(`/`, (req, res) => {
  res.send({
    data: null,
    message: "/api route is working",
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Server is running on: ${"http://localhost:" + port}/api/`);
});
