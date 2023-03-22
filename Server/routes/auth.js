import express from "express";
import { GoogleAuth, signIn, signUp } from "../Controllers/auth.js";

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/google",GoogleAuth)

export default router