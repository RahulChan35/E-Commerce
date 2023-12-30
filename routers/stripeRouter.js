import express from "express";
const router = express.Router();

import { checkOut } from "../controllers/stripeController.js";

router.route("/create-checkout-session").post(checkOut);

export default router;
