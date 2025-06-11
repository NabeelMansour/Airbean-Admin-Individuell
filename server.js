import authRouter from "./routes/auth.js";
import orderRouter from "./routes/orders.js";
import menuRouter from "./routes/menu.js";
import cartRouter from "./routes/cart.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";
import { requireAdmin } from "./middleware/authorization.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(logger);

//routes
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);

// DB EmitEvents
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// ErrorHandling
app.use(errorHandler);
