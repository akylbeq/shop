import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routers/users";
import cors from "cors";
import categoriesRouter from "./routers/categories";
import dotenv from "dotenv";
import uploadRouter from "./routers/upload";
import productsRouter from "./routers/products";
import shopsRouter from "./routers/shops";

dotenv.config();

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());
app.use("/upload", uploadRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/shop", shopsRouter);

const run = async () => {
  await mongoose.connect("mongodb://localhost/zero");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));

  process.on("exit", async () => {
    await mongoose.disconnect();
  });
};

run().catch(console.error);
