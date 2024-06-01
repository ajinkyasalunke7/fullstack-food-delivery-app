import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateExpiryTime } from "../utils/calculateExpiryTime .js";

// Token generate

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await UserModel.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      throw new ApiError(422, "Name, email, and password are required fields.");
    }

    if (!validator.isEmail(email)) {
      return res.json(
        new ApiResponse(422, null, "Please enter valid email address")
      );
    }

    if (password.length < 8) {
      return res.json(
        new ApiResponse(
          422,
          { passwordLengthIs: password.length },
          "Please enter strong password"
        )
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json(
        new ApiResponse(409, null, "User with this email already exists.")
      );
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.json(
      new ApiResponse(200, { name, email }, "User registered successfully.")
    );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error,
          error.message || "An error occurred while processing your request."
        )
      );
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email);
    if (!email || !password) {
      throw new ApiError(422, "Email and password are required fields.");
    }

    if (!validator.isEmail(email)) {
      return res.json(
        new ApiResponse(422, null, "Please enter a valid email address")
      );
    }

    if (password.length < 8) {
      return res.json(
        new ApiResponse(
          422,
          { passwordLengthIs: password.length },
          "Please enter a strong password"
        )
      );
    }

    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res.json(
        new ApiResponse(
          409,
          null,
          "User with this email does not exist. Please create an account."
        )
      );
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      checkUser._id
    );
    const loggedInUser = await UserModel.findById(checkUser._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    const accessTokenExpiry = calculateExpiryTime(30, "minutes");
    const refreshTokenExpiry = calculateExpiryTime(30, "minutes");

    return res
      .cookie("accessToken", accessToken, {
        ...options,
        expires: accessTokenExpiry,
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        expires: refreshTokenExpiry,
      })
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
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

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      // expires: calculateExpiryTime(10, "m"),
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, null, "User logged out"));
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

// refreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await UserModel.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw (new ApiError(401), "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      // expires: calculateExpiryTime(10, "m"),
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user?._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access token is refreshed"
        )
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

// Check-user if logged or not
const checkIfUserLogged = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await UserModel.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw (new ApiError(401), "Refresh token is expired or used");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { isUserLoggedIn: true }, "User token are active")
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

// Get All User
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    if (!allUser) {
      throw new ApiError(404, "Error occurred while fetching users");
    }
    return res.json(new ApiResponse(200, { allUser }, "User fetched"));
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

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      throw new ApiError(201, "User not found");
    }
    return res.json(
      new ApiResponse(200, { email: deletedUser.email }, "User deleted")
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

export {
  loginUser,
  registerUser,
  logoutUser,
  getAllUser,
  deleteUser,
  refreshAccessToken,
  checkIfUserLogged,
};
