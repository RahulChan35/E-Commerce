import express from "express";
const router = express.Router();

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multerMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(upload.single("picture"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
