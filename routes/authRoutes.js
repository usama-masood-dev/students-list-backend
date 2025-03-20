import express from "express";
import { getUser, login, signup } from "../controllers/authController.js";

const router = express.Router();

router.get("/:id", getUser);

router.post("/signup", signup);

router.post("/login", login);

export default router;
