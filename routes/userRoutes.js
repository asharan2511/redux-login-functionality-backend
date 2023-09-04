import express from "express";
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import auth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser).post("/login", loginUser);
userRouter.get("/me", auth, currentUser).get("/logout", logoutUser);

export default userRouter;
