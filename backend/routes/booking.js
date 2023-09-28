import express from "express";
const router = express.Router();

import { verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingController.js";

// put verify user in all of them

router.post("/", createBooking);
router.get("/:id", getBooking);
router.get("/", getAllBooking);

export default router;