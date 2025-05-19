// server/routes/auth.js
import express from "express";
import { checkJwt, logToken, getUserProfile, createUser, verifyPayment } from "../controllers/authController.js";

const router = express.Router();

// Get user profile
router.get("/profile", checkJwt, logToken, getUserProfile);

// Create new user
router.post("/users", checkJwt, logToken, createUser);

// Verify payment and update user role
router.post("/payment/verify", checkJwt, logToken, verifyPayment);

export default router;