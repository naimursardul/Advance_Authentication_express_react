import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import { User } from "../models/user_model.js";
import {
  sendResetPasswordSuccessEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";
import { createJwtAndSetCookie } from "../utils/createJwtAndSetCookie.js";

dotenv.config();

//  SIGN UP WITH EMAIL
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: `All fields are required!`,
        user: null,
      });
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: `User is already existed.`,
        user: null,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(Math.random() * 1000000).toString();

    const user = await new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hr
    });

    await user.save();

    await sendVerificationEmail(user?.email, verificationToken);

    return res.status(200).json({
      success: true,
      message: `User created successfully!`,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Network error or unexpected issue.",
      user: null,
    });
  }
};

// Verify Code and send welcome email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Invalid or expired verification code`,
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;

    await user.save();

    createJwtAndSetCookie(res, user._id);
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: `Email verified successfully.`,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error.`, user: null });
  }
};

// LOGIN WITH EMAIL
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials", user: null });
    }
    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: `Wrong password`, user: null });
    }

    createJwtAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `User logged in successfully.`,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error in log in: ${error.message}`,
      user: null,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    if (req.user?.provider && req.user.provider === "google") {
      req.logout((err) => {
        if (err) throw Error(err);
      });
      return res.redirect("/");
    }
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: `User logged out successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Error in server side.` });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `User not found.` });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpireAt = resetTokenExpireAt;
    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: `Reset email sent successfully. Please, check your inbox.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Server error.` });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  console.log(resetToken);

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `User not found.` });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(hashedPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireAt = undefined;

    await user.save();

    await sendResetPasswordSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: `Password reset successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: `Server error.` });
  }
};

// CHECK AUTH
export const checkAuth = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `User not found`, user: null });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: error.message, user: null });
  }
};
