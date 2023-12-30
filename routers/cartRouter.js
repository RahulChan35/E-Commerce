import express from "express";
const router = express.Router();

import {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCart,
} from "../controllers/cartController.js";

router.route("/addToCart/:id").post(addToCart);
router.route("/removeFromCart/:id").delete(removeFromCart);
router.route("/cartItems").get(getCartItems);
router.route("/clear-cart").delete(clearCart);

export default router;
