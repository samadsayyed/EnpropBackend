import { Admin } from "../model/Admin.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/cookie.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, role, password } = req.body;
    const checkAdmin = await Admin.findOne({ name });
    if (checkAdmin) return res.json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await Admin.create({ name, role, password: hashedPassword });
    res.json({
      data,
    });
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const checkAdmin = await Admin.findOne({ name });
    if (!checkAdmin || !(await bcrypt.compare(password, checkAdmin.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    sendCookie(checkAdmin, res, "Welcome Back", 201);
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};

export const Profile = async (req, res) => {
  try {
    const admin = req.admin;
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
