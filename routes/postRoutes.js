import { Router } from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/postModel.js";

dotenv.config();
const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({success: true, data : posts})
    } catch (error) {
        return res.status(500).json({success: false, message : error})
    }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    // console.log(photo)
    const photoUrl = await cloudinary.uploader.upload(photo)
    // console.log(photoUrl)
    const newPost = await new Post({
      name,
      prompt,
      photo: photoUrl.secure_url,
    }).save();

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    return res.status(500).json({ success:false, message : error})
  }
});

export default router;
