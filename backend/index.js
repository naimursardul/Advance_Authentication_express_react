import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import authRouter from "./routes/auth_routes.js";
import userRouter from "./routes/user_routes.js";
import roleRouter from "./routes/role_routes.js";
import permissionRouter from "./routes/permission_routes.js";
import { connectDB } from "./db/db.js";
import "./passport/google-passport.config.js";
import "./passport/local-passport.config.js";
import "./passport/passport.config.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret
    resave: false, // Avoid saving session if not modified
    saveUninitialized: false, // Avoid creating sessions until something is stored
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Reuse Mongoose connection
      collectionName: "sessions", // Optional
      ttl: 7 * 24 * 60 * 60, // Time-to-live in seconds
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Send over HTTPS in production
      httpOnly: true, // Protect cookie from being accessed by client-side scripts
      maxAge: 1000 * 60 * 60 * 24 * 7, // Expiry: 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust for cross-origin requirements if needed
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello worldss!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`[Server]: Server is running on port ${process.env.PORT}`);
});
