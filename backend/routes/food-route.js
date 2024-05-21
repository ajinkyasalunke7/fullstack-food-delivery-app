import express from "express";
import {
  addFood,
  listAllFoodItems,
  removeFoodItem,
} from "../controllers/food-controller.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const filename = `${Date.now()}-${randomNumber}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/all-food-items", listAllFoodItems);
foodRouter.delete("/remove-food-item", removeFoodItem);

export default foodRouter;
