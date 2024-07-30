import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      required: true,
      default: "subscriber",
      enum: ["admin", "subscriber", "suspended"],
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      required: true,
      default: Date.now().toString(),
    },
    tokenExpiryDate: {
      type: Date,
      required: true,
      default: Date.now().toString(),
    },
  },
  { timestamps: true }
);

const User = models?.User || mongoose.model("User", userSchema);
export default User;
