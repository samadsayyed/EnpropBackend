// Middleware to check if the user is an admin
import jwt from "jsonwebtoken"
import { Admin } from "../model/Admin.js";

export const isAdmin = (req, res, next) => {
    if (req.admin && req.admin.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Permission denied' });
};

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.admin = await Admin.findById(decoded._id);
  next();
};