import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      default: "credentials",
    },
    role: {
      type: String,
      default: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpireAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpireAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
