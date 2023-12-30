import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
  }
  try {
    const { userId } = verifyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {}
};
