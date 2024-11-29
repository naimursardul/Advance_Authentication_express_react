import express from "express";
import {
  forgotPassword,
  resetPassword,
  login,
  logout,
  signup,
  verifyEmail,
  checkAuth,
} from "../controllers/auth_controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import passport from "passport";

const router = express.Router();

// sign up
router.post("/signup", signup);
// Verify email
router.post("/verify-email", verifyEmail);
// login
router.post("/login", login);
//logout
router.get("/logout", logout);

// forgot password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

// check auth
router.get("/check-auth", verifyToken, checkAuth);

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
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.status(200).json({ message: "User logged in successfuly." });
  }
);

export default router;
