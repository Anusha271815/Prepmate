const express = require("express");
const router = express.Router();

const { createInterview , getMyInterviews ,getInterviewById} = require("../controllers/interviewController");
const protect = require("../middleware/authMiddleware");

// Create interview (Protected route)
router.post("/", protect, createInterview);
// Get all interviews of logged-in user (Protected route)
router.get("/my-interviews", protect, getMyInterviews);

router.get("/my-interviews/:id", protect, getInterviewById);
module.exports = router;