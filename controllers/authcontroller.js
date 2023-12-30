import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already in use" });
  }
  req.body.password = await hashPassword(req.body.password);
  await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "User Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "User not found..Register to continue" });
  }
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid credentials" });
  }
  const token = createJWT({ userId: user._id });
  // cookie settings so as to access in front-end
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged In" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
};
