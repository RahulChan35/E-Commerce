import express from "express";
const router = express.Router();

import { register, login, logout } from "../controllers/authcontroller.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
