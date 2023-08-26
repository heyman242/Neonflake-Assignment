import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  uploadJob,
  getUploads,
} from "../controllers/userControllers.js";
import upload from "../middleware/multerMiddleware.js";

const fileFields = [
  { name: "thumbnail" },
  { name: "video" },
];

router.get("/current-user", getCurrentUser);
router.post("/upload", upload.fields(fileFields), uploadJob);
router.get("/uploads", getUploads)

export default router;
