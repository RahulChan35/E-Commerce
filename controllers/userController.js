import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const getCurrentUser = async (req, res) => {
  const current_user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json(current_user);
};
