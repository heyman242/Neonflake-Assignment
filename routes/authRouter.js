import { Router } from "express";
const router = Router();

import { login, register, logout } from "../controllers/authControllers.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
