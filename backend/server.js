import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db_connection } from "./config/db_config.js";

// Dotenv setup

dotenv.config({
  path: ".env",
});

// app config

const app = express();
const port = process.env.PORT || 8000;

// middlewares config

app.use(express.json());
app.use(cors());

// DB connection
db_connection();

app.get(`/`, (req, res) => {
  res.send({
    data: null,
    message: "/api route is working",
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Server is running on: ${"http://localhost:" + port}`);
});
