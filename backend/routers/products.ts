import express from "express";
import { IProduct } from "../types";
import Product from "../models/Product";
import auth from "../middlewares/auth";
import permit from "../middlewares/permit";
import { isValidObjectId } from "mongoose";

const productsRouter = express.Router();

productsRouter.post("/", auth, permit("admin"), async (req, res) => {
  try {
    const {
      title,
      originalPrice,
      image,
      galleryImages,
      shortDescription,
      description,
      active,
      category,
    }: IProduct = req.body;
    if (!title || !description || !originalPrice) {
      res.status(400).json({
        ok: false,
        message: "All fields is required",
      });
      return;
    }

    const product = new Product({
      category: category || null,
      title,
      shortDescription,
      description,
      originalPrice,
      active,
      image,
      galleryImages,
    });

    await product.save();

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "internal server error " + e,
    });
    return;
  }
});

productsRouter.get("/", auth, permit("admin"), async (req, res) => {
  try {
    const products = await Product.find().populate("category", "id name");

    res.status(200).json({
      ok: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    return;
  }
});

productsRouter.patch("/:id", auth, permit("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        ok: false,
        message: "Invalid id",
      });
      return;
    }

    const data: IProduct = {
      category: req.body.category === "" ? null : req.body.category,
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      originalPrice: req.body.originalPrice,
      discountPrice: req.body.discountPrice,
      active: req.body.active,
      image: req.body.image,
      galleryImages: req.body.galleryImages,
    };

    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    return;
  }
});

productsRouter.delete("/:id", auth, permit("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        ok: false,
        message: "Invalid id",
      });
      return;
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        ok: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    console.log(err);
    return;
  }
});

export default productsRouter;
