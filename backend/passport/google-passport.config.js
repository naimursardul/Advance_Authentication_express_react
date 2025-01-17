import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user_model.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const {
        name,
        email,
        picture,
        email_verified: isVerified,
      } = profile._json;
      try {
        const existedUser = await User.findOne({ email, provider: "google" });
        if (!existedUser) {
          const newUser = await User.create({
            name,
            email,
            img: picture,
            isVerified,
            provider: profile?.provider,
            lastLogin: Date.now(),
          });

          await newUser.save();
          return done(null, newUser);
        }

        existedUser.lastLogin = new Date();
        await existedUser.save();
        return done(null, existedUser);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
