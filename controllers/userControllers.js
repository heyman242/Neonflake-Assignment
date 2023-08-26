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

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Thumbnail file is required",
      });
    }

    const thumbnailResponse = await cloudinary.v2.uploader.upload(
      req.file.path
    );

    if (!thumbnailResponse.secure_url) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error uploading thumbnail to Cloudinary",
      });
    }

    const newJob = new Job({
      userId: req.user.userId,
      title,
      description,
      thumbnailUrl: thumbnailResponse.secure_url,
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
