import express from "express";
import {
  checkIfUserLogged,
  deleteUser,
  getAllUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user-controller.js";
import { verifyJwt } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.post("/sign-up", registerUser);
userRouter.post("/login", loginUser);

// Secured route
userRouter.post("/logout-user", verifyJwt, logoutUser);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.post("/check-user", checkIfUserLogged);

// Admin (secured routed)
userRouter.get("/all-users", getAllUser);
userRouter.get("/delete-user", deleteUser);

export default userRouter;
