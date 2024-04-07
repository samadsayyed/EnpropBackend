import getDataUri from "../middlewares/getUrl.js";
import { Property } from "../model/Properties.js";
import cloudinary from "cloudinary";

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    // console.log(title, address, email);
    res.json({ properties });
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};

export const newProperty = async (req, res) => {
  try {
    const { title, address, email } = req.body;
    console.log(req.body);
    const data = await Property.create({ title, address, email });
    res.json({
      data,
    });
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};

export const addImages = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.json({ Message: "Property not found" });
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    property.images.push({
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    });
    await property.save();
    res.json({
      message: "done",
    });
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};

export const addVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.json({ Message: "Property not found" });
    const file = req.file;
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      resource_type: "video",
    });
    property.videos.push({
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    });
    await property.save();
    res.json({
      message: "done",
    });
  } catch (error) {
    res.json({ message: "Internal server error" }).status(500);
  }
};
