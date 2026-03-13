import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};