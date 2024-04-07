import express, { Router } from "express"
import { createAdmin, loginAdmin, Profile } from "../controller/Admin.js"
import { isAuthenticated } from "../middlewares/auth.js"


export const adminRouter = express.Router()

adminRouter.post("/login",loginAdmin)
adminRouter.post("/register",createAdmin)
adminRouter.get("/profile",isAuthenticated,Profile)