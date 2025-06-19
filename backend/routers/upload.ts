import express from "express";
import multer, { memoryStorage } from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const uploadRouter = express.Router();

const upload = multer({ storage: memoryStorage() });
const s3 = new S3Client({ region: process.env.AWS_REGION });

uploadRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 6 },
  ]),
  async (req, res, next) => {
    try {
      const files = req.files as {
        image?: Express.Multer.File[];
        galleryImages?: Express.Multer.File[];
      };

      if (!files?.image && !files?.galleryImages) {
        res.status(400).json({
          ok: false,
          message: "Files not uploaded",
        });
        return;
      }

      const fileName = randomUUID();

      if (files.image) {
        const fileBuffer = files.image[0].buffer;
        const mimeType = files.image[0].mimetype;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,
          Body: fileBuffer,
          ContentType: mimeType,
        });

        await s3.send(command);
      }

      const galleryImages: string[] = [];
      if (files.galleryImages) {
        for (const img of files.galleryImages) {
          const fileName = randomUUID();
          await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: fileName,
              Body: img.buffer,
              ContentType: img.mimetype,
            }),
          );
          galleryImages.push(
            "https://mybuckethsplay.s3.eu-north-1.amazonaws.com/" + fileName,
          );
        }
      }

      res.status(200).json({
        ok: true,
        image: files.image
          ? "https://mybuckethsplay.s3.eu-north-1.amazonaws.com/" + fileName
          : undefined,
        galleryImages: galleryImages.length !== 0 ? galleryImages : undefined,
      });
    } catch (error) {
      res.status(500).send("Error uploading file " + error);
      return;
    }
  },
);

export default uploadRouter;
