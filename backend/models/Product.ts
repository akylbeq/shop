import mongoose, { isValidObjectId, Schema } from "mongoose";

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    validate: {
      validator: function (
        value: string | Schema.Types.ObjectId | null | undefined,
      ) {
        return value === null || value === undefined || isValidObjectId(value);
      },
    },
  },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number },
  active: { type: Boolean, default: false },
  image: { type: String, required: true },
  galleryImages: [{ type: String }],
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
