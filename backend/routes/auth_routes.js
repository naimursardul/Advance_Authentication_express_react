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

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// router.get("/google", (req, res) => res.status(300).json({ message: "hello" }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

export default router;
