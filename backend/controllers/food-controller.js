import FoodModel from "../models/food-model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";

// Add Food Item

const addFood = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      throw new ApiError(400, "Please provide all required fields.");
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      throw new ApiError(400, "Price should be a valid number greater than 0.");
    }

    let image_filename = req.file.filename;

    const addedFoodItem = await FoodModel.create({
      name,
      description,
      price,
      image: image_filename,
      category,
    });

    res.json(
      new ApiResponse(200, addedFoodItem, "Food item added successfully.")
    );
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "An error occurred while processing your request."
        )
      );
  }
});

// All Food Items

const listAllFoodItems = asyncHandler(async (req, res) => {
  try {
    const foodItems = await FoodModel.find({});

    if (!foodItems || foodItems.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No food items found"));
    }

    return res.json(new ApiResponse(200, foodItems, "All food items sent"));
  } catch (error) {
    console.error("Error while listing food items:", error);
    const statusCode = error.statusCode || 500;
    const message =
      error.message || "An error occurred while processing your request.";
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, null, message));
  }
});
// Remove food item

const removeFoodItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "string" || id.trim() === "") {
      throw new ApiError(400, "Invalid or missing food item ID.");
    }
    const deletedItem = await FoodModel.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new ApiError(404, "Food item not found with the provided ID.");
    }
    fs.unlink(`uploads/${deletedItem.image}`, () => {
      console.log("Item deleted");
    });

    res.json(new ApiResponse(200, null, "Item removed"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "An error occurred while processing your request."
        )
      );
  }
});

export { addFood, listAllFoodItems, removeFoodItem };
