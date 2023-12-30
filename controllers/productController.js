import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import storage from "../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const createProduct = async (req, res) => {
  const imageRef = ref(storage, `products/${v4() + req.file.originalname}`);
  const metadata = {
    contentType: req.file.mimetype,
  };
  await uploadBytes(imageRef, req.file.buffer, metadata).then(() => {
    getDownloadURL(imageRef).then(async (url) => {
      const newProduct = {
        title: req.body.title,
        description: "Description not found",
        price: req.body.price,
        ratings: req.body.ratings,
        picture: url,
      };
      await Product.create(newProduct);
    });
  });
  res.status(StatusCodes.CREATED).json({ msg: "product is created" });
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json(products);
};

export const getSingleProduct = async (req, res) => {
  const singleProduct = await Product.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json(singleProduct);
};

export const updateProduct = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "product is updated" });
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ msg: "product is deleted" });
};
