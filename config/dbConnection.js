import mongoose, { mongo } from "mongoose";

export const dbConnect = async () => {
  const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(
    "database connected:",
    connect.connection.host,
    connect.connection.name
  );
  try {
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
