import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import authRouter from "./routes/auth_routes.js";
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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello worldss!");
});

app.get("/profile", (req, res) => res.send({ user: req.user }));

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`[Server]: Server is running on port ${process.env.PORT}`);
});
