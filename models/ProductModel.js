import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default new mongoose.model("Product", ProductSchema);
