import { Router } from "express";
import { CategoryType } from "../types";
import Category from "../models/Category";
import auth from "../middlewares/auth";
import { isValidObjectId } from "mongoose";
import permit from "../middlewares/permit";

const categoriesRouter = Router();

categoriesRouter.post("/", auth, permit("admin"), async (req, res, next) => {
  try {
    const {
      parentId,
      name,
      keyword,
      slug,
      descriptionMeta,
      isActive,
    }: CategoryType = req.body;

    const isValid = await Category.findOne({ name });

    if (isValid) {
      res.status(400).json({
        ok: false,
        message: "Категория с таким именем уже существует",
      });
      return;
    }

    if (!name) {
      res.status(400).json({
        ok: false,
        message: "Заполните поле название",
      });
      return;
    }

    const category = new Category({
      parentId,
      name,
      keyword,
      slug,
      descriptionMeta,
      isActive,
    });

    await category.save();

    res.status(201).json({
      ok: true,
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: "internal server error",
    });
    next();
  }
});

categoriesRouter.get("/", auth, async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      ok: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "internal server error",
    });
    next();
  }
});

categoriesRouter.patch("/:id", auth, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({
        ok: false,
        message: "Invalid objectId",
      });
      return;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      res.status(404).json({
        ok: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      category,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "internal server error",
    });
    next();
  }
});

categoriesRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      res.status(400).json({
        ok: false,
        message: "Invalid objectId",
      });
      return;
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      res.status(404).json({
        ok: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: "Категория удалена",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "internal server error",
    });
    next();
  }
});

export default categoriesRouter;
