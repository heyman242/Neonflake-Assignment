import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      "-password"
    );

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const uploadJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files || !req.files.thumbnail || !req.files.video) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Both thumbnail and video files are required",
      });
    }

    const thumbnailResponse = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path
    );
    const videoResponse = await cloudinary.uploader.upload(
      req.files.video[0].path
    );

    const newJob = new Job({
      userId: req.user.userId,
      title,
      description,
      thumbnailUrl: thumbnailResponse.secure_url,
      videoUrl: videoResponse.secure_url,
    });

    
    await newJob.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Job created successfully" });
  } catch (error) {
    console.error("Error uploading job:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
