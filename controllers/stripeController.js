import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";

import * as dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const checkOut = async (req, res) => {
  const line_items = req.body.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.picture],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/home/order`,
    cancel_url: `${process.env.CLIENT_URL}/home/checkout-failure`,
  });
  res.status(StatusCodes.ACCEPTED).json({ url: session.url });
};
