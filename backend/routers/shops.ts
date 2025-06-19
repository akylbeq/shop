import express from "express";
import auth from "../middlewares/auth";
import permit from "../middlewares/permit";
import { IShop } from "../types";
import Shop from "../models/Shop";

const shopsRouter = express.Router();

shopsRouter.post("/", auth, permit("admin"), async (req, res) => {
  try {
    const {
      user,
      name,
      title,
      description,
      phone,
      address,
      logo,
      image,
      active,
      instagram,
      whatsapp,
      createdAt,
    }: IShop = req.body;
    const requiredFields = [
      "user",
      "name",
      "title",
      "description",
      "phone",
      "address",
      "logo",
      "image",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).json({
        ok: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
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
      user: user,
      name,
      title,
      description,
      phone,
      address,
      logo,
      image,
      active,
      instagram,
      whatsapp,
      createdAt,
    });
  } catch (err) {
    console.log(err);
  }
});

export default shopsRouter;
