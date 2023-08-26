import { Router } from "express";
const router = Router();

import { getCurrentUser, uploadJob } from "../controllers/userControllers.js";
import upload from "../middleware/multerMiddleware.js";

const fileFields = [
  { name: "thumbnail" },
  { name: "video" },
];

router.get("/current-user", getCurrentUser);

router.post("/upload", upload.fields(fileFields), uploadJob);

export default router;
