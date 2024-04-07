import express from "express";
import { connectDb } from "./Database/Connect.js";
import cors from "cors";
import { config } from "dotenv";
import { propertyRouter } from "./routes/Properties.js";
import bodyParser from "body-parser";
import cloudinary from "cloudinary"
import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/Admin.js";

config({
  path: "./config.env",
});
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
connectDb();

app.use(cors());
app.use(propertyRouter)
app.use(adminRouter)

app.get("/",(req,res)=>{
  res.send("<h1>You are on a wrong page visit frontend</h1>")
})
app.listen(3000, () => {
  console.log("Hello");
});
