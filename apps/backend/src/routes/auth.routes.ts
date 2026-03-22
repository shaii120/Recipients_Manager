import { Router } from "express";
import { register, login, logout } from "../auth/auth.controller.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
