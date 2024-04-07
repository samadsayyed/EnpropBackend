import mongoose from "mongoose";

// Define User Schema
const adminSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  password: String,
});

// Create User Model
export const Admin = mongoose.model("Admin", adminSchema);
