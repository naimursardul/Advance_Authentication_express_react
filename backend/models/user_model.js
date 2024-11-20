import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      default: "credentials",
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