import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

//POST register

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = await req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are necessary");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(200)
      .json({ success: true, message: "User created Successfully", user });
  } else {
    res.status(404).json({ success: false, message: "User was not created" });
  }
});

//POST login

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: "All Fields Necessary" });
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        //payload
        user: {
          username: user.name,
          email: user.email,
          id: user._id,
        },
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "10m" }
    );

    res.cookie("token", accessToken);
    res.json({
      success: true,
      message: "Logged In Successfully",
      token: accessToken,
      user: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Email/Pasword is incorrect. please try again",
    });
  }
});

//GET current user

export const currentUser = asyncHandler(async (req, res) => {
  const currtuser = await req.user;
  res.json(currtuser);
});

//GET logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
  const logout = res.cookie("token", "", { maxAge: 1 });
  if (!logout) {
    res.status(400).json({ success: false });
  }
  res
    .status(200)
    .json({ success: true, messsage: "User Successfully Logged out" });
});
