import express from "express";
import auth, { Req } from "../middlewares/auth";
import permit from "../middlewares/permit";
import { IShop } from "../types";
import Shop from "../models/Shop";

const shopsRouter = express.Router();

shopsRouter.post("/", auth, permit("admin"), async (req, res) => {
  const customReq = req as Req;

  if (!customReq.user) {
    res.status(401).json({
      ok: false,
      message: "Unauthorized",
    });
    return;
  }

  if (customReq.user.isBlocked) {
    res.status(403).json({
      ok: false,
      message: "You are blocked",
    });
    return;
  }

  try {
    const {
      name,
      title,
      description,
      phone,
      address,
      logo,
      slug,
      image,
      instagram,
      whatsapp,
      createdAt,
    }: IShop = req.body;
    const requiredFields = [
      "name",
      "title",
      "description",
      "phone",
      "address",
      "logo",
      "image",
      "slug",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        ok: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    const isFree = await Shop.findOne({ slug });

    if (isFree) {
      res.status(400).json({
        ok: false,
        message: "Shop with this slug already exists",
      });
      return;
    }

    const phoneRegex = /^[0-9+()\s-]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({
        ok: false,
        message: "Invalid phone format",
      });
      return;
    }

    if (instagram && !instagram.startsWith("https://")) {
      res.status(400).json({
        ok: false,
        message: "Instagram link must start with https://",
      });
      return;
    }

    if (whatsapp && !whatsapp.startsWith("+") && !/^\d+$/.test(whatsapp)) {
      res.status(400).json({
        ok: false,
        message: "Invalid WhatsApp number",
      });
      return;
    }

    const shop = new Shop({
      user: customReq.user._id,
      name,
      title,
      description,
      phone,
      address,
      logo,
      image,
      active: true,
      slug,
      instagram,
      whatsapp,
      createdAt,
    });

    await shop.save();

    res.status(200).json({
      ok: true,
      shop,
    });
  } catch (err) {
    console.log(err);
  }
});

shopsRouter.get("/", auth, permit("admin"), async (req, res) => {
  try {
    const user = req as Req;

    if (!user.user) {
      res.status(401).json({
        ok: false,
        message: "Unauthorized",
      });
      return;
    }

    const shops = await Shop.find({ user: user.user._id });

    res.status(200).json({
      ok: true,
      shops,
    });
  } catch (err) {
    console.log(err);
  }
});

export default shopsRouter;
