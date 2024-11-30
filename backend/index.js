import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import authRouter from "./routes/auth_routes.js";
import { connectDB } from "./db/db.js";
import "./passport/google-passport.config.js";
import session from "express-session";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://advance-authentication-express-react.vercel.app",
      "http://localhost:5173",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/profile", (req, res) => res.send({ user: req.user }));

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`[Server]: Server is running on port ${process.env.PORT}`);
});
