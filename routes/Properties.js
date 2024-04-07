import express, { Router } from "express"
import { addImages, addVideos, getAllProperties, newProperty } from "../controller/Properties.js"
import singleUpload from "../middlewares/multer.js"
import multipleUpload from "../middlewares/multer.js"
import { isAuthenticated } from "../middlewares/auth.js"

export const propertyRouter = express.Router()

propertyRouter.get("/all",getAllProperties)

propertyRouter.post("/new",isAuthenticated,newProperty)

propertyRouter.post("/:id/addImg",isAuthenticated,singleUpload,addImages)
propertyRouter.post("/:id/addVid",isAuthenticated,singleUpload,addVideos)

