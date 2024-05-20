import express from "express";
import cors from "cors";
import { db_connection } from "./config/db_config.js";
// app config

const app = express();
const port = 3000;

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

// mongodb+srv://food-app:food-app@cluster0.eyfplol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
