import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN);
    res.status(200).json({ success: true, message: "welcome" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
});

export default auth;
