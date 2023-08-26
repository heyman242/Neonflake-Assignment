import { Router } from "express";
const router = Router();

import { getCurrentUser, uploadJob } from "../controllers/userControllers.js";
import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);

router.post("/upload", upload.single("thumbnail"), uploadJob);


export default router;
