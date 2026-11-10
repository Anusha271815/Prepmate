const express = require("express");
const router = express.Router();

const {
    startInterviewSession,
    generateQuestions,
    getCurrentQuestion,
    submitAnswer,
    completeInterviewSession,
    getSessionDetails
} = require("../controllers/sessionController");

const protect = require("../middleware/authMiddleware");

// Start a new interview session
router.post("/start", protect, startInterviewSession);

// Generate interview questions
router.post("/generate-questions", protect, generateQuestions);

// Get current interview question
router.get("/questions/:sessionId", protect, getCurrentQuestion);

// Submit answer to current question
router.post("/questions/:sessionId/answers", protect, submitAnswer);

// Complete interview session
router.put("/complete/:sessionId", protect, completeInterviewSession);

// Get interview session details
router.get("/details/:sessionId", protect, getSessionDetails);

module.exports = router;