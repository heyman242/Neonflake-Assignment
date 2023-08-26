import { Router } from "express";
const router = Router();

import { getCurrentUser, uploadJob } from "../controllers/userControllers.js";


import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/current-user", getCurrentUser);

router.post(
  "/upload",
  upload.single("thumbnail"),
  upload.single("video"),
  uploadJob
);

export default router;
