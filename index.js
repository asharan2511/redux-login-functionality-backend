import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/v1", userRouter);
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Port is running on port: ${port}`);
});
