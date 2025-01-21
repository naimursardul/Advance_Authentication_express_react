import express from "express";
import {
  credentialsLoginSuccess,
  forgotPassword,
  resetPassword,
  logout,
  signup,
  verifyEmail,
  checkAuth,
} from "../controllers/auth_controllers.js";
import passport from "passport";

const router = express.Router();

// sign up
router.post("/signup", signup);
// Verify email
router.post(
  "/verify-email",
  verifyEmail,
  passport.authenticate("local"),
  (req, res) => {
    if (!req.user) {
      res.status(200).json({
        success: false,
        message: `Email not verified successfully.`,
        user: null,
      });
    }
    res.status(200).json({
      success: true,
      message: `Email verified successfully.`,
      user: req.user,
    });
  }
);
// login
router.post("/login", passport.authenticate("local"), credentialsLoginSuccess);
//logout
router.get("/logout", logout);

// forgot password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

// check auth
router.get("/check-auth", checkAuth);

// google login with passport
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// google login callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    successRedirect: `${process.env.FRONTEND_URL}`,
  })
);

export default router;
