import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [validator.isEmail, "The Email entered is invalid"],
    },
    password: {
      type: String,
      minlength: 6,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
