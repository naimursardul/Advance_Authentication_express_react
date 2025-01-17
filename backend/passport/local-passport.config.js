import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function verify(email, password, cb) {
      try {
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
          return cb(null, false, "User not found");
        }

        bcrypt.compare(
          password,
          user._doc.password,
          async function (err, isMatched) {
            if (err) {
              throw new Error(err);
            }
            if (!isMatched) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            user.lastLogin = new Date();
            await user.save();

            return cb(null, user);
          }
        );
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
