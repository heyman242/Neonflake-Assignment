import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  uploadJob,
  getUploads,
  getVideo,
} from "../controllers/userControllers.js";
import upload from "../middleware/multerMiddleware.js";

const fileFields = [
  { name: "thumbnail" },
  { name: "video" },
];

router.get("/current-user", getCurrentUser);
router.post("/upload", upload.fields(fileFields), uploadJob);
router.get("/uploads", getUploads)
router.get("/uploads/:jobId", getVideo)

export default router;