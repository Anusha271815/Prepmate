const express = require("express");
const router = express.Router();

const { generateReport, getMyReport ,getAllMyReports } = require("../controllers/reportController");
const protect = require("../middleware/authMiddleware");

// Generate interview report
router.post("/generate", protect, generateReport);

// Get interview report
router.get("/my/:sessionId", protect, getMyReport);

// Get all reports of logged-in user
router.get("/my-reports", protect, getAllMyReports);
module.exports = router;