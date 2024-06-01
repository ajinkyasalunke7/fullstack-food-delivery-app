import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import UserModel from "../models/user-model.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      501,
      error?.message || "Something went wrong in middleware"
    );
  }
});
