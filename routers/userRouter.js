import express from "express";
const router = express.Router();

import { getCurrentUser } from "../controllers/userController.js";

router.route("/current-user").get(getCurrentUser);

export default router;
