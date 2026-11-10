const InterviewSession = require("../models/InterviewSession");
const Interview = require("../models/Interview");

// Start interview session
const startInterviewSession = async (req, res) => {
    try {
        const { interviewId } = req.body;
        if (!interviewId) {
            return res.status(400).json({
                success: false,
                message: "Interview ID is required"
            });
        }

        // Check if the interview exists and belongs to the logged-in user
        const interview = await Interview.findOne({
            _id: interviewId,
            user: req.user._id
        });
        
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        // Create a new interview session
        const session = await InterviewSession.create({
            interview: interview._id,
            user: req.user._id
        });
        return res.status(201).json({
            success: true,
            message: "Interview session started successfully",
            session
        });

    } catch (error) {
        console.error("Start session error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error starting interview session"
        });
    }
};

// Generate interview questions
const generateQuestions = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        }).populate("interview");

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        if (session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "This interview is already completed"
            });
        }

        // Temporary sample questions
        const questions = [
            "Tell me about yourself.",
            "What is your strongest technical skill?",
            "Explain the difference between let, const and var in JavaScript.",
            "What is the virtual DOM in React?",
            "How does Node.js handle asynchronous operations?",
            "What is the difference between SQL and NoSQL databases?",
            "Explain the concept of REST APIs.",
            "What is middleware in Express.js?",
            "How do you handle errors in a Node.js application?",
            "Why should we hire you for this role?"
        ];

        session.questions = questions.map((question) => ({
            questionText: question
        }));

        session.currentQuestion = 0;

        await session.save();

        return res.status(200).json({
            success: true,
            message: "Questions generated successfully",
            questions: session.questions
        });

    } catch (error) {
        console.error("Generate questions error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error generating questions"
        });
    }
};

// Get current interview question
const getCurrentQuestion = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        if (session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Interview is already completed"
            });
        }
        // console.log("Current index from DB:", session.currentQuestion);
        const question = session.questions[session.currentQuestion];

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "No more questions available"
            });
        }

        return res.status(200).json({
            success: true,
            currentQuestion: session.currentQuestion,
            totalQuestions: session.questions.length,
            question
        });

    } catch (error) {
        console.error("Get current question error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching current question"
        });
    }
};
// Submit answer to current question
const submitAnswer = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { answerText } = req.body;

        if (!answerText || !answerText.trim()) {
            return res.status(400).json({
                success: false,
                message: "Answer cannot be empty"
            });
        }

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        if (session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Interview is already completed"
            });
        }

        const currentQuestion = session.questions[session.currentQuestion];

        if (!currentQuestion) {
            return res.status(400).json({
                success: false,
                message: "No question available to answer"
            });
        }

        currentQuestion.answerText = answerText.trim();
        currentQuestion.answeredAt = new Date();

        // Move to the next question
        session.currentQuestion++;

        // Check if all questions are answered
        if (session.currentQuestion >= session.questions.length) {
        session.status = "completed";
        session.completedAt = new Date();
        }

await session.save();
        return res.status(200).json({
            success: true,
            message: "Answer submitted successfully",
            currentQuestion: session.currentQuestion ,
            answer: currentQuestion
        });

    } catch (error) {
        console.error("Submit answer error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error submitting answer"
        });
    }
};

// Complete interview session
const completeInterviewSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        if (session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Interview is already completed"
            });
        }

        session.status = "completed";
        session.completedAt = new Date();

        await session.save();

        return res.status(200).json({
            success: true,
            message: "Interview completed successfully",
            session
        });

    } catch (error) {
        console.error("Complete session error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error completing interview"
        });
    }
};

// Get interview session details
const getSessionDetails = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user._id
        }).populate("interview");

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Interview session not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Session details fetched successfully",
            session
        });

    } catch (error) {
        console.error("Get session details error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching session details"
        });
    }
};

module.exports = { startInterviewSession, generateQuestions, getCurrentQuestion, submitAnswer, completeInterviewSession , getSessionDetails };