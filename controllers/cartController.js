import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

export const addToCart = async (req, res) => {
  await User.findById({ _id: req.user.userId }).then(async (doc) => {
    const product = await Product.findById({ _id: req.params.id }).then(
      (product) => {
        doc.cart.push(product);
        doc.save();
      }
    );
  });
  res.status(StatusCodes.OK).json({ msg: "product added to cart" });
};

export const removeFromCart = async (req, res) => {
  await User.findById({ _id: req.user.userId }).then((doc) => {
    const newCart = doc.cart.filter(
      (cartItem) => cartItem.valueOf() !== req.params.id
    );
    doc.cart = newCart;
    doc.save();
  });
  res.status(StatusCodes.OK).json({ msg: "product removed from cart" });
};

export const getCartItems = async (req, res) => {
  const cartItems = [];
  await User.findById({ _id: req.user.userId }).then(async (doc) => {
    for (let i = 0; i < doc.cart.length; i++) {
      const product = await Product.findById({
        _id: doc.cart[i].valueOf(),
      }).then((product) => {
        cartItems.push(product);
      });
    }
  });
  res.status(StatusCodes.OK).json(cartItems);
};

export const clearCart = async (req, res) => {
  await User.findById({ _id: req.user.userId }).then((doc) => {
    const newCart = [];
    doc.cart = newCart;
    doc.save();
  });
  res.status(StatusCodes.OK).json({ msg: "cart cleared" });
};
