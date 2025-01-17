import passport from "passport";
import { User } from "../models/user_model.js";

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id).select("-password");
    cb(null, user);
  } catch (error) {
    cb(error, null);
  }
});
