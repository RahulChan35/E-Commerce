// IMPORTS
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

const app = express();

// ROUTERS
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import stripeRouter from "./routers/stripeRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// MIDDLEWARES
import { authenticateUser } from "./middlewares/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ msg: "Hello, world!!!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/products", authenticateUser, productRouter);
app.use("/api/v1/carts", authenticateUser, cartRouter);
app.use("/api/v1/checkout", authenticateUser, stripeRouter);

const PORT = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
